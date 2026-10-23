# LKR Share Market & VIP Rewards Portal

A modern mobile-first Sri Lankan Rupee (LKR) digital VIP investment & loyalty portal built with React 19, TypeScript, Vite, and Tailwind CSS v4.

---

## Deploying to Vercel (Step-by-Step)

The project is already pre-configured for Vercel with `vercel.json` (Vite SPA rewrites, static asset caching, and build commands).

### Method 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **"Add New..."** > **"Project"**.
   - Select your GitHub repository from the list.

3. **Verify Project Settings**:
   - **Framework Preset**: Vite (detected automatically).
   - **Root Directory**: `./` (leave default).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Deploy**:
   - Click **"Deploy"**. Vercel will install packages, build the Vite app, and provide your live production URL (e.g., `https://your-project.vercel.app`).

---

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Preview**:
   ```bash
   vercel
   ```

3. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

## Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript check
npm run lint

# Build production bundle
npm run build
```
