// ================= INTRO =================
const introScreen = document.getElementById("intro-screen");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function closeIntro() {
  introScreen.classList.add("hidden");
}
document.getElementById("skip-intro-btn").addEventListener("click", closeIntro);
setTimeout(closeIntro, prefersReducedMotion ? 300 : 2600);

// ================= WIRE UP CONTENT FROM CONFIG =================
document.getElementById("btn-register-now").href = CONFIG.GOOGLE_FORM_URL;
document.getElementById("contact-name").textContent = CONFIG.CONTACT_NAME;
document.getElementById("contact-phone").textContent = " · " + CONFIG.CONTACT_PHONE;
