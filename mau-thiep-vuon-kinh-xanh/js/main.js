/**
 * MẪU THIỆP VƯỜN KÍNH XANH
 * Main Interaction Script - Redesigned
 */

// 1. Photos list
const weddingPhotos = [
  '../anh/1.jpg', '../anh/2.jpg', '../anh/3.jpg', '../anh/4.jpg', '../anh/5.jpg',
  '../anh/6.jpg', '../anh/7.jpg', '../anh/8.jpg', '../anh/9.jpg'
];
let currentPhotoIdx = 0;

// 2. DOM
const envelopeScreen = document.getElementById('envelopeScreen');
const envelopeCardWrapper = document.getElementById('envelopeCardWrapper');
const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
const weddingAudio = document.getElementById('weddingAudio');
const musicToggleBtn = document.getElementById('musicToggleBtn');
const guestEl = document.getElementById('envGuestName');
const thanMoiEl = document.getElementById('envThanMoi');

// 3. Sparkle star effects (like demo ✦ scattered)
function createSparkles() {
  const layer = document.getElementById('sparkleLayer');
  if (!layer) return;
  const positions = [
    { left: '12%', top: '25%', delay: '0s', dur: '3.2s' },
    { left: '82%', top: '38%', delay: '1.1s', dur: '2.8s' },
    { left: '8%',  top: '58%', delay: '0.5s', dur: '3.5s' },
    { left: '88%', top: '62%', delay: '1.8s', dur: '3s'   },
    { left: '25%', top: '78%', delay: '0.8s', dur: '2.6s' },
    { left: '70%', top: '20%', delay: '2.2s', dur: '3.3s' },
    { left: '50%', top: '12%', delay: '1.5s', dur: '2.9s' },
    { left: '15%', top: '90%', delay: '0.3s', dur: '3.1s' },
    { left: '78%', top: '85%', delay: '1.9s', dur: '2.7s' },
  ];
  positions.forEach(pos => {
    const star = document.createElement('span');
    star.className = 'sparkle-star';
    star.textContent = '✦';
    star.style.left = pos.left;
    star.style.top = pos.top;
    star.style.animationDelay = pos.delay;
    star.style.animationDuration = pos.dur;
    layer.appendChild(star);
  });
}
createSparkles();

// 4. URL params
const urlParams = new URLSearchParams(window.location.search);
const guestParam = urlParams.get('to') || urlParams.get('guest');

if (guestParam) {
  const decodedGuest = decodeURIComponent(guestParam).trim();
  if (guestEl) guestEl.textContent = decodedGuest;
  if (urlParams.get('prefix')) {
    if (thanMoiEl) thanMoiEl.textContent = decodeURIComponent(urlParams.get('prefix'));
  } else {
    const lower = decodedGuest.toLowerCase();
    if (lower.startsWith('bác') || lower.startsWith('chú') || lower.startsWith('cô') ||
        lower.startsWith('dì') || lower.startsWith('cậu') || lower.startsWith('ông') ||
        lower.startsWith('bà')) {
      if (thanMoiEl) thanMoiEl.textContent = 'Kính Mời';
    } else if (lower.startsWith('anh') || lower.startsWith('chị')) {
      if (thanMoiEl) thanMoiEl.textContent = 'Trân Trọng Kính Mời';
    } else if (lower.startsWith('em')) {
      if (thanMoiEl) thanMoiEl.textContent = 'Thân Mời';
    } else {
      if (thanMoiEl) thanMoiEl.textContent = 'Kính Mời';
    }
  }
} else {
  if (guestEl) guestEl.textContent = 'QUÝ KHÁCH';
  if (thanMoiEl) thanMoiEl.textContent = 'Kính Mời';
}

