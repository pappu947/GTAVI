const walletForm = document.querySelector('#wallet-form');
const walletInput = document.querySelector('#reward-wallet');
const walletMessage = document.querySelector('#wallet-message');
const walletResults = document.querySelector('#wallet-results');
const statementPanel = document.querySelector('#statement-panel');
const statementToggle = document.querySelector('#statement-toggle');
const statementCard = document.querySelector('#statement-card');
const statementDate = document.querySelector('#statement-date');

function isSolanaAddress(address) {
  const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) return false;
  let value = 0n;
  for (const character of address) {
    value = value * 58n + BigInt(alphabet.indexOf(character));
  }
  const bytes = value === 0n ? 0 : Math.ceil(value.toString(16).length / 2);
  const leadingZeros = address.match(/^1*/)[0].length;
  return bytes + leadingZeros === 32;
}

walletInput.addEventListener('input', () => {
  walletInput.removeAttribute('aria-invalid');
  walletResults.hidden = true;
  walletMessage.textContent = 'Payout data connection pending.';
});

walletForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const address = walletInput.value.trim();
  if (!isSolanaAddress(address)) {
    walletInput.setAttribute('aria-invalid', 'true');
    walletMessage.textContent = 'Enter a valid 32–44 character Solana wallet address.';
    walletResults.hidden = true;
    walletInput.focus();
    return;
  }
  walletInput.value = address;
  walletInput.removeAttribute('aria-invalid');
  document.querySelector('#statement-wallet').textContent = address;
  document.querySelector('#history-wallet').textContent = address;
  document.querySelector('#wallet-explorer').href = 'https://solscan.io/account/' + address;
  statementDate.textContent = new Date().toISOString().slice(0, 16).replace('T', ' ');
  walletMessage.textContent = 'Wallet address accepted. The payout data source is not connected, so reward totals and history are unavailable.';
  walletResults.hidden = false;
});

statementToggle.addEventListener('click', () => {
  statementPanel.hidden = !statementPanel.hidden;
  statementToggle.setAttribute('aria-expanded', String(!statementPanel.hidden));
  statementToggle.textContent = statementPanel.hidden ? 'Preview statement +' : 'Close statement ×';
});

document.querySelectorAll('[data-unit]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('#wallet-unit').textContent = button.dataset.unit;
    document.querySelectorAll('[data-unit]').forEach((option) => {
      option.setAttribute('aria-pressed', String(option === button));
    });
  });
});

document.querySelectorAll('button[data-theme]').forEach((button) => {
  button.addEventListener('click', () => {
    statementCard.dataset.theme = button.dataset.theme;
    document.querySelectorAll('button[data-theme]').forEach((option) => {
      option.setAttribute('aria-pressed', String(option === button));
    });
  });
});

document.querySelector('#statement-save').addEventListener('click', async () => {
  const button = document.querySelector('#statement-save');
  button.disabled = true;
  try {
    const artwork = new Image();
    artwork.src = 'media/gtavi-bitcoin-rewards.png';
    await artwork.decode();
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1100;
    const context = canvas.getContext('2d');
    const orange = statementCard.dataset.theme === 'orange';
    context.fillStyle = orange ? '#ff8916' : '#12100d';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = orange ? '#15100a' : '#f5eee3';
    context.font = 'bold 44px sans-serif';
    context.fillText('$GTAVI', 48, 74);
    context.font = '18px sans-serif';
    context.fillText('GRAB THAT ASS', 48, 108);
    context.drawImage(artwork, 0, 140, 1200, 600);
    context.fillStyle = orange ? '#15100a' : '#f5eee3';
    context.font = 'bold 28px sans-serif';
    context.fillText('PAYOUT STATEMENT PREVIEW', 48, 795);
    context.font = '24px sans-serif';
    context.fillText('Awaiting verified payout data', 48, 842);
    context.font = '18px monospace';
    context.fillText('RECIPIENT WALLET', 48, 905);
    context.fillText(document.querySelector('#statement-wallet').textContent, 48, 940);
    context.fillText('PREVIEW CREATED · ' + statementDate.textContent + ' UTC', 48, 995);
    context.fillText('Hold $GTAVI. Stack BTC.', 48, 1050);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) throw new Error('Image export failed');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gtavi-payout-preview.png';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch {
    walletMessage.textContent = 'The preview could not be saved. Please try again.';
  } finally {
    button.disabled = false;
  }
});
