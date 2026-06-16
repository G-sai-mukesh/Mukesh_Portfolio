const CERT_FILES = {
  cert_nptel_c:        'assets/cert_nptel_c.jpeg',
  cert_nptel_python:   'assets/cert_nptel_python.png',
  cert_guvi_python:    'assets/cert_guvi_python.jpeg',
  cert_salesforce:     'assets/cert_salesforce.png',
  cert_wipro:          'assets/cert_wipro_java.png',
  cert_spoken_c:       'assets/cert_spoken_c.png',
  cert_spoken_cpp:     'assets/cert_spoken_cpp.png',
  cert_spoken_java:    'assets/cert_spoken_java.png',
  cert_spoken_python:  'assets/cert_spoken_python.png',
  cert_brainovision:   'assets/cert_brainovision.png'
};

function openCert(key, title) {
  const path = CERT_FILES[key];
  if (!path) return;

  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modal = document.getElementById('certModal');

  modalTitle.textContent = title;

  modalBody.innerHTML = `<img src="${path}" alt="${title}">`;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('certModal');
  const modalBody = document.getElementById('modalBody');
  modal.classList.remove('active');
  modalBody.innerHTML = '';
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
