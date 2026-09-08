Earthquake Explorer

A small data-exploration interface using the **USGS Earthquake Catalog API**. It helps a user answer practical questions about the selected period: how many earthquakes were recorded, how large they were, where they were concentrated, and how the magnitudes are distributed.

## Run locally

No build step is required.

1. Download or clone the repository.
2. Open `index.html` in a browser.
3. If your browser blocks API requests from a local file, serve the folder with any simple static server, for example `python -m http.server`.
4. Open the local address shown by the server.

The app uses the USGS FDSN Event Web Service with GeoJSON output. USGS documents filters such as start/end time and minimum magnitude, and its GeoJSON feed contains event magnitude, time, place and coordinates.

## How to review the states

- **Loading:** reload the page or select **Update view**. The loading message appears before the request completes.
- **Failure:** open browser DevTools → Network → select **Offline**, then select **Update view**. The app shows a clear failure message and a **Try again** action. Turn the network back on to recover.
- The source is live, so the exact numbers will change as the USGS catalog is updated.

## What the data supports

The interface supports statements about **earthquake events recorded in the selected USGS query**, such as their reported magnitude, time, location and distribution. It can help compare the returned records across time ranges and magnitude thresholds.

## What the data does not support

This dashboard is **not an earthquake prediction or risk model**. A concentration of recorded events does not establish that another earthquake will happen there, and event counts alone do not measure damage, casualties, hazard, or future probability. The selected results are also limited by the query and by what the USGS catalog has recorded and reported.

## Source

USGS Earthquake Catalog / FDSN Event Web Service:
https://earthquake.usgs.gov/fdsnws/event/1/query

USGS notes that the service supports GeoJSON queries and filters such as time, magnitude and geographic bounds. The real-time GeoJSON feeds are updated regularly.

## Deployment

This is a static frontend and can be deployed to GitHub Pages, Netlify, or Vercel. The live app needs internet access because it fetches current records from USGS.
