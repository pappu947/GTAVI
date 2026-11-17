const copyButton = document.querySelector('#copy');
const contract = document.querySelector('#address');
const feedback = document.querySelector('#copy-status');

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(contract.textContent.trim());
    feedback.textContent = 'Contract address copied.';
  } catch {
    feedback.textContent = 'Clipboard unavailable. Select and copy the address above.';
  }
});

const heroVideo = document.querySelector('#hero-video');
const videoToggle = document.querySelector('#video-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

videoToggle.hidden = false;

function updateVideoButton() {
  videoToggle.textContent = heroVideo.paused ? 'Play animation' : 'Pause animation';
}

async function playAnimation() {
  try {
    await heroVideo.play();
  } catch {
    updateVideoButton();
  }
}

videoToggle.addEventListener('click', () => {
  if (heroVideo.paused) {
    playAnimation();
  } else {
    heroVideo.pause();
  }
});

heroVideo.addEventListener('play', updateVideoButton);
heroVideo.addEventListener('pause', updateVideoButton);
heroVideo.addEventListener('error', () => {
  heroVideo.hidden = true;
  videoToggle.hidden = true;
});
heroVideo.querySelector('source').addEventListener('error', () => {
  heroVideo.hidden = true;
  videoToggle.hidden = true;
});
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) heroVideo.pause();
});
if (!reducedMotion.matches) playAnimation();

const ticker = document.querySelector('.ticker');
const tickerToggle = document.querySelector('#ticker-toggle');
tickerToggle.hidden = false;
tickerToggle.addEventListener('click', () => {
  const paused = ticker.classList.toggle('is-paused');
  tickerToggle.textContent = paused ? '▶' : 'Ⅱ';
  tickerToggle.setAttribute('aria-label', paused ? 'Play scrolling ticker' : 'Pause scrolling ticker');
});

document.querySelectorAll('.coin-flip').forEach((button) => {
  button.addEventListener('click', () => {
    const flipped = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(flipped));
    button.setAttribute('aria-label', flipped ? 'Show Lucia back view' : 'Show Lucia front view');
    button.querySelector('.coin-face-initial').setAttribute('aria-hidden', String(flipped));
    button.querySelector('.coin-face-reverse').setAttribute('aria-hidden', String(!flipped));
  });
});
document.querySelectorAll('.coin-copy').forEach((button) => {
  button.addEventListener('click', async () => {
    const status = button.closest('.linked-card-body').querySelector('.coin-copy-status');
    const address = document.getElementById(button.dataset.addressId).textContent.trim();
    try {
      await navigator.clipboard.writeText(address);
      status.textContent = 'Contract address copied.';
    } catch {
      status.textContent = 'Select and copy the contract address above.';
    }
  });
});
