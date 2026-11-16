// Edit these values in GitHub, then commit to main to update the website.
const tokenConfig = {
  contractAddress: '3ZFxNiy51QpUMc9TDpnU7VVudB1bo6X6uiEzyNcWpump',
  chartUrl: 'https://dexscreener.com/solana/3ZFxNiy51QpUMc9TDpnU7VVudB1bo6X6uiEzyNcWpump'
};

document.querySelector('#address').textContent = tokenConfig.contractAddress;
const tokenLinks = {
  explorer: 'https://solscan.io/token/' + encodeURIComponent(tokenConfig.contractAddress),
  buy: 'https://pump.fun/coin/' + encodeURIComponent(tokenConfig.contractAddress),
  chart: tokenConfig.chartUrl
};
document.querySelectorAll('[data-token-link]').forEach((link) => {
  link.href = tokenLinks[link.dataset.tokenLink];
});
