# Archived Scripts

This directory contains temporary development scripts that are no longer actively used in the production codebase.

## Directory Structure

### `logger-fixes/`

Scripts used during the logger migration from `console.log` to custom logger service. These were created to automate the refactoring process when we encountered 161 TypeScript errors due to the cleanup-console-logs.sh script.

**Key Scripts:**

- `fix-*.sh` - Various shell scripts for automated logger fixes
- `fix_all_loggers.py` - Python script for comprehensive logger migration
- `fix-client-directive.py` - Added 'use client' directives where needed

**Context:** See commit `fb6a907` and root cause analysis in `TYPESCRIPT_ERRORS_INVESTIGATION.md`

### `deployment/`

Scripts used for deployment automation and documentation cleanup.

**Scripts:**

- `deploy.sh`, `deploy-clean.sh` - Deployment automation
- `cleanup-docs.sh`, `cleanup-docs-final.sh` - Documentation organization

### `development/`

Development monitoring and utility scripts.

**Scripts:**

- `monitor-seed.sh` - Database seeding monitoring
- `check-progress.sh` - Build progress tracking
- `keep-server-running.sh` - Development server keep-alive
- `check-ollama-status.sh` - Ollama service status
- `show-all-topics.sh` - Database topic listing
- `update-*.sh` - Various update utilities

### `testing/`

Testing and verification scripts used during development cycles.

**Scripts:**

- `test-*.sh` - Feature-specific test scripts
- `quick-*.sh` - Quick verification utilities
- `verify-production-complete.sh` - Production readiness checks
- `wait-for-completion.sh` - Async task monitoring

## Why Archived?

These scripts served their purpose during specific development phases:

1. **Logger Migration**: Successfully migrated entire codebase to custom logger
2. **Deployment Automation**: Now handled by Vercel CI/CD
3. **Testing Scripts**: Replaced by proper test suites (vitest)
4. **Monitoring**: Replaced by Sentry and production monitoring tools

## Restoration

If you need any of these scripts:

1. They're preserved in git history
2. Copy from this archive directory
3. Review and update for current codebase structure

## Cleanup Date

- **Archived**: January 20, 2026
- **By**: Development team
- **Reason**: Code cleanup (Task 5 in TODO.md)

---

**Note**: These scripts are kept for historical reference but are not maintained. Use at your own risk and verify compatibility with current codebase before running.
