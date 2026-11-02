let generatedOtp = null;

// ---------- TOAST & NOTICE HELPERS ----------
function showNotification(message, isError = false) {
  let toast = document.getElementById('uhToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'uhToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      padding: 12px 20px;
      background: var(--surface);
      color: var(--text-main);
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      box-shadow: var(--shadow-lg);
      font-size: 0.9rem;
      font-weight: 600;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.25s ease;
      opacity: 0;
      transform: translateY(12px);
    `;
    document.body.appendChild(toast);
  }
  toast.style.borderColor = isError ? 'var(--danger)' : 'var(--primary)';
  toast.setAttribute('role', isError ? 'alert' : 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.style.backdropFilter = 'blur(8px)';
  toast.innerHTML = `
    <span style="width:8px;height:8px;border-radius:50%;background:${isError ? 'var(--danger)' : 'var(--primary)'};display:inline-block;box-shadow:0 0 8px ${isError ? 'var(--danger)' : 'var(--primary)'}"></span>
    <span style="letter-spacing:0.01em;">${message}</span>
  `;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  clearTimeout(showNotification.timer);
  showNotification.timer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
  }, 4000);
}

// Fallback heart & animation stubs for backward-compatible event signatures
function createFloatingHeart() {}
function toggleLike() {}
function createButtonRipple() {}

// ---------- THEME MANAGEMENT ----------
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    document.documentElement.dataset.theme = 'dark';
  } else {
    document.body.classList.remove('dark');
    document.documentElement.dataset.theme = 'light';
  }
  localStorage.setItem('uh-theme', theme);
}

function toggleTheme() {
  const isDark = document.body.classList.contains('dark') || document.documentElement.dataset.theme === 'dark';
  applyTheme(isDark ? 'light' : 'dark');
}

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('uh-theme') || 'light';
  applyTheme(saved);

  const phId = localStorage.getItem('pharmacyId');
  const spot = document.getElementById('sidebarPhId');
  if (phId && spot) {
    spot.textContent = phId;
  }
});

// ---------- AUTH VIEW TOGGLING ----------
function toggleAuth(view) {
  const loginView = document.getElementById('login-view');
  const registerView = document.getElementById('register-view');
  const forgotPassView = document.getElementById('forgot-pass-view');
  const forgotUhView = document.getElementById('forgot-uh-view');

  if (forgotPassView) forgotPassView.classList.add('d-none');
  if (forgotUhView) forgotUhView.classList.add('d-none');

  if (view === 'reg') {
    if (loginView) loginView.classList.add('d-none');
    if (registerView) registerView.classList.remove('d-none');
  } else {
    if (registerView) registerView.classList.add('d-none');
    if (loginView) loginView.classList.remove('d-none');
  }
}

function startOtpFlow(event) {
  if (event) event.preventDefault();
  const pass = document.getElementById('regPass')?.value;
  const confirm = document.getElementById('regPassConfirm')?.value;

  if (!pass) {
    alert('Please set a password before continuing.');
    return;
  }
  if (pass.length < 8) {
    alert('Security Notice: Password must be at least 8 characters.');
    return;
  }
  if (pass !== confirm) {
    alert('Password mismatch. Please ensure both password fields are identical.');
    return;
  }

  generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
  console.log('UniHealth Simulation OTP:', generatedOtp);

  alert('Security verification code sent to registered contact: ' + generatedOtp);

  const step1 = document.getElementById('reg-step-1');
  const step2 = document.getElementById('reg-step-2');
  if (step1) step1.classList.add('d-none');
  if (step2) step2.classList.remove('d-none');
}

function resendOtp() {
  generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
  console.log('UniHealth Resent OTP:', generatedOtp);
  alert('New security verification code sent: ' + generatedOtp);
}

function backToRegDetails() {
  const step1 = document.getElementById('reg-step-1');
  const step2 = document.getElementById('reg-step-2');
  if (step2) step2.classList.add('d-none');
  if (step1) step1.classList.remove('d-none');
}

function generatePharmacyId() {
  const num = Math.floor(10000 + Math.random() * 90000);
  return 'UH_' + num;
}

function handleRegistration(event) {
  if (event) event.preventDefault();
  const otpInput = document.getElementById('regOtp')?.value.trim();

  if (!generatedOtp) {
    alert('Please request an OTP first.');
    return;
  }
  if (otpInput !== generatedOtp) {
    alert('Invalid authorization code. Please verify and retry.');
    return;
  }

  const autoId = generatePharmacyId();
  const regIdInput = document.getElementById('regId');
  if (regIdInput) regIdInput.value = autoId;

  alert('UniHealth Onboarding Complete! Your Assigned Pharmacy ID is: ' + autoId);
  toggleAuth('login');
  const loginInput = document.getElementById('loginId');
  if (loginInput) loginInput.value = autoId;
  localStorage.setItem('pharmacyId', autoId);
}

function handleLogin(event) {
  if (event) event.preventDefault();
  const id = document.getElementById('loginId')?.value.trim();
  const pass = document.getElementById('loginPass')?.value;

  if (!id || !pass) {
    alert('Please enter your Pharmacy ID and Password.');
    return;
  }

  localStorage.setItem('pharmacyId', id);
  window.location.href = 'dashboard.html';
}

function handleLogout() {
  localStorage.removeItem('pharmacyId');
  window.location.href = 'index.html';
}

// ---------- MOBILE SIDEBAR DRAWER ----------
function toggleMobileSidebar() {
  const sidebar = document.getElementById('appSidebar');
  let overlay = document.getElementById('sidebarOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'sidebarOverlay';
    overlay.className = 'sidebar-overlay';
    overlay.onclick = toggleMobileSidebar;
    document.body.appendChild(overlay);
  }
  if (sidebar) {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active', sidebar.classList.contains('open'));
  }
}

// Global Enter Key Handler
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const loginView = document.getElementById('login-view');
    if (loginView && !loginView.classList.contains('d-none')) {
      handleLogin();
    }
  }
});

// ---------- FORGOT PASSWORD FLOW ----------
let forgotPassOtp = null;
let forgotPassPhone = null;

function showForgotPassword() {
  const loginView = document.getElementById('login-view');
  const regView = document.getElementById('register-view');
  const fuhView = document.getElementById('forgot-uh-view');
  const fpView = document.getElementById('forgot-pass-view');

  if (loginView) loginView.classList.add('d-none');
  if (regView) regView.classList.add('d-none');
  if (fuhView) fuhView.classList.add('d-none');
  if (fpView) {
    fpView.classList.remove('d-none');
    fpView.style.display = 'flex';
  }

  const s1 = document.getElementById('fp-step-1');
  const s2 = document.getElementById('fp-step-2');
  const s3 = document.getElementById('fp-step-3');
  if (s1) { s1.classList.remove('d-none'); s1.style.display = 'block'; }
  if (s2) { s2.classList.add('d-none'); s2.style.display = 'none'; }
  if (s3) { s3.classList.add('d-none'); s3.style.display = 'none'; }
}

function backToLoginFromForgotPass() {
  const fpView = document.getElementById('forgot-pass-view');
  const loginView = document.getElementById('login-view');
  if (fpView) {
    fpView.classList.add('d-none');
    fpView.style.display = 'none';
  }
  if (loginView) {
    loginView.classList.remove('d-none');
    loginView.style.display = 'flex';
  }
}

function startForgotPassOtp(event) {
  if (event) event.preventDefault();
  const phone = document.getElementById('fpPhone')?.value.trim();
  if (!phone) {
    alert('Please enter your registered phone number.');
    return;
  }
  forgotPassPhone = phone;
  forgotPassOtp = String(Math.floor(100000 + Math.random() * 900000));
  console.log('ForgotPass OTP:', forgotPassOtp);
  alert('Password reset authorization code: ' + forgotPassOtp);

  const s1 = document.getElementById('fp-step-1');
  const s2 = document.getElementById('fp-step-2');
  if (s1) { s1.classList.add('d-none'); s1.style.display = 'none'; }
  if (s2) { s2.classList.remove('d-none'); s2.style.display = 'block'; }
}

function resendForgotPassOtp() {
  if (!forgotPassPhone) {
    alert('Please enter your phone and request OTP first.');
    return;
  }
  forgotPassOtp = String(Math.floor(100000 + Math.random() * 900000));
  console.log('Resent ForgotPass OTP:', forgotPassOtp);
  alert('New password reset authorization code: ' + forgotPassOtp);
}

function verifyForgotPassOtp(event) {
  if (event) event.preventDefault();
  const input = document.getElementById('fpOtp')?.value.trim();
  if (!forgotPassOtp) {
    alert('Please request an authorization code first.');
    return;
  }
  if (input !== forgotPassOtp) {
    alert('Invalid code. Please re-enter.');
    return;
  }
  alert('Code verified successfully. Please enter your new password.');

  const s2 = document.getElementById('fp-step-2');
  const s3 = document.getElementById('fp-step-3');
  if (s2) { s2.classList.add('d-none'); s2.style.display = 'none'; }
  if (s3) { s3.classList.remove('d-none'); s3.style.display = 'block'; }
}

function confirmForgotPass(event) {
  if (event) event.preventDefault();
  const pass = document.getElementById('fpNewPass')?.value;
  const confirm = document.getElementById('fpNewPassConfirm')?.value;

  if (!pass || !confirm) {
    alert('Please enter and confirm your new password.');
    return;
  }
  if (pass.length < 8) {
    alert('Password must be at least 8 characters long.');
    return;
  }
  if (pass !== confirm) {
    alert('Password mismatch. Please ensure both fields match.');
    return;
  }

  alert('Password updated successfully! Please sign in with your new credentials.');
  backToLoginFromForgotPass();
}

// ---------- FORGOT UH ID FLOW ----------
let forgotUhOtp = null;
let forgotUhEmail = null;
let forgotUhPhone = null;

function showForgotUhId() {
  const loginView = document.getElementById('login-view');
  const regView = document.getElementById('register-view');
  const fpView = document.getElementById('forgot-pass-view');
  const fuhView = document.getElementById('forgot-uh-view');

  if (loginView) loginView.classList.add('d-none');
  if (regView) regView.classList.add('d-none');
  if (fpView) fpView.classList.add('d-none');
  if (fuhView) {
    fuhView.classList.remove('d-none');
    fuhView.style.display = 'flex';
  }

  const s1 = document.getElementById('fuh-step-1');
  const s2 = document.getElementById('fuh-step-2');
  const s3 = document.getElementById('fuh-step-3');
  if (s1) { s1.classList.remove('d-none'); s1.style.display = 'block'; }
  if (s2) { s2.classList.add('d-none'); s2.style.display = 'none'; }
  if (s3) { s3.classList.add('d-none'); s3.style.display = 'none'; }
}

function backToLoginFromForgotUh() {
  const fuhView = document.getElementById('forgot-uh-view');
  const loginView = document.getElementById('login-view');
  if (fuhView) {
    fuhView.classList.add('d-none');
    fuhView.style.display = 'none';
  }
  if (loginView) {
    loginView.classList.remove('d-none');
    loginView.style.display = 'flex';
  }
}

function startForgotUhOtp(event) {
  if (event) event.preventDefault();
  const email = document.getElementById('fuhEmail')?.value.trim();
  const phone = document.getElementById('fuhPhone')?.value.trim();

  if (!email || !phone) {
    alert('Please enter both registered email and phone number.');
    return;
  }

  forgotUhEmail = email;
  forgotUhPhone = phone;
  forgotUhOtp = String(Math.floor(100000 + Math.random() * 900000));
  console.log('ForgotUH OTP:', forgotUhOtp);
  alert('Account verification code: ' + forgotUhOtp);

  const s1 = document.getElementById('fuh-step-1');
  const s2 = document.getElementById('fuh-step-2');
  if (s1) { s1.classList.add('d-none'); s1.style.display = 'none'; }
  if (s2) { s2.classList.remove('d-none'); s2.style.display = 'block'; }
}

function resendForgotUhOtp() {
  if (!forgotUhPhone) {
    alert('Please enter credentials and request OTP first.');
    return;
  }
  forgotUhOtp = String(Math.floor(100000 + Math.random() * 900000));
  console.log('Resent ForgotUH OTP:', forgotUhOtp);
  alert('New verification code: ' + forgotUhOtp);
}

function verifyForgotUhOtp(event) {
  if (event) event.preventDefault();
  const input = document.getElementById('fuhOtp')?.value.trim();
  if (!forgotUhOtp) {
    alert('Please request an OTP first.');
    return;
  }
  if (input !== forgotUhOtp) {
    alert('Invalid code. Please retry.');
    return;
  }
  alert('Verification confirmed. Please confirm facility credentials.');

  const s2 = document.getElementById('fuh-step-2');
  const s3 = document.getElementById('fuh-step-3');
  if (s2) { s2.classList.add('d-none'); s2.style.display = 'none'; }
  if (s3) { s3.classList.remove('d-none'); s3.style.display = 'block'; }
}

function confirmForgotUh(event) {
  if (event) event.preventDefault();
  const pharmaName = document.getElementById('fuhPharmaName')?.value.trim();
  const location = document.getElementById('fuhLocation')?.value.trim();

  if (!pharmaName || !location) {
    alert('Please enter both pharmacy facility name and location.');
    return;
  }

  const existingId = localStorage.getItem('pharmacyId') || 'UH_12345';
  alert('Identity Confirmed! Your UniHealth Pharmacy ID (' + existingId + ') has been dispatched to ' + forgotUhEmail);
  backToLoginFromForgotUh();
}

// Global Keyboard Navigation Shortcuts for Clinical Pharmacy Portal
document.addEventListener('keydown', function(e) {
  if (e.altKey && !e.ctrlKey && !e.metaKey) {
    switch (e.key.toLowerCase()) {
      case 'd':
        window.location.href = 'dashboard.html';
        break;
      case 'i':
        window.location.href = 'inventory.html';
        break;
      case 'r':
        window.location.href = 'reservations.html';
        break;
      case 'a':
        window.location.href = 'alerts.html';
        break;
      case 'n':
        window.location.href = 'analytics.html';
        break;
      case 'l':
        window.location.href = 'index.html';
        break;
    }
  }
});
