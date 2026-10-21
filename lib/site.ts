// Production URL: set NEXT_PUBLIC_SITE_URL once you have a custom domain.
// On Vercel, VERCEL_PROJECT_PRODUCTION_URL is provided automatically at build time.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
