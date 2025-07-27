# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the Todo application project.

## Project Overview

ReactとCSS Modulesを使用したモダンなTodoアプリケーション。フロントエンドとバックエンドが分離されたアーキテクチャで、MySQLデータベースを使用してデータを永続化します。

## Kiro Steering Configuration

### Current Steering Files

The `/kiro:steering` command manages these files automatically. Manual updates to this section reflect changes made through steering commands.

### Active Steering Files

- `product.md`: Always included - Product context and business objectives
- `tech.md`: Always included - Technology stack and architectural decisions
- `structure.md`: Always included - File organization and code patterns

### Custom Steering Files

<!-- Added by /kiro:steering-custom command -->

### Active Specifications

- **todoist-style-todo-app**: Todoist風UIを持つフルスタックTodoアプリケーション (Status: Initialized)

## Development Guidelines

### Testing Commands
```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && npm test

# End-to-end tests
npm run test:e2e
```

### Code Quality Commands
```bash
# Frontend lint and type check
cd frontend && npm run lint && npm run type-check

# Backend lint
cd backend && npm run lint
```

### Database Setup
```bash
# Create database
mysql -u root -p < database/schema.sql

# Run migrations
cd backend && npm run migrate

# Seed initial data (optional)
cd backend && npm run seed
```

## Project-Specific Conventions

### CSS Module Naming
- Use PascalCase for CSS module files matching component names
- Keep styles scoped to individual components
- Use semantic class names that describe purpose, not appearance

### API Endpoint Standards
- Use RESTful conventions
- Prefix all API routes with `/api`
- Return consistent error responses with appropriate HTTP status codes

### TypeScript Guidelines
- Enable strict mode in tsconfig.json
- Define interfaces for all data structures
- Use type inference where possible, explicit types where necessary

### Component Structure
- Keep components focused on a single responsibility
- Extract reusable logic into custom hooks
- Prefer composition over inheritance

## Important Notes

1. **Environment Setup**: Copy `.env.example` to `.env` in both frontend and backend directories
2. **Database**: Ensure MySQL is running on port 3306 before starting the backend
3. **Port Conflicts**: Frontend runs on 5173, backend on 3001. Adjust if needed
4. **CORS**: Backend is configured to accept requests from the frontend dev server

## Common Issues and Solutions

### MySQL Connection Error
- Check if MySQL service is running
- Verify database credentials in backend/.env
- Ensure database exists and user has proper permissions

### TypeScript Errors
- Run `npm install` to ensure all type definitions are installed
- Check for missing type declarations in the types/ directory

### CSS Module Import Errors
- Ensure CSS module files use the `.module.css` extension
- Import styles as `import styles from './Component.module.css'`