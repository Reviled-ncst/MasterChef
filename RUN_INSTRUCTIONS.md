    Master Chef Website — Run Instructions

Prerequisites
- Node.js 18+ (recommended)
- npm (bundled with Node.js)

Install
```bash
npm install
```

Development
```bash
# Start dev server (hot reload)
npm run dev
# Visit http://localhost:3000
```

Type-check
```bash
npm run type-check
```

Production build
```bash
# Build optimized production assets
npm run build
# Start production server (after build)
npm run start
# Visit http://localhost:3000
```

Notes
- The project is a Next.js app using TypeScript and Chakra UI.
- If you see TypeScript errors during `npm run build`, run `npm run type-check` and fix reported issues.
- Static assets are currently referenced from Cloudinary; consider copying them to `public/images/` for self-hosting.

Troubleshooting
- Wrong Node version: install Node 18+ (nvm recommended).
- Port in use: set `PORT` env var before starting, e.g. `PORT=4000 npm run dev` (Windows PowerShell: `$env:PORT=4000; npm run dev`).
- If build fails with Chakra type errors, ensure `typescript` and `@types/*` versions match the project setup.

Contact
- For local help, reply here and I can assist with failing errors or previews.
