// --- اعتبارسنجی فرم ورود کاربر ---
const userLoginForm = document.querySelector('body.user-login-page form.auth-form'); // فرض می‌کنیم بادی صفحه ورود کلاس user-login-page دارد
if (userLoginForm) {
  userLoginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // جلوگیری از ارسال خودکار فرم

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    let errors = [];

    if (!usernameInput.value.trim()) {
      errors.push('نام کاربری الزامی است.');
    }
    if (!passwordInput.value.trim()) {
      errors.push('رمز عبور الزامی است.');
    }

    if (errors.length > 0) {
      alert('خطا:\n' + errors.join('\n'));
    } else {
      // اینجا منطق ورود کاربر رو اضافه کن (مثلاً ارسال به سرور)
      alert('ورود موفقیت‌آمیز! (در نسخه واقعی به پنل کاربری هدایت می‌شوید)');
      // window.location.href = 'user-dashboard.html'; // مثال هدایت به داشبورد
    }
  });
}

// --- اعتبارسنجی فرم ثبت نام کاربر ---
const userSignupForm = document.querySelector('body.user-signup-page form.auth-form'); // فرض می‌کنیم بادی صفحه ثبت نام کلاس user-signup-page دارد
if (userSignupForm) {
  userSignupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fullnameInput = document.getElementById('fullname');
    const usernameSignupInput = document.getElementById('username-signup');
    const emailSignupInput = document.getElementById('email-signup');
    const passwordSignupInput = document.getElementById('password-signup');
    const confirmPasswordInput = document.getElementById('confirm-password');

    let errors = [];

    // اعتبارسنجی نام و نام خانوادگی
    if (!fullnameInput.value.trim()) {
      errors.push('نام و نام خانوادگی الزامی است.');
    }

    // اعتبارسنجی نام کاربری
    if (!usernameSignupInput.value.trim()) {
      errors.push('نام کاربری الزامی است.');
    } else if (usernameSignupInput.value.length < 4) {
      errors.push('نام کاربری باید حداقل ۴ کاراکتر باشد.');
    }

    // اعتبارسنجی ایمیل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailSignupInput.value.trim()) {
      errors.push('ایمیل الزامی است.');
    } else if (!emailRegex.test(emailSignupInput.value)) {
      errors.push('فرمت ایمیل صحیح نیست.');
    }

    // اعتبارسنجی رمز عبور
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=-]).{8,}$/; // حداقل ۸ کاراکتر، شامل حروف بزرگ، کوچک، عدد و نماد
    if (!passwordSignupInput.value.trim()) {
      errors.push('رمز عبور الزامی است.');
    } else if (!passwordRegex.test(passwordSignupInput.value)) {
      errors.push('رمز عبور باید حداقل ۸ کاراکتر، شامل حروف بزرگ و کوچک، عدد و نماد باشد.');
    }

    // اعتبارسنجی تأیید رمز عبور
    if (!confirmPasswordInput.value.trim()) {
      errors.push('تأیید رمز عبور الزامی است.');
    } else if (confirmPasswordInput.value !== passwordSignupInput.value) {
      errors.push('رمز عبور و تأیید رمز عبور مطابقت ندارند.');
    }

    if (errors.length > 0) {
      alert('خطا:\n' + errors.join('\n'));
    } else {
      // اینجا منطق ثبت نام کاربر رو اضافه کن (مثلاً ارسال به سرور)
      alert('ثبت نام موفقیت‌آمیز! لطفاً وارد حساب کاربری خود شوید.');
      window.location.href = 'user-login.html'; // هدایت به صفحه ورود
    }
  });
}

// --- اعتبارسنجی فرم ورود مدیر ---
const adminLoginForm = document.querySelector('body.admin-login-page form.auth-form'); // فرض می‌کنیم بادی صفحه ورود مدیر کلاس admin-login-page دارد
if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const adminUsernameInput = document.getElementById('admin-username');
    const adminPasswordInput = document.getElementById('admin-password');

    let errors = [];

    if (!adminUsernameInput.value.trim()) {
      errors.push('نام کاربری مدیر الزامی است.');
    }
    if (!adminPasswordInput.value.trim()) {
      errors.push('رمز عبور مدیر الزامی است.');
    }

    if (errors.length > 0) {
      alert('خطا:\n' + errors.join('\n'));
    } else {
      // اینجا منطق ورود مدیر رو اضافه کن (مثلاً ارسال به سرور)
      alert('ورود مدیر موفقیت‌آمیز! (در نسخه واقعی به پنل مدیریت هدایت می‌شوید)');
      // window.location.href = 'admin-dashboard.html'; // مثال هدایت به داشبورد ادمین
    }
  });
}
