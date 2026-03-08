let generatedOtp = null;

// ---------- HEART & ANIMATION EFFECTS ----------
function createFloatingHeart(x, y) {
  const heart = document.createElement('div');
  heart.innerHTML = '♥';
  heart.className = 'heart-float';
  
  const randomX = (Math.random() - 0.5) * 100;
  const randomY = -(Math.random() * 200 + 100);
  
  heart.style.setProperty('--tx', randomX + 'px');
  heart.style.setProperty('--ty', randomY + 'px');
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  
  document.body.appendChild(heart);
  
  setTimeout(() => heart.remove(), 2500);
}

function toggleLike(event) {
  event.preventDefault();
  const btn = event.currentTarget;
  
  btn.classList.toggle('active');
  
  const rect = btn.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      createFloatingHeart(x, y);
    }, i * 80);
  }
  
  if (btn.classList.contains('active')) {
    btn.textContent = '♥';
  } else {
    btn.textContent = '♡';
  }
}

function createButtonRipple(event) {
  if (event.currentTarget.classList.contains('btn-gradient')) {
    createFloatingHeart(event.clientX, event.clientY);
  }
}

// ---------- THEME ----------
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  localStorage.setItem('uh-theme', theme);
}

function toggleTheme() {
  const isDark = document.body.classList.contains('dark');
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

// ---------- AUTH ----------
function toggleAuth(view) {
  const loginView = document.getElementById('login-view');
  const registerView = document.getElementById('register-view');

  if (view === 'reg') {
    loginView.classList.add('d-none');
    registerView.classList.remove('d-none');
  } else {
    registerView.classList.add('d-none');
    loginView.classList.remove('d-none');
  }
}

function startOtpFlow(event) {
  if (event) {
    createButtonRipple(event);
  }
  const pass = document.getElementById('regPass').value;
  const confirm = document.getElementById('regPassConfirm').value;

  if (!pass) {
    alert('Please set a password before continuing.');
    return;
  }
  if (pass !== confirm) {
    alert('🚨 ADMIN ALERT: Password mismatch. Please ensure both password fields are identical.');
    return;
  }

  generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
  console.log('DEBUG OTP (remove in production):', generatedOtp);

  alert('OTP sent to your registered mobile number (simulation).');

  document.getElementById('reg-step-1').classList.add('d-none');
  document.getElementById('reg-step-2').classList.remove('d-none');
}

function resendOtp() {
  generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
  console.log('DEBUG OTP (resend):', generatedOtp);
  alert('New OTP sent (simulation).');
}

function backToRegDetails() {
  document.getElementById('reg-step-2').classList.add('d-none');
  document.getElementById('reg-step-1').classList.remove('d-none');
}

function generatePharmacyId() {
  const num = Math.floor(10000 + Math.random() * 90000);
  return 'UH_' + num;
}

function handleRegistration(event) {
  if (event) {
    createButtonRipple(event);
  }
  const otpInput = document.getElementById('regOtp').value.trim();

  if (!generatedOtp) {
    alert('Please request an OTP first.');
    return;
  }
  if (otpInput !== generatedOtp) {
    alert('Invalid OTP. Please check and try again.');
    return;
  }

  const autoId = generatePharmacyId();
  document.getElementById('regId').value = autoId;

  alert('UniHealth Registration Successful! Your Pharmacy ID is: ' + autoId);
  toggleAuth('login');
  document.getElementById('loginId').value = autoId;
  localStorage.setItem('pharmacyId', autoId);
}

function handleLogin(event) {
  if (event) {
    createButtonRipple(event);
  }
  const id = document.getElementById('loginId').value.trim();
  const pass = document.getElementById('loginPass').value;

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

// allow Enter key on login
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
  document.getElementById('login-view').classList.add('d-none');
  document.getElementById('register-view').classList.add('d-none');
  document.getElementById('forgot-uh-view').classList.add('d-none');
  document.getElementById('forgot-pass-view').classList.remove('d-none');

  document.getElementById('fp-step-1').classList.remove('d-none');
  document.getElementById('fp-step-2').classList.add('d-none');
  document.getElementById('fp-step-3').classList.add('d-none');
}

function backToLoginFromForgotPass() {
  document.getElementById('forgot-pass-view').classList.add('d-none');
  document.getElementById('login-view').classList.remove('d-none');
}

function startForgotPassOtp(event) {
  if (event) {
    createButtonRipple(event);
  }
  const phone = document.getElementById('fpPhone').value.trim();
  if (!phone) {
    alert('Please enter your registered phone number.');
    return;
  }
  forgotPassPhone = phone;
  forgotPassOtp = String(Math.floor(100000 + Math.random() * 900000));
  console.log('DEBUG ForgotPass OTP:', forgotPassOtp); // remove in production
  alert('OTP sent to your registered phone number (simulation).');

  document.getElementById('fp-step-1').classList.add('d-none');
  document.getElementById('fp-step-2').classList.remove('d-none');
}

function resendForgotPassOtp() {
  if (!forgotPassPhone) {
    alert('Please enter your phone and request OTP first.');
    return;
  }
  forgotPassOtp = String(Math.floor(100000 + Math.random() * 900000));
  console.log('DEBUG ForgotPass OTP resend:', forgotPassOtp);
  alert('New OTP sent to your phone (simulation).');
}

function verifyForgotPassOtp(event) {
  if (event) {
    createButtonRipple(event);
  }
  const input = document.getElementById('fpOtp').value.trim();
  if (!forgotPassOtp) {
    alert('Please request an OTP first.');
    return;
  }
  if (input !== forgotPassOtp) {
    alert('Invalid OTP. Please check and try again.');
    return;
  }
  alert('OTP verified. Please set your new password.');

  document.getElementById('fp-step-2').classList.add('d-none');
  document.getElementById('fp-step-3').classList.remove('d-none');
}

function confirmForgotPass(event) {
  if (event) {
    createButtonRipple(event);
  }
  const pass = document.getElementById('fpNewPass').value;
  const confirm = document.getElementById('fpNewPassConfirm').value;

  if (!pass || !confirm) {
    alert('Please enter and confirm your new password.');
    return;
  }
  if (pass !== confirm) {
    alert('Password mismatch. Please ensure both fields are identical.');
    return;
  }

  alert('Password reset successful! You can now log in with your new password.');
  backToLoginFromForgotPass();
}

// ---------- FORGOT UH ID FLOW ----------
let forgotUhOtp = null;
let forgotUhEmail = null;
let forgotUhPhone = null;

function showForgotUhId() {
  document.getElementById('login-view').classList.add('d-none');
  document.getElementById('register-view').classList.add('d-none');
  document.getElementById('forgot-pass-view').classList.add('d-none');
  document.getElementById('forgot-uh-view').classList.remove('d-none');

  document.getElementById('fuh-step-1').classList.remove('d-none');
  document.getElementById('fuh-step-2').classList.add('d-none');
  document.getElementById('fuh-step-3').classList.add('d-none');
}

function backToLoginFromForgotUh() {
  document.getElementById('forgot-uh-view').classList.add('d-none');
  document.getElementById('login-view').classList.remove('d-none');
}

function startForgotUhOtp(event) {
  if (event) {
    createButtonRipple(event);
  }
  const email = document.getElementById('fuhEmail').value.trim();
  const phone = document.getElementById('fuhPhone').value.trim();

  if (!email || !phone) {
    alert('Please enter both registered email and phone number.');
    return;
  }

  forgotUhEmail = email;
  forgotUhPhone = phone;
  forgotUhOtp = String(Math.floor(100000 + Math.random() * 900000));
  console.log('DEBUG ForgotUH OTP:', forgotUhOtp);
  alert('OTP sent to your registered phone number (simulation).');

  document.getElementById('fuh-step-1').classList.add('d-none');
  document.getElementById('fuh-step-2').classList.remove('d-none');
}

function resendForgotUhOtp() {
  if (!forgotUhPhone) {
    alert('Please enter details and request OTP first.');
    return;
  }
  forgotUhOtp = String(Math.floor(100000 + Math.random() * 900000));
  console.log('DEBUG ForgotUH OTP resend:', forgotUhOtp);
  alert('New OTP sent to your phone (simulation).');
}

function verifyForgotUhOtp(event) {
  if (event) {
    createButtonRipple(event);
  }
  const input = document.getElementById('fuhOtp').value.trim();
  if (!forgotUhOtp) {
    alert('Please request an OTP first.');
    return;
  }
  if (input !== forgotUhOtp) {
    alert('Invalid OTP. Please check and try again.');
    return;
  }
  alert('OTP verified. A secure link has been sent to your email (simulation).');

  document.getElementById('fuh-step-2').classList.add('d-none');
  document.getElementById('fuh-step-3').classList.remove('d-none');
}

function confirmForgotUh(event) {
  if (event) {
    createButtonRipple(event);
  }
  const pharmaName = document.getElementById('fuhPharmaName').value.trim();
  const location = document.getElementById('fuhLocation').value.trim();

  if (!pharmaName || !location) {
    alert('Please enter your pharmacy credentials.');
    return;
  }

  const existingId = localStorage.getItem('pharmacyId') || 'UHXXXXX';

  alert(
    'Verification successful! Your existing UniHealth Pharmacy ID (' +
      existingId +
      ') has been sent to ' +
      forgotUhEmail +
      ' (simulation).'
  );

  backToLoginFromForgotUh();
}
