# Air Zone Automobile
`npm install` then `npm run dev`.
- Business details, WhatsApp, socials, booking endpoint: `src/data/siteConfig.js`
- Services: `src/data/services.js`; images in `public/images/` (replace files, keep names)
- Quote/contact forms: `submitRequest()` in `src/components/Form.jsx`; set `bookingEndpoint`. Without it the form shows an honest "not connected" error.
- Images are crops of the supplied flyer; swap for real photos.

## Images
No photos are bundled. Drop real photos in `public/images/` using the names the data expects (`services/<slug>.jpg`, `hero/hero.jpg`, `about/workshop.jpg`); a neutral placeholder shows until then.
## Pricing
`src/data/services.js` → set `price:{min,max}` per service once confirmed; until then "Price to be confirmed" is shown everywhere.
## Reviews / brands / FAQs
`src/data/content.js`. Reviews display only when `published:true`.
