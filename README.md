# GTAVI website

Static website for Grab That Ass ($GTAVI).

## Publish with GitHub Pages

Open repository Settings → Pages. Under Build and deployment select Deploy from a branch, then main and / (root). Save.

## Update the contract later

Edit config.js and change contractAddress. This updates the displayed address, copy button, Solscan links and Pump.fun links. Change chartUrl separately when the trading pair changes. Commit to main to publish.

The current contract and chart values came from the original reference site. Replace them with the final project details before directing visitors to trade.

## Rewards data

The wallet rewards interface validates addresses and creates preview images. Actual payout totals and history require a verified rewards API or distributor source.

## Files

index.html contains the page content. style.css controls styling. site.js controls the video, ticker and copy button. wallet-rewards.js controls the rewards interface. media/ contains the images and video.
