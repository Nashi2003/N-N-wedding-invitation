const openBtn = document.getElementById('openBtn');
const loader = document.getElementById('loader');
const rsvpForm = document.getElementById('rsvpForm');
const formMessage = document.getElementById('formMessage');

const weddingDate = new Date('December 13, 2026 11:00:00');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdownMessage = document.getElementById('countdownMessage');

const enterBtn = document.getElementById('enterBtn');
const invitationContent = document.getElementById('invitationContent');

function hideLoader() {
  loader.classList.add('hide');
}

function scrollToInvitation() {
  invitationContent.style.display = 'block';
  setTimeout(() => {
    document.getElementById('details').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    daysEl.textContent = '❤️';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    countdownMessage.textContent = 'Alhamdulillah! Today is our Wedding Day. Please keep us in your duas. 🤍';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

function handleRsvpSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('rsvpName').value.trim();
  const status = document.getElementById('rsvpStatus').value;
  const guests = document.getElementById('guestCount').value;
  const message = document.getElementById('rsvpMessage').value.trim();

  if (!name || !status) {
    formMessage.textContent = 'Please complete all required fields.';
    formMessage.style.color = '#b14747';
    return;
  }

  const whatsappMessage = `Wedding RSVP

Name: ${name}

Attendance: ${status}

Guests: ${guests}

Message:
${message}

Looking forward to celebrating with you!`;

  const phone = '919544708602';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;

  formMessage.textContent = 'Opening WhatsApp...';
  formMessage.style.color = '#3b5b3b';
  window.location.href = url;
  rsvpForm.reset();
}

window.addEventListener('load', () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

openBtn?.addEventListener('click', scrollToInvitation);
enterBtn?.addEventListener('click', hideLoader);
rsvpForm?.addEventListener('submit', handleRsvpSubmit);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.section').forEach((section) => observer.observe(section));