// =============================
// Wedding Countdown / Married For
// =============================

// Set your wedding date/time here:
const weddingDate = new Date("2026-01-23T22:00:00+05:30").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diffToWedding = weddingDate - now;

  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");
  const taglineMain = document.getElementById("countdown-tagline-main");
  const taglineSecondary = document.getElementById(
    "countdown-tagline-secondary"
  );

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  let diff;
  if (diffToWedding >= 0) {
    // BEFORE WEDDING – countdown
    diff = diffToWedding;
    if (taglineMain) {
      taglineMain.textContent = "Counting down to";
    }
    if (taglineSecondary) {
      taglineSecondary.textContent = "our wedding day.";
    }
  } else {
    // AFTER WEDDING – married for
    diff = now - weddingDate;
    if (taglineMain) {
      taglineMain.textContent = "Married for";
    }
    if (taglineSecondary) {
      taglineSecondary.textContent = "and counting.";
    }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  daysEl.textContent = days;
  hoursEl.textContent = hours.toString().padStart(2, "0");
  minsEl.textContent = mins.toString().padStart(2, "0");
  secsEl.textContent = secs.toString().padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

// =============================
// Simple Slideshow
// =============================

const slides = document.querySelectorAll(".hero-slideshow img");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  if (!slides || slides.length === 0) return;
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

if (slides && slides.length > 0) {
  showSlide(0);
  setInterval(nextSlide, 6000); // 6 seconds per photo
}

// =============================
// Password gate + obfuscated data
// =============================

// Password "anand" as character codes (not obvious at a glance)
const _pwChars = [97, 110, 97, 110, 100];
const OBFUSCATED_PASSWORD = String.fromCharCode(..._pwChars);

// Album URL in Base64, split into chunks so it's not readable as a single string.
// TODO: replace the strings in _albumParts with your own Base64-encoded URL.
const _albumParts = [
  "aHR0cHM6Ly9waG90b3Mu",
  "YXBwLmdvby5nbC9Odjc5bW5ad",
  "1U5cUs2SFp5Ng=="
];

function decodeAlbumUrl() {
  try {
    const joined = _albumParts.join("");
    return atob(joined);
  } catch (e) {
    return "";
  }
}

function handlePasswordSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("photos-password-input");
  const error = document.getElementById("photos-password-error");
  const gallery = document.getElementById("photos-gallery");
  const card = document.getElementById("password-card");

  if (!input || !error || !gallery || !card) return;

  const entered = input.value.trim().toLowerCase();
  const expected = OBFUSCATED_PASSWORD.toLowerCase();

  if (entered === expected) {
    error.textContent = "";

    const albumLink = decodeAlbumUrl();
    const btn = document.getElementById("google-photos-link");

    if (btn && albumLink) {
      btn.href = albumLink;
    }

    gallery.style.display = "block";
    card.style.display = "none";
  } else {
    error.textContent = "Incorrect answer. Try again 🙂";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const passwordForm = document.getElementById("photos-password-form");
  if (passwordForm) {
    passwordForm.addEventListener("submit", handlePasswordSubmit);
  }
});
