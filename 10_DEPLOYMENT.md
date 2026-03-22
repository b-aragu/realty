# Deployment

**Hosting Platform:** Cloudflare Pages (via OpenNext)
**Build Tool:** @opennextjs/cloudflare
**Runtime:** Cloudflare Workers (Node.js Compatibility enabled)

---

**Sanity CMS:**
- **Project ID:** 643lccxe
- **Dataset:** production
- **Studio Route:** /studio

---

**Environment Management:**
- Primary configuration is managed via `wrangler.toml` (Config-as-Code).
- Sanity Project ID and Dataset are defined in the `[vars]` section.

---

**Asset Handling:**
- Static assets are flattened to the deployment root using `scripts/sync-pages-assets.mjs` during the build process to ensure correct CSS/JS path resolution on Cloudflare.
