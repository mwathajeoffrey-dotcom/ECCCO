# ECCCO Platform 
**Emergency & Critical Care Comprehensive Online**

A modern medical education platform built with Next.js for emergency medicine and critical care training.

![Build Status](https://github.com/mwathajeoffrey-dotcom/ECCCO/workflows/CI/badge.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17.0 or higher
- npm 9.0.0 or higher
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mwathajeoffrey-dotcom/ECCCO.git
   cd ECCCO
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 📚 Key Features

- ✅ **210+ Medical Questions** - Comprehensive emergency medicine database
- ✅ **Exam Interface** - Timed exams with instant feedback
- ✅ **Practice Mode** - Unlimited practice with detailed explanations
- ✅ **PDF Export** - Export exam results and question sets
- ✅ **Responsive Design** - Desktop, tablet, and mobile support
- ✅ **High Contrast UI** - Optimized answer visibility
- ✅ **Unit Conversion** - Medical unit converter tool
- ✅ **Tier System** - Adaptive difficulty levels

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Custom CSS overrides
- **Database**: Prisma ORM (SQLite dev, PostgreSQL prod)
- **Deployment**: Vercel
- **Testing**: Jest, TypeScript
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
ECCCO/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── lib/                 # Utilities and question database
│   └── styles/              # CSS files
├── prisma/                  # Database schema
├── public/                  # Static assets
└── scripts/                 # Build scripts
```

## 🔧 Available Scripts


## 🧪 Testing

- **Test Runner:** [Vitest](https://vitest.dev/) (unit/integration)
- **Test Files:** Located in `src/__tests__` and `test/api` directories, named `*.test.ts`.

### Run All Tests
```bash
npx vitest --run
```

### Mock Setup
- Server-only APIs (e.g., NextAuth `getServerSession`, Prisma) are mocked using `vi.mock` in test files.
- Tests avoid hitting the real database or Next.js request context.
- If you see errors about `headers` called outside request scope, ensure mocks are set up for server APIs.

### Example Test File
```typescript
import { describe, it, expect } from 'vitest';

describe('Sanity', () => {
   it('should run a basic test', () => {
      expect(1 + 1).toBe(2);
   });
});
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Manual Deployment
```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Medical content reviewed by emergency medicine professionals
- Built with modern web technologies for optimal performance
- Designed for accessibility and cross-platform compatibility
# Deployment trigger - Fri Nov  7 23:30:02 EAT 2025
