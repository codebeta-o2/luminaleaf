<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/5d5ee10c-2674-45bc-a01d-7b30c3f09829

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Hostinger

1. Build the static website for Hostinger:
   `npm run build:hostinger`
2. In Hostinger File Manager, open the website's `public_html` folder.
3. Upload the **contents** of the generated `hostinger` folder to `public_html` (including `.htaccess`).

The `hostinger` folder is generated output and is recreated by the build command. The `.htaccess` file configures Apache to serve the React app for page refreshes and direct URLs.
