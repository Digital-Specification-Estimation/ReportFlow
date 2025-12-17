# ReportFlow Backend

Complete NestJS backend for the ReportFlow report/appraisal management system.

## Features

- **Authentication & Authorization**: JWT-based auth with refresh tokens, role-based access control (Admin, Editor, Viewer)
- **Report Management**: Full CRUD operations for reports with ownership and access control
- **Table of Contents**: Hierarchical section management with drag-and-drop reordering
- **Content Versioning**: Track all changes to section content with rollback capability
- **File Management**: S3-compatible storage for images, signatures, and appendices
- **Templates**: Create and apply report templates with JSON structure
- **Export Engine**: Generate PDF (Puppeteer) and Word (html-to-docx) exports
- **Audit Logging**: Complete audit trail of all system actions

## Tech Stack

- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT with httpOnly cookies
- **File Storage**: AWS S3 / DigitalOcean Spaces
- **PDF Generation**: Puppeteer
- **Word Generation**: html-to-docx
- **Validation**: class-validator, class-transformer

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
nano .env

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Seed database
npm run prisma:seed
```

## Environment Variables

See `.env.example` for all required environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_ACCESS_SECRET` & `JWT_REFRESH_SECRET`: JWT secrets
- `AWS_*`: S3-compatible storage credentials
- `CORS_ORIGIN`: Frontend URL

## Running the Application

```bash
# Development
npm run start:dev

# Production build
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

## Database Management

```bash
# Generate Prisma client after schema changes
npm run prisma:generate

# Create a new migration
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout

### Users
- `GET /api/users` - List all users (Admin only)
- `GET /api/users/me` - Get current user profile
- `GET /api/users/:id` - Get user by ID (Admin only)
- `PATCH /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Reports
- `POST /api/reports` - Create report
- `GET /api/reports` - List reports
- `GET /api/reports/:id` - Get report details
- `PATCH /api/reports/:id` - Update report
- `DELETE /api/reports/:id` - Delete report

### Sections
- `POST /api/reports/:reportId/sections` - Create section
- `GET /api/reports/:reportId/sections` - List sections (nested tree)
- `PATCH /api/reports/:reportId/sections/reorder` - Reorder sections
- `GET /api/sections/:id` - Get section
- `PATCH /api/sections/:id` - Update section
- `DELETE /api/sections/:id` - Delete section

### Section Content
- `GET /api/sections/:sectionId/content` - Get latest content
- `POST /api/sections/:sectionId/content` - Create new version
- `GET /api/sections/:sectionId/content/history` - Get version history
- `GET /api/sections/:sectionId/content/version/:version` - Get specific version
- `POST /api/sections/:sectionId/content/rollback/:version` - Rollback to version

### Assets
- `POST /api/assets/upload?reportId=&sectionId=` - Upload file
- `GET /api/assets/report/:reportId` - List report assets
- `GET /api/assets/section/:sectionId` - List section assets
- `GET /api/assets/:id` - Get asset details
- `GET /api/assets/:id/url` - Get signed download URL
- `DELETE /api/assets/:id` - Delete asset

### Templates
- `POST /api/templates` - Create template (Admin/Editor)
- `GET /api/templates` - List templates
- `GET /api/templates/:id` - Get template
- `PATCH /api/templates/:id` - Update template (Admin/Editor)
- `DELETE /api/templates/:id` - Delete template (Admin)
- `POST /api/templates/apply/:reportId` - Apply template to report

### Export
- `GET /api/export/report/:id?format=pdf|docx` - Export report
- `GET /api/export/section/:id?format=pdf|docx` - Export section

### Audit Logs
- `GET /api/audit-logs` - List all logs (Admin only)
- `GET /api/audit-logs/me` - Get current user's logs
- `GET /api/audit-logs/user/:userId` - Get user logs (Admin only)
- `GET /api/audit-logs/object/:objectType/:objectId` - Get object logs

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Database Schema

### Models
- **User**: Authentication and user management
- **Report**: Main report entity
- **Section**: Hierarchical TOC structure
- **SectionContent**: Versioned content for sections
- **Asset**: File attachments
- **Template**: Report templates
- **AuditLog**: System audit trail

### Relationships
- User → Reports (one-to-many)
- Report → Sections (one-to-many)
- Section → Section (self-referential, parent-child)
- Section → SectionContent (one-to-many, versioned)
- Report → Assets (one-to-many)
- Section → Assets (one-to-many)

## Architecture

### Modular Structure
```
src/
├── auth/           # Authentication & authorization
├── users/          # User management
├── reports/        # Report CRUD
├── sections/       # Section & TOC management
├── section-content/# Content versioning
├── assets/         # File upload & storage
├── templates/      # Template management
├── export/         # PDF & Word generation
├── audit-log/      # Audit logging
└── prisma/         # Database service
```

### Key Design Patterns
- **Dependency Injection**: NestJS DI container
- **Repository Pattern**: Prisma ORM
- **Guard Pattern**: JWT & Role-based guards
- **Decorator Pattern**: Custom decorators for auth
- **Service Layer**: Business logic separation

## Security

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Access (15min) + Refresh (7d) tokens
- **httpOnly Cookies**: Refresh tokens stored securely
- **CORS**: Configured for frontend origin
- **Rate Limiting**: Throttler guard
- **Input Validation**: class-validator DTOs
- **SQL Injection**: Prisma parameterized queries
- **File Upload**: Type and size validation

## Deployment

### Docker (Recommended)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

### Environment Setup
1. Set up PostgreSQL database
2. Configure S3-compatible storage
3. Set environment variables
4. Run migrations
5. Start application

## Integration with Frontend

The backend provides a REST API that the Next.js frontend consumes:

```typescript
// Example frontend API call
const response = await fetch('http://localhost:3000/api/reports', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  },
});
```

## License

MIT
