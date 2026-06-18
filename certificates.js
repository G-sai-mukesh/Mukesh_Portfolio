const CERT_FILES = {
  cert_nptel_c:        'assets/certificates/cert_nptel_c.jpeg',
  cert_nptel_python:   'assets/certificates/cert_nptel_python.png',
  cert_guvi_python:    'assets/certificates/cert_guvi_python.jpeg',
  cert_salesforce:     'assets/certificates/cert_salesforce.png',
  cert_wipro:          'assets/certificates/cert_wipro_java.png',
  cert_spoken_c:       'assets/certificates/cert_spoken_c.png',
  cert_spoken_cpp:     'assets/certificates/cert_spoken_cpp.png',
  cert_spoken_java:    'assets/certificates/cert_spoken_java.png',
  cert_spoken_python:  'assets/certificates/cert_spoken_python.png',
  cert_brainovision:   'assets/certificates/cert_brainovision.png'
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
