# ICE Site

A modern Next.js application built with TypeScript and Tailwind CSS, optimized for Vercel deployment.

## Tech Stack

- **React**: 18.2.0
- **Next.js**: 14.1.0 (with App Router)
- **TypeScript**: 5.4.4
- **Tailwind CSS**: 3.4.1
- **Hosting**: Vercel

## Getting Started

### Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

This project is optimized for Vercel deployment with the included `vercel.json` configuration.

### Option 1: Deploy with Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: Deploy via Git
1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Vercel
3. Vercel will automatically deploy on every push to your main branch

### Environment Variables
No environment variables are required for the basic setup.

## Project Structure

```
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout
│       ├── page.tsx        # Homepage
│       ├── globals.css     # Global styles
│       └── favicon.ico     # Site icon
├── public/                 # Static assets
├── package.json           # Dependencies and scripts
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── next.config.mjs        # Next.js configuration
├── postcss.config.js      # PostCSS configuration
└── vercel.json           # Vercel deployment configuration
```

## Features

- ✅ Next.js 14 App Router
- ✅ TypeScript support
- ✅ Tailwind CSS for styling
- ✅ ESLint for code quality
- ✅ Optimized for Vercel deployment
- ✅ Security headers configured
- ✅ Responsive design
- ✅ Dark mode support

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Deployment Documentation](https://vercel.com/docs)
