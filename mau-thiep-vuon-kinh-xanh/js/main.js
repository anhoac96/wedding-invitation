/**
 * MẪU THIỆP VƯỜN KÍNH - XANH (CHUNG ĐÔI OFFICIAL REPLICA 100%)
 * Main Interaction & Lightbox Script
 */

// 1. Photos list for Lightbox Gallery
const weddingPhotos = [
  '../anh/1.jpg', '../anh/2.jpg', '../anh/3.jpg', '../anh/4.jpg', '../anh/5.jpg',
  '../anh/6.jpg', '../anh/7.jpg', '../anh/8.jpg', '../anh/9.jpg'
];
let currentPhotoIdx = 0;

// 2. DOM Elements
const envelopeScreen = document.getElementById('envelopeScreen');
const envelopeCardWrapper = document.getElementById('envelopeCardWrapper');
const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
const weddingAudio = document.getElementById('weddingAudio');
const musicToggleBtn = document.getElementById('musicToggleBtn');
const guestEl = document.getElementById('envGuestName');
const thanMoiEl = document.getElementById('envThanMoi');

// 3. Dynamic URL Query Parameters & Smart Vietnamese Greeting Logic
const urlParams = new URLSearchParams(window.location.search);
const guestParam = urlParams.get('to') || urlParams.get('guest');

if (guestParam) {
  const decodedGuest = decodeURIComponent(guestParam).trim();
  if (guestEl) {
    guestEl.textContent = decodedGuest;
    guestEl.style.display = 'block';
  }

  if (urlParams.get('prefix')) {
    if (thanMoiEl) thanMoiEl.textContent = decodeURIComponent(urlParams.get('prefix'));
  } else {
    const lower = decodedGuest.toLowerCase();
    if (lower.startsWith('bác') || lower.startsWith('chú') || lower.startsWith('cô') ||
        lower.startsWith('dì') || lower.startsWith('cậu') || lower.startsWith('ông') ||
        lower.startsWith('bà') || lower.startsWith('gia đình bác') || lower.startsWith('gia đình chú') ||
        lower.startsWith('gia đình cô') || lower.startsWith('gia đình dì') || lower.startsWith('gia đình cậu')) {
      if (thanMoiEl) thanMoiEl.textContent = 'Kính Mời';
    } else if (lower.startsWith('anh') || lower.startsWith('chị') ||
               lower.startsWith('gia đình anh') || lower.startsWith('gia đình chị')) {
      if (thanMoiEl) thanMoiEl.textContent = 'Trân Trọng Kính Mời';
    } else if (lower.startsWith('em') || lower.startsWith('gia đình em')) {
      if (thanMoiEl) thanMoiEl.textContent = 'Thân Mời';
    } else {
      if (thanMoiEl) thanMoiEl.textContent = 'Kính Mời';
    }
  }
} else {
  if (guestEl) guestEl.style.display = 'none';
  if (thanMoiEl) thanMoiEl.textContent = 'Thân Mời';
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

// 4. Envelope Open Controller
function openEnvelope() {
  if (!envelopeScreen || envelopeScreen.classList.contains('opened')) return;
  envelopeScreen.classList.add('opened');
  document.body.classList.remove('locked');

  // Attempt auto-play music
  if (weddingAudio) {
    weddingAudio.play().then(() => {
      if (musicToggleBtn) musicToggleBtn.classList.add('playing');
    }).catch(err => {
      console.log('Audio autoplay prevented by browser policy:', err);
    });
  }
}

// Auto-open if ?open=1 parameter is present
if (urlParams.get('open') === '1') {
  if (envelopeScreen) envelopeScreen.classList.add('opened');
  document.body.classList.remove('locked');
}

if (envelopeCardWrapper) {
  envelopeCardWrapper.addEventListener('click', openEnvelope);
}
if (openEnvelopeBtn) {
  openEnvelopeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openEnvelope();
  });
}

// 5. Floating Music Player Toggle
if (musicToggleBtn && weddingAudio) {
  musicToggleBtn.addEventListener('click', () => {
    if (weddingAudio.paused) {
      weddingAudio.play().then(() => {
        musicToggleBtn.classList.add('playing');
      }).catch(err => console.log('Music play error:', err));
    } else {
      weddingAudio.pause();
      musicToggleBtn.classList.remove('playing');
    }
  });
}

// 6. Lightbox Gallery Controller
const lightboxModal = document.getElementById('lightboxModal');
const lightboxActiveImg = document.getElementById('lightboxActiveImg');
const lightboxCounter = document.getElementById('lightboxCounter');
const galleryItems = document.querySelectorAll('.gallery-card-item');

function openLightbox(idx) {
  currentPhotoIdx = idx;
  if (lightboxActiveImg) lightboxActiveImg.src = weddingPhotos[currentPhotoIdx];
  if (lightboxCounter) lightboxCounter.textContent = `${currentPhotoIdx + 1} / ${weddingPhotos.length}`;
  if (lightboxModal) lightboxModal.classList.add('active');
}

galleryItems.forEach(card => {
  card.addEventListener('click', () => {
    const idx = parseInt(card.getAttribute('data-index') || '0', 10);
    openLightbox(idx);
  });
});

const closeLightboxBtn = document.getElementById('closeLightboxBtn');
if (closeLightboxBtn) {
  closeLightboxBtn.addEventListener('click', () => {
    if (lightboxModal) lightboxModal.classList.remove('active');
  });
}

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
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      lightboxModal.classList.remove('active');
    }
  });
}

window.addEventListener('keydown', (e) => {
  if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') prevLightboxBtn && prevLightboxBtn.click();
  if (e.key === 'ArrowRight') nextLightboxBtn && nextLightboxBtn.click();
  if (e.key === 'Escape') lightboxModal.classList.remove('active');
});