if (urlParams.get('groom')) {
  document.querySelectorAll('.groom-name-display').forEach(el => el.textContent = decodeURIComponent(urlParams.get('groom')));
}
if (urlParams.get('bride')) {
  document.querySelectorAll('.bride-name-display').forEach(el => el.textContent = decodeURIComponent(urlParams.get('bride')));
}
if (urlParams.get('date')) {
  const dateEl = document.getElementById('envWeddingDate');
  if (dateEl) dateEl.textContent = decodeURIComponent(urlParams.get('date'));
}

// 5. Envelope open
function openEnvelope() {
  if (!envelopeScreen || envelopeScreen.classList.contains('opened')) return;
  envelopeScreen.classList.add('opened');
  document.body.classList.remove('locked');
  if (weddingAudio) {
    weddingAudio.play().then(() => {
      if (musicToggleBtn) musicToggleBtn.classList.add('playing');
    }).catch(() => {});
  }
}

if (urlParams.get('open') === '1') {
  if (envelopeScreen) envelopeScreen.classList.add('opened');
  document.body.classList.remove('locked');
}

if (envelopeCardWrapper) envelopeCardWrapper.addEventListener('click', openEnvelope);
if (openEnvelopeBtn) {
  openEnvelopeBtn.addEventListener('click', (e) => { e.stopPropagation(); openEnvelope(); });
}

// 6. Music
if (musicToggleBtn && weddingAudio) {
  musicToggleBtn.addEventListener('click', () => {
    if (weddingAudio.paused) {
      weddingAudio.play().then(() => musicToggleBtn.classList.add('playing')).catch(() => {});
    } else {
      weddingAudio.pause();
      musicToggleBtn.classList.remove('playing');
    }
  });
}

// 7. Lightbox
const lightboxModal = document.getElementById('lightboxModal');
const lightboxActiveImg = document.getElementById('lightboxActiveImg');
const lightboxCounter = document.getElementById('lightboxCounter');
const galleryItems = document.querySelectorAll('.gallery-item');

function openLightbox(idx) {
  currentPhotoIdx = idx;
  if (lightboxActiveImg) lightboxActiveImg.src = weddingPhotos[currentPhotoIdx];
  if (lightboxCounter) lightboxCounter.textContent = `${currentPhotoIdx + 1} / ${weddingPhotos.length}`;
  if (lightboxModal) lightboxModal.classList.add('active');
}

galleryItems.forEach(card => {
  card.addEventListener('click', () => openLightbox(parseInt(card.getAttribute('data-index') || '0', 10)));
});

const closeLightboxBtn = document.getElementById('closeLightboxBtn');
if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', () => lightboxModal && lightboxModal.classList.remove('active'));

const prevLightboxBtn = document.getElementById('prevLightboxBtn');
if (prevLightboxBtn) {
  prevLightboxBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentPhotoIdx = (currentPhotoIdx - 1 + weddingPhotos.length) % weddingPhotos.length;
    if (lightboxActiveImg) lightboxActiveImg.src = weddingPhotos[currentPhotoIdx];
    if (lightboxCounter) lightboxCounter.textContent = `${currentPhotoIdx + 1} / ${weddingPhotos.length}`;
  });
}

const nextLightboxBtn = document.getElementById('nextLightboxBtn');
if (nextLightboxBtn) {
  nextLightboxBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentPhotoIdx = (currentPhotoIdx + 1) % weddingPhotos.length;
    if (lightboxActiveImg) lightboxActiveImg.src = weddingPhotos[currentPhotoIdx];
    if (lightboxCounter) lightboxCounter.textContent = `${currentPhotoIdx + 1} / ${weddingPhotos.length}`;
  });
}

if (lightboxModal) {
  lightboxModal.addEventListener('click', (e) => { if (e.target === lightboxModal) lightboxModal.classList.remove('active'); });
}

window.addEventListener('keydown', (e) => {
  if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') prevLightboxBtn && prevLightboxBtn.click();
  if (e.key === 'ArrowRight') nextLightboxBtn && nextLightboxBtn.click();
  if (e.key === 'Escape') lightboxModal.classList.remove('active');
});
