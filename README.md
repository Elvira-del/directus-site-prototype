# Directus Site Prototype

A monorepo project featuring a Next.js frontend powered by Directus CMS.

## Project Structure

- **frontend/** - Next.js 16 application with React 19, Tailwind CSS 4, and Directus SDK
- **directus/** - Directus CMS backend

## Vercel Deployment

This project is configured for automated deployment to Vercel.

### Prerequisites

Before deploying, you need:

1. A [Vercel account](https://vercel.com/signup)
2. A Vercel project created for this repository
3. The following secrets configured in your GitHub repository

### Required GitHub Secrets

Navigate to your GitHub repository settings → Secrets and variables → Actions, and add:

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `VERCEL_TOKEN` | Vercel authentication token | Create at [Vercel Account Tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Your Vercel organization/team ID | Found in `.vercel/project.json` after running `vercel link` locally |
| `VERCEL_PROJECT_ID` | Your Vercel project ID | Found in `.vercel/project.json` after running `vercel link` locally |

#### Getting Your Vercel IDs

1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel link` in your project root
3. Follow the prompts to link to your Vercel project
4. Find the IDs in `.vercel/project.json`:
   ```json
   {
     "orgId": "your-org-id",
     "projectId": "your-project-id"
   }
   ```

### Deployment Workflow

The project uses GitHub Actions for automated deployments:

#### Preview Deployments

- **Trigger**: Automatically on pull requests to `main` branch
- **Environment**: Preview
- **URL**: Unique preview URL for each PR (provided in PR comments by Vercel)
- **Purpose**: Test changes before merging

#### Production Deployments

- **Trigger**: Automatically on push to `main` branch
- **Environment**: Production
- **URL**: Your configured production domain
- **Purpose**: Live site updates

### Manual Deployment

You can also deploy manually using Vercel CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Configuration Files

- **vercel.json** - Vercel project configuration specifying build settings and framework
- **.github/workflows/vercel-deploy.yml** - GitHub Actions workflow for automated deployments

## Frontend Development

Navigate to the `frontend/` directory for local development:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

For the frontend application, you may need to configure environment variables in Vercel:

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add any required variables (e.g., `NEXT_PUBLIC_DIRECTUS_URL`)

Environment variables can be configured separately for Development, Preview, and Production environments.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Directus Documentation](https://docs.directus.io/)
- [Vercel Documentation](https://vercel.com/docs)
