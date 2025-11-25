# ECCCO Platform Production Deployment Guide

This guide covers the complete production deployment process for the ECCCO medical education platform.

## Prerequisites

- Docker and Docker Compose installed
- PostgreSQL database (recommended: managed service like AWS RDS, Google Cloud SQL, or Azure Database)
- Domain name and SSL certificate
- Server with at least 2GB RAM and 2 CPU cores
- Node.js 18+ (if not using Docker)

## Quick Start (Docker Compose)

### 1. Clone and Setup Environment

```bash
git clone <repository-url>
cd ECCCO
cp .env.docker.production .env
```

### 2. Configure Environment Variables

Edit `.env` file with your production values:

```bash
# Database - Use your production PostgreSQL URL
DATABASE_URL="postgresql://username:password@host:port/database"

# Auth - Generate secure secrets
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="https://yourdomain.com"

# Security
POSTGRES_PASSWORD="secure_password_here"
REDIS_PASSWORD="secure_redis_password"
```

### 3. Deploy with Docker Compose

```bash
# Start all services
docker-compose -f docker-compose.yml --env-file .env up -d

# Run database migrations
docker-compose exec app npx prisma migrate deploy

# Seed production database
docker-compose exec app npm run db:seed:prod
```

### 4. Setup SSL and Domain

Configure your domain to point to your server and setup SSL certificates (Let's Encrypt recommended).

## Manual Production Deployment

### 1. Server Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL client tools
sudo apt-get install postgresql-client
```

### 2. Application Setup

```bash
# Clone repository
git clone <repository-url>
cd ECCCO

# Install dependencies
npm ci --only=production

# Setup environment
cp .env.production .env
# Edit .env with your production values

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Build application
npm run build

# Seed database (production-safe)
npm run db:seed:prod
```

### 3. Process Management

Using PM2 for process management:

```bash
# Install PM2 globally
npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'eccco-app',
    script: 'npm',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
EOF

# Start application
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. Nginx Configuration

```bash
# Install Nginx
sudo apt install nginx

# Copy configuration
sudo cp nginx/nginx.conf /etc/nginx/sites-available/eccco
sudo ln -s /etc/nginx/sites-available/eccco /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET` | Auth encryption secret (32+ chars) | `generated_secure_secret` |
| `NEXTAUTH_URL` | Application public URL | `https://yourdomain.com` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `LOG_LEVEL` | Logging level | `error` (production) |
| `RATE_LIMIT_ENABLED` | Enable API rate limiting | `true` |
| `RATE_LIMIT_REQUESTS_PER_MINUTE` | Rate limit threshold | `60` |
| `REDIS_URL` | Redis connection (for caching) | Not required |

## Database Setup

### Using Managed Database Service (Recommended)

1. **AWS RDS PostgreSQL**:
   ```bash
   # Create RDS instance with PostgreSQL 15+
   # Enable automated backups
   # Configure security groups
   DATABASE_URL="postgresql://username:password@rds-endpoint:5432/eccco"
   ```

2. **Google Cloud SQL**:
   ```bash
   # Create Cloud SQL PostgreSQL instance
   # Enable automated backups
   # Configure authorized networks
   DATABASE_URL="postgresql://username:password@cloud-sql-ip:5432/eccco"
   ```

### Self-Managed PostgreSQL

```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE eccco_production;
CREATE USER eccco_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE eccco_production TO eccco_user;
\q

# Configure connection
DATABASE_URL="postgresql://eccco_user:secure_password@localhost:5432/eccco_production"
```

## Monitoring and Logging

### Health Monitoring

The platform includes built-in health monitoring:

```bash
# Check application health
curl https://yourdomain.com/api/health

# Check monitoring metrics
curl https://yourdomain.com/api/monitoring
```

### Log Management

```bash
# View application logs (if using PM2)
pm2 logs

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# View system logs
sudo journalctl -u nginx
```

### Performance Monitoring

Set up external monitoring (recommended):
- Uptime monitoring (Pingdom, StatusCake)
- Error tracking (Sentry, LogRocket)
- Performance monitoring (New Relic, Datadog)

## Security Checklist

- [ ] SSL certificate installed and configured
- [ ] Environment variables secured (not in version control)
- [ ] Database connections encrypted
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] Regular security updates scheduled
- [ ] Backup strategy implemented
- [ ] Access logs monitored

## Backup Strategy

### Database Backups

```bash
# Automated daily backup script
cat > /home/deploy/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > /backups/eccco_backup_$DATE.sql
# Upload to cloud storage (AWS S3, Google Cloud Storage, etc.)
EOF

# Setup cron job
crontab -e
# Add: 0 2 * * * /home/deploy/backup.sh
```

### Application Backups

```bash
# Backup application files and configuration
tar -czf eccco_app_backup_$(date +%Y%m%d).tar.gz \
  /var/www/eccco \
  /etc/nginx/sites-available/eccco \
  /home/deploy/.env
```

## Scaling Considerations

### Horizontal Scaling

```bash
# Use Docker Swarm or Kubernetes for multi-instance deployment
# Configure load balancer (Nginx, HAProxy, or cloud load balancer)
# Use shared Redis for session storage
# Use managed database with read replicas
```

### Performance Optimization

1. **CDN Setup**: Configure CloudFlare, AWS CloudFront, or similar
2. **Database Optimization**: Add indexes, connection pooling
3. **Caching**: Implement Redis caching for frequently accessed data
4. **Image Optimization**: Use Next.js image optimization features

## Troubleshooting

### Common Issues

1. **Database Connection Errors**:
   ```bash
   # Check database connectivity
   npx prisma db pull
   
   # Verify environment variables
   echo $DATABASE_URL
   ```

2. **Build Failures**:
   ```bash
   # Clear cache and rebuild
   rm -rf .next node_modules/.cache
   npm install
   npm run build
   ```

3. **Memory Issues**:
   ```bash
   # Monitor memory usage
   htop
   
   # Adjust Node.js memory limits
   export NODE_OPTIONS="--max-old-space-size=2048"
   ```

### Log Analysis

```bash
# Check specific error patterns
grep "ERROR" /var/log/nginx/error.log
grep "500\|502\|503" /var/log/nginx/access.log

# Monitor real-time logs
tail -f /var/log/nginx/access.log | grep -v "200\|304"
```

## Support

For technical support and deployment assistance:
- Check application logs for detailed error messages
- Monitor the `/api/health` endpoint for system status
- Review the deployment report generated during setup
- Contact the development team with specific error details

## Maintenance

### Regular Maintenance Tasks

1. **Weekly**: Review application logs and performance metrics
2. **Monthly**: Update dependencies and security patches
3. **Quarterly**: Review and test backup restoration
4. **As needed**: Scale resources based on usage patterns

### Update Process

```bash
# Update application (zero-downtime)
git pull origin main
npm ci --only=production
npm run build
npx prisma migrate deploy
pm2 reload eccco-app
```

This production deployment guide ensures a secure, scalable, and maintainable ECCCO platform deployment.