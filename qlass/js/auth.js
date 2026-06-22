/* ============================================
   QLASS AUTH MODULE
   Login, OTP, Forgot Password, Reset, Register
   ============================================ */

(function() {
  'use strict';

  // -- Screen Management --
  const screens = document.querySelectorAll('.auth-screen');
  let currentScreen = 'login';
  let selectedRole = 'admin';
  let otpMethod = 'email'; // 'email' or 'sms'
  let failedAttempts = 0;

  function showScreen(name) {
    screens.forEach(s => {
      s.classList.remove('active');
      s.style.display = 'none';
    });
    const target = document.getElementById('screen-' + name);
    if (target) {
      target.style.display = 'block';
      setTimeout(() => target.classList.add('active'), 10);
    }
    currentScreen = name;
  }

  // Initialize: show login
  screens.forEach(s => s.style.display = 'none');
  const loginScreen = document.getElementById('screen-login');
  if (loginScreen) { loginScreen.style.display = 'block'; loginScreen.classList.add('active'); }

  // Add CSS for auth-screen transitions
  const style = document.createElement('style');
  style.textContent = `
    .auth-screen { animation: fadeInUp 0.35s ease both; }
    .auth-screen:not(.active) { display: none; }
    .auth-alert-area { margin-bottom: 16px; }
  `;
  document.head.appendChild(style);

  // -- Role Selector --
  const roleSelector = document.getElementById('roleSelector');
  if (roleSelector) {
    roleSelector.addEventListener('click', (e) => {
      const btn = e.target.closest('.role-option');
      if (!btn) return;
      roleSelector.querySelectorAll('.role-option').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedRole = btn.dataset.role;
    });
  }

  // -- Navigation between screens --
  function bindNav(id, screen) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', (e) => { e.preventDefault(); showScreen(screen); });
  }
  bindNav('goForgotPassword', 'forgot');
  bindNav('goCreateAccount', 'register');
  bindNav('otpBack', 'login');
  bindNav('forgotBack', 'login');
  bindNav('forgotToLogin', 'login');
  bindNav('registerBack', 'login');
  bindNav('registerToLogin', 'login');
  bindNav('sessionToLogin', 'login');
  bindNav('lockedToLogin', 'login');

  // OTP methods
  document.getElementById('goEmailOtp')?.addEventListener('click', () => {
    otpMethod = 'email';
    document.getElementById('otpTarget').textContent = 'admin@qlass.edu';
    showScreen('otp');
    focusFirstOtp();
  });
  document.getElementById('goSmsOtp')?.addEventListener('click', () => {
    otpMethod = 'sms';
    document.getElementById('otpTarget').textContent = '+91 98765 ****10';
    showScreen('otp');
    focusFirstOtp();
  });

  // -- Show/Hide Password --
  document.getElementById('togglePassword')?.addEventListener('click', function() {
    const pwInput = document.getElementById('loginPassword');
    const eyeOpen = this.querySelector('.eye-open');
    const eyeClosed = this.querySelector('.eye-closed');
    if (pwInput.type === 'password') {
      pwInput.type = 'text';
      eyeOpen.style.display = 'none';
      eyeClosed.style.display = 'block';
    } else {
      pwInput.type = 'password';
      eyeOpen.style.display = 'block';
      eyeClosed.style.display = 'none';
    }
  });

  // Generic toggle for other password fields
  document.querySelectorAll('.toggle-pw').forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.parentElement.querySelector('input');
      input.type = input.type === 'password' ? 'text' : 'password';
    });
  });

  // -- Form Validation Helpers --
  function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.add('input-error');
    if (error) {
      error.querySelector('span').textContent = message;
      error.style.display = 'flex';
    }
  }

  function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.remove('input-error');
    if (error) error.style.display = 'none';
  }

  function showAlert(containerId, type, message) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const icons = {
      error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
    };
    container.innerHTML = `<div class="auth-alert auth-alert-${type}">${icons[type]}<span>${message}</span></div>`;
    container.style.display = 'block';
  }

  function hideAlert(containerId) {
    const container = document.getElementById(containerId);
    if (container) { container.style.display = 'none'; container.innerHTML = ''; }
  }

  function setLoading(btnId, loading) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    if (loading) {
      btn.classList.add('btn-loading');
      btn.disabled = true;
    } else {
      btn.classList.remove('btn-loading');
      btn.disabled = false;
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^[\+]?[0-9\s\-]{8,15}$/.test(phone.replace(/\s/g, ''));
  }

  // -- LOGIN FORM --
  document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    hideAlert('login-alert');
    let valid = true;

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Validate email/phone
    clearError('loginEmail', 'loginEmailError');
    if (!email) {
      showError('loginEmail', 'loginEmailError', 'Email or mobile number is required');
      valid = false;
    } else if (!isValidEmail(email) && !isValidPhone(email)) {
      showError('loginEmail', 'loginEmailError', 'Enter a valid email or mobile number');
      valid = false;
    }

    // Validate password
    clearError('loginPassword', 'loginPasswordError');
    if (!password) {
      showError('loginPassword', 'loginPasswordError', 'Password is required');
      valid = false;
    } else if (password.length < 6) {
      showError('loginPassword', 'loginPasswordError', 'Password must be at least 6 characters');
      valid = false;
    }

    if (!valid) return;

    // Simulate authentication
    setLoading('loginBtn', true);

    setTimeout(() => {
      setLoading('loginBtn', false);

      // Dummy auth: accept specific credentials
      if ((email === 'admin@qlass.edu' || email === 'teacher@qlass.edu' || email === 'student@qlass.edu') && password === 'password') {
        showAlert('login-alert', 'success', 'Login successful! Redirecting...');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1000);
      } else {
        failedAttempts++;
        if (failedAttempts >= 5) {
          showScreen('locked');
          return;
        }
        showAlert('login-alert', 'error', 'Invalid credentials. Please check your email and password.');
        document.getElementById('loginForm')?.classList.add('animate-shake');
        setTimeout(() => document.getElementById('loginForm')?.classList.remove('animate-shake'), 500);
      }
    }, 1500);
  });

  // Clear errors on input
  document.getElementById('loginEmail')?.addEventListener('input', () => clearError('loginEmail', 'loginEmailError'));
  document.getElementById('loginPassword')?.addEventListener('input', () => clearError('loginPassword', 'loginPasswordError'));

  // -- OTP INPUT --
  function focusFirstOtp() {
    setTimeout(() => {
      const first = document.querySelector('#otpInputs .otp-input');
      if (first) first.focus();
    }, 100);
  }

  const otpInputs = document.querySelectorAll('#otpInputs .otp-input');
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
      if (this.value && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
      if (this.value) this.classList.add('filled');
      else this.classList.remove('filled');
    });

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace' && !this.value && index > 0) {
        otpInputs[index - 1].focus();
        otpInputs[index - 1].value = '';
        otpInputs[index - 1].classList.remove('filled');
      }
    });

    input.addEventListener('paste', function(e) {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
      otpInputs.forEach((inp, i) => {
        if (paste[i]) {
          inp.value = paste[i];
          inp.classList.add('filled');
        }
      });
      const next = Math.min(paste.length, otpInputs.length) - 1;
      if (next >= 0) otpInputs[next].focus();
    });
  });

  // OTP submit
  document.getElementById('otpForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    hideAlert('otp-alert');
    const code = Array.from(otpInputs).map(i => i.value).join('');

    if (code.length < 6) {
      showAlert('otp-alert', 'error', 'Please enter the complete 6-digit code.');
      return;
    }

    setLoading('verifyOtpBtn', true);
    setTimeout(() => {
      setLoading('verifyOtpBtn', false);
      if (code === '123456') {
        showAlert('otp-alert', 'success', 'Verified successfully! Redirecting...');
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
      } else {
        showAlert('otp-alert', 'error', 'Invalid OTP. Please try again.');
      }
    }, 1500);
  });

  // Resend OTP timer
  let otpCountdown = null;
  document.getElementById('resendOtp')?.addEventListener('click', function(e) {
    e.preventDefault();
    if (this.classList.contains('disabled')) return;
    
    this.classList.add('disabled');
    this.style.pointerEvents = 'none';
    this.style.opacity = '0.5';
    
    let seconds = 30;
    const timer = document.getElementById('otpTimer');
    timer.textContent = ` (${seconds}s)`;
    
    otpCountdown = setInterval(() => {
      seconds--;
      timer.textContent = ` (${seconds}s)`;
      if (seconds <= 0) {
        clearInterval(otpCountdown);
        timer.textContent = '';
        document.getElementById('resendOtp').classList.remove('disabled');
        document.getElementById('resendOtp').style.pointerEvents = '';
        document.getElementById('resendOtp').style.opacity = '';
      }
    }, 1000);
    
    showAlert('otp-alert', 'success', 'A new OTP has been sent!');
    setTimeout(() => hideAlert('otp-alert'), 3000);
  });

  // -- FORGOT PASSWORD --
  document.getElementById('forgotForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    hideAlert('forgot-alert');
    const email = document.getElementById('forgotEmail').value.trim();

    clearError('forgotEmail', 'forgotEmailError');
    if (!email) {
      showError('forgotEmail', 'forgotEmailError', 'Email is required');
      return;
    }
    if (!isValidEmail(email)) {
      showError('forgotEmail', 'forgotEmailError', 'Enter a valid email address');
      return;
    }

    setLoading('forgotBtn', true);
    setTimeout(() => {
      setLoading('forgotBtn', false);
      showAlert('forgot-alert', 'success', 'Reset link sent! Check your inbox for further instructions.');
    }, 1500);
  });

  document.getElementById('forgotEmail')?.addEventListener('input', () => clearError('forgotEmail', 'forgotEmailError'));

  // -- RESET PASSWORD --
  const newPw = document.getElementById('newPassword');
  if (newPw) {
    newPw.addEventListener('input', function() {
      const val = this.value;
      let score = 0;
      if (val.length >= 8) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;

      const bars = ['str1','str2','str3','str4'];
      const levels = ['weak','fair','good','strong'];
      const labels = ['Weak','Fair','Good','Strong'];

      bars.forEach((id, i) => {
        const bar = document.getElementById(id);
        bar.className = 'strength-bar';
        if (i < score) bar.classList.add(levels[score - 1]);
      });

      const text = document.getElementById('pwStrengthText');
      if (val.length === 0) {
        text.textContent = '';
        text.className = 'strength-text';
      } else {
        text.textContent = labels[score - 1] || 'Too short';
        text.className = 'strength-text ' + (levels[score - 1] || 'weak');
      }
    });
  }

  document.getElementById('resetForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    hideAlert('reset-alert');
    const pw = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmPassword').value;

    clearError('confirmPassword', 'confirmPasswordError');

    if (pw.length < 8) {
      showAlert('reset-alert', 'error', 'Password must be at least 8 characters.');
      return;
    }
    if (pw !== confirm) {
      showError('confirmPassword', 'confirmPasswordError', 'Passwords do not match');
      return;
    }

    setLoading('resetBtn', true);
    setTimeout(() => {
      setLoading('resetBtn', false);
      showAlert('reset-alert', 'success', 'Password reset successfully! You can now sign in.');
      setTimeout(() => showScreen('login'), 2000);
    }, 1500);
  });

  // -- REGISTER FORM --
  document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    hideAlert('register-alert');

    const firstName = document.getElementById('regFirstName').value.trim();
    const lastName = document.getElementById('regLastName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const mobile = document.getElementById('regMobile').value.trim();
    const password = document.getElementById('regPassword').value;
    const agreed = document.getElementById('agreeTerms').checked;

    if (!firstName || !lastName) {
      showAlert('register-alert', 'error', 'Please enter your full name.');
      return;
    }
    if (!isValidEmail(email)) {
      showAlert('register-alert', 'error', 'Please enter a valid email address.');
      return;
    }
    if (!isValidPhone(mobile)) {
      showAlert('register-alert', 'error', 'Please enter a valid mobile number.');
      return;
    }
    if (password.length < 8) {
      showAlert('register-alert', 'error', 'Password must be at least 8 characters.');
      return;
    }
    if (!agreed) {
      showAlert('register-alert', 'warning', 'You must agree to the Terms of Service.');
      return;
    }

    setLoading('registerBtn', true);
    setTimeout(() => {
      setLoading('registerBtn', false);
      showAlert('register-alert', 'success', 'Account created! Please check your email for verification.');
      setTimeout(() => {
        showScreen('otp');
        document.getElementById('otpTarget').textContent = email;
        focusFirstOtp();
      }, 1500);
    }, 2000);
  });

  // -- Keyboard shortcuts --
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentScreen !== 'login') {
      showScreen('login');
    }
  });

})();
