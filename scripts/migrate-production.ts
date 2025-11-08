/**
 * Production Database Migration Script
 * Handles migration from SQLite to PostgreSQL for production deployment
 */

import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import fs from 'fs';

const BACKUP_DIR = './backup';
const MIGRATIONS_DIR = './prisma/migrations';

interface MigrationConfig {
  sourceDb: PrismaClient;
  targetDb: PrismaClient;
  batchSize: number;
}

class ProductionMigrationService {
  private config: MigrationConfig;
  private logFile: string;

  constructor() {
    // Ensure backup directory exists
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    this.logFile = `${BACKUP_DIR}/migration-${Date.now()}.log`;
    this.config = {
      sourceDb: new PrismaClient({
        datasources: {
          db: {
            url: process.env.DATABASE_URL || 'file:./dev.db'
          }
        }
      }),
      targetDb: new PrismaClient({
        datasources: {
          db: {
            url: process.env.POSTGRES_URL || process.env.DATABASE_URL_POSTGRES
          }
        }
      }),
      batchSize: 100
    };
  }

  private log(message: string, level: 'info' | 'warn' | 'error' = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}\n`;
    
    console.log(logMessage.trim());
    fs.appendFileSync(this.logFile, logMessage);
  }

  /**
   * Create backup of current SQLite database
   */
  private async createBackup(): Promise<string> {
    this.log('Creating database backup...');
    
    const backupPath = `${BACKUP_DIR}/eccco-backup-${Date.now()}.db`;
    
    try {
      // Copy SQLite database file
      if (fs.existsSync('./prisma/dev.db')) {
        fs.copyFileSync('./prisma/dev.db', backupPath);
        this.log(`Backup created at ${backupPath}`);
      } else {
        this.log('No SQLite database found to backup', 'warn');
      }
      
      // Export data as JSON backup
      const jsonBackupPath = `${BACKUP_DIR}/eccco-data-backup-${Date.now()}.json`;
      await this.exportDataToJson(jsonBackupPath);
      
      return backupPath;
    } catch (error) {
      this.log(`Backup failed: ${error}`, 'error');
      throw error;
    }
  }

  /**
   * Export all data to JSON format for backup
   */
  private async exportDataToJson(outputPath: string): Promise<void> {
    try {
      const data = {
        users: await this.config.sourceDb.user.findMany(),
        topics: await this.config.sourceDb.topic.findMany(),
        questions: await this.config.sourceDb.question.findMany(),
        examSessions: await this.config.sourceDb.examSession.findMany(),
        exportedAt: new Date().toISOString(),
        version: '1.0.0'
      };

      fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
      this.log(`JSON backup created at ${outputPath}`);
    } catch (error) {
      this.log(`JSON export failed: ${error}`, 'error');
      throw error;
    }
  }

  /**
   * Run Prisma migrations on target database
   */
  private async runMigrations(): Promise<void> {
    this.log('Running Prisma migrations...');
    
    try {
      // Generate Prisma client for target database
      execSync('npx prisma generate', { stdio: 'inherit' });
      
      // Deploy migrations to production database
      execSync('npx prisma migrate deploy', { 
        stdio: 'inherit',
        env: {
          ...process.env,
          DATABASE_URL: process.env.POSTGRES_URL || process.env.DATABASE_URL_POSTGRES
        }
      });
      
      this.log('Migrations completed successfully');
    } catch (error) {
      this.log(`Migration failed: ${error}`, 'error');
      throw error;
    }
  }

  /**
   * Migrate data in batches to avoid memory issues
   */
  private async migrateData(): Promise<void> {
    this.log('Starting data migration...');
    
    try {
      // Migrate Users
      await this.migrateTable('user', 'users');
      
      // Migrate Topics
      await this.migrateTable('topic', 'topics');
      
      // Migrate Questions (with batching due to potential large size)
      await this.migrateTable('question', 'questions', true);
      
      // Migrate Exam Sessions (with batching due to potential large size)
      await this.migrateTable('examSession', 'examSessions', true);
      
      this.log('Data migration completed successfully');
    } catch (error) {
      this.log(`Data migration failed: ${error}`, 'error');
      throw error;
    }
  }

  /**
   * Migrate a specific table with optional batching
   */
  private async migrateTable(
    prismaModel: string, 
    tableName: string, 
    useBatching: boolean = false
  ): Promise<void> {
    this.log(`Migrating ${tableName}...`);
    
    const sourceModel = (this.config.sourceDb as any)[prismaModel];
    const targetModel = (this.config.targetDb as any)[prismaModel];
    
    if (!sourceModel || !targetModel) {
      this.log(`Model ${prismaModel} not found`, 'error');
      return;
    }

    const totalCount = await sourceModel.count();
    this.log(`Found ${totalCount} records in ${tableName}`);
    
    if (totalCount === 0) {
      this.log(`No data to migrate for ${tableName}`);
      return;
    }

    if (useBatching && totalCount > this.config.batchSize) {
      await this.migrateBatches(sourceModel, targetModel, totalCount, tableName);
    } else {
      await this.migrateAll(sourceModel, targetModel, tableName);
    }
  }

  /**
   * Migrate data in batches
   */
  private async migrateBatches(
    sourceModel: any, 
    targetModel: any, 
    totalCount: number, 
    tableName: string
  ): Promise<void> {
    const batches = Math.ceil(totalCount / this.config.batchSize);
    
    for (let batch = 0; batch < batches; batch++) {
      const skip = batch * this.config.batchSize;
      this.log(`Migrating ${tableName} batch ${batch + 1}/${batches} (${skip}-${skip + this.config.batchSize})`);
      
      const records = await sourceModel.findMany({
        skip,
        take: this.config.batchSize
      });
      
      if (records.length > 0) {
        await targetModel.createMany({
          data: records,
          skipDuplicates: true
        });
      }
    }
  }

  /**
   * Migrate all data at once (for smaller tables)
   */
  private async migrateAll(sourceModel: any, targetModel: any, tableName: string): Promise<void> {
    const records = await sourceModel.findMany();
    
    if (records.length > 0) {
      await targetModel.createMany({
        data: records,
        skipDuplicates: true
      });
      this.log(`Migrated ${records.length} records for ${tableName}`);
    }
  }

  /**
   * Verify data integrity after migration
   */
  private async verifyMigration(): Promise<boolean> {
    this.log('Verifying migration integrity...');
    
    try {
      const sourceCounts = {
        users: await this.config.sourceDb.user.count(),
        topics: await this.config.sourceDb.topic.count(),
        questions: await this.config.sourceDb.question.count(),
        examSessions: await this.config.sourceDb.examSession.count()
      };

      const targetCounts = {
        users: await this.config.targetDb.user.count(),
        topics: await this.config.targetDb.topic.count(),
        questions: await this.config.targetDb.question.count(),
        examSessions: await this.config.targetDb.examSession.count()
      };

      this.log(`Source counts: ${JSON.stringify(sourceCounts)}`);
      this.log(`Target counts: ${JSON.stringify(targetCounts)}`);

      const isValid = Object.keys(sourceCounts).every(
        key => sourceCounts[key as keyof typeof sourceCounts] === targetCounts[key as keyof typeof targetCounts]
      );

      if (isValid) {
        this.log('Migration verification successful ✅');
      } else {
        this.log('Migration verification failed - count mismatch ❌', 'error');
      }

      return isValid;
    } catch (error) {
      this.log(`Verification failed: ${error}`, 'error');
      return false;
    }
  }

  /**
   * Clean up resources
   */
  private async cleanup(): Promise<void> {
    try {
      await this.config.sourceDb.$disconnect();
      await this.config.targetDb.$disconnect();
      this.log('Database connections closed');
    } catch (error) {
      this.log(`Cleanup error: ${error}`, 'warn');
    }
  }

  /**
   * Main migration execution
   */
  async execute(): Promise<void> {
    const startTime = Date.now();
    this.log('Starting production migration process...');

    try {
      // Step 1: Create backup
      await this.createBackup();

      // Step 2: Run migrations
      await this.runMigrations();

      // Step 3: Migrate data (only if source database exists)
      const hasSourceData = await this.config.sourceDb.user.count().catch(() => 0) > 0;
      
      if (hasSourceData) {
        await this.migrateData();
        
        // Step 4: Verify migration
        const isValid = await this.verifyMigration();
        
        if (!isValid) {
          throw new Error('Migration verification failed');
        }
      } else {
        this.log('No source data found, skipping data migration');
      }

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      this.log(`Migration completed successfully in ${duration}s ✅`);
    } catch (error) {
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      this.log(`Migration failed after ${duration}s: ${error}`, 'error');
      throw error;
    } finally {
      await this.cleanup();
    }
  }
}

// Execute migration if run directly
if (require.main === module) {
  const migration = new ProductionMigrationService();
  
  migration.execute()
    .then(() => {
      console.log('✅ Production migration completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Production migration failed:', error);
      process.exit(1);
    });
}

export default ProductionMigrationService;