# 🗄️ ECCCO Database Backup & Recovery Procedures

## Overview

This document describes the backup and recovery procedures for the ECCCO platform database.

## 🎯 Backup Strategy

### Automated Daily Backups

- **Schedule:** Daily at 2:00 AM UTC
- **Method:** GitHub Actions workflow
- **Retention:** 90 days (configurable)
- **Location:** GitHub Artifacts
- **Format:** Compressed PostgreSQL dump (`.sql.gz`)

### Manual Backup Options

1. **Local Script:** `./scripts/backup-database.sh`
2. **GitHub Workflow:** Manual trigger via Actions tab
3. **Vercel Dashboard:** Automated by Vercel Postgres

## 📋 Backup Procedures

### Method 1: Automated (Recommended)

The GitHub Actions workflow runs automatically. No action needed.

**To verify:**

1. Go to GitHub Actions tab
2. Check "Database Backup" workflow
3. Ensure daily runs are succeeding

### Method 2: Manual Backup (Local)

```bash
# Ensure DATABASE_URL is set
export DATABASE_URL="postgresql://..."

# Run backup script
./scripts/backup-database.sh

# Backup saved to: backups/database/eccco_backup_YYYYMMDD_HHMMSS.sql.gz
```

### Method 3: Manual Backup (GitHub Actions)

1. Go to **Actions** tab on GitHub
2. Select **"Database Backup"** workflow
3. Click **"Run workflow"** button
4. Download from **Artifacts** section when complete

### Method 4: Direct pg_dump

```bash
# One-time backup
pg_dump $DATABASE_URL | gzip > eccco_backup_$(date +%Y%m%d).sql.gz

# Verify backup
gunzip -t eccco_backup_*.sql.gz
```

## 🔄 Recovery Procedures

### ⚠️ CRITICAL WARNING

**Recovery will REPLACE ALL DATA in the target database!**

- Always restore to a TEST database first
- Verify data integrity before switching
- Have team approval for production restores

### Method 1: Using Restore Script (Recommended)

```bash
# List available backups
ls -lh backups/database/

# Restore from backup (will ask for confirmation)
./scripts/restore-database.sh backups/database/eccco_backup_20260120_140530.sql.gz

# Or restore to test database
export DATABASE_URL="postgresql://test-database-url"
./scripts/restore-database.sh backups/database/eccco_backup_20260120_140530.sql.gz
```

### Method 2: Manual Restore

```bash
# Download backup from GitHub Artifacts or local backups
# Decompress if needed
gunzip eccco_backup_20260120_140530.sql.gz

# WARNING: This will replace all data!
psql $DATABASE_URL < eccco_backup_20260120_140530.sql

# Verify restore
psql $DATABASE_URL -c "SELECT COUNT(*) FROM \"User\";"
psql $DATABASE_URL -c "SELECT COUNT(*) FROM \"Question\";"
```

### Method 3: Point-in-Time Recovery (Vercel Postgres)

If using Vercel Postgres with point-in-time recovery:

1. Go to Vercel Dashboard
2. Select your database
3. Navigate to **Backups** tab
4. Choose restore point
5. Create new database from backup
6. Update `DATABASE_URL` to point to restored database

## 🧪 Testing Restore Procedure

**Test restores quarterly** to ensure backups are valid:

```bash
# 1. Create test database
# (Use Vercel dashboard or psql)

# 2. Restore to test database
export DATABASE_URL="postgresql://test-db-url"
./scripts/restore-database.sh backups/database/latest_backup.sql.gz

# 3. Verify data integrity
psql $DATABASE_URL << EOF
SELECT 'Users', COUNT(*) FROM "User"
UNION ALL
SELECT 'Questions', COUNT(*) FROM "Question"
UNION ALL
SELECT 'Bookmarks', COUNT(*) FROM "Bookmark";
EOF

# 4. Test application against test database
# Update .env.local temporarily
DATABASE_URL=postgresql://test-db-url npm run dev

# 5. Document results
echo "✅ Restore test passed on $(date)" >> restore_test_log.txt
```

## 📊 Backup Verification Checklist

**Monthly verification:**

- [ ] Check GitHub Actions backup workflow is running daily
- [ ] Verify at least 30 backup artifacts exist
- [ ] Download random backup and test decompression
- [ ] Check backup file sizes are reasonable (not 0 bytes)

**Quarterly verification:**

- [ ] Perform full restore test to staging/test database
- [ ] Verify application works with restored data
- [ ] Check data integrity (user count, question count match)
- [ ] Document test results

## 🚨 Disaster Recovery Scenarios

### Scenario 1: Accidental Data Deletion

**Timeline:** Immediate (same day)

1. Stop all write operations immediately
2. Identify last known good backup (before deletion)
3. Create new test database
4. Restore backup to test database
5. Verify data is intact
6. If verified, restore to production (or point DNS to test DB)

### Scenario 2: Database Corruption

**Timeline:** Within hours

1. Assess extent of corruption
2. Check Vercel Postgres dashboard for point-in-time recovery
3. If available, restore to specific timestamp before corruption
4. If not, use latest daily backup
5. Manually re-enter any data from after backup timestamp

### Scenario 3: Complete Database Loss

**Timeline:** Critical (within 1 hour)

1. Create new database instance
2. Download latest backup from GitHub Artifacts
3. Restore backup to new database
4. Update DATABASE_URL in Vercel environment variables
5. Deploy and verify application
6. Assess data loss (everything after last backup)

## 🔐 Security Considerations

### Backup Storage

- ✅ GitHub Artifacts (encrypted at rest)
- ✅ Local backups (encrypt before cloud upload)
- ❌ Never commit backups to git repository

### Access Control

- Limit who can trigger backup workflows
- Limit who can access backup artifacts
- Require MFA for database access

### Encryption

For sensitive environments, encrypt backups:

```bash
# Encrypt backup
gpg --symmetric --cipher-algo AES256 eccco_backup.sql.gz

# Decrypt for restore
gpg --decrypt eccco_backup.sql.gz.gpg > eccco_backup.sql.gz
```

## 📞 Emergency Contacts

**In case of data loss emergency:**

1. **Database Admin:** [Your contact info]
2. **Vercel Support:** support@vercel.com
3. **Team Lead:** [Your contact info]

## 📝 Backup Log

Keep a record of manual backups and restores:

```bash
# Append to backup log
echo "$(date): Manual backup created - eccco_backup_$(date +%Y%m%d).sql.gz" >> backup_log.txt

# Append to restore log
echo "$(date): Restored from eccco_backup_20260120.sql.gz - Reason: [explain]" >> restore_log.txt
```

## 🎓 Training & Documentation

**All team members should:**

- [ ] Read this document
- [ ] Know how to trigger manual backup
- [ ] Know how to access backup artifacts
- [ ] Have tested restore procedure at least once
- [ ] Know who to contact in emergency

## 📅 Maintenance Schedule

| Task                     | Frequency         | Responsible    |
| ------------------------ | ----------------- | -------------- |
| Verify automated backups | Daily (automated) | GitHub Actions |
| Check backup logs        | Weekly            | DevOps         |
| Test restore procedure   | Quarterly         | Database Admin |
| Review backup strategy   | Annually          | Team Lead      |
| Update procedures        | As needed         | Team           |

## 🔄 Continuous Improvement

This document should be updated when:

- Backup procedures change
- New team members join
- After any data loss incident (post-mortem)
- Technology stack changes
- Quarterly review reveals issues

---

**Last Updated:** January 20, 2026
**Next Review:** April 20, 2026
**Document Owner:** ECCCO Development Team
