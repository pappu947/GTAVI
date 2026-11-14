// Edit these values in GitHub, then commit to main to update the website.
const tokenConfig = {
  contractAddress: '8MN3r9YWxnYPCJqZe8W42xRkBPxnCgw7ZkPCeUnZpump',
  chartUrl: 'https://dexscreener.com/solana/H4rQVUMb9vTK4JkSNMzhKjTsXoMHbgifJmvDc4RW8WFq'
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
