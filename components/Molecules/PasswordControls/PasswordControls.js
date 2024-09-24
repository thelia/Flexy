export default function PasswordControlsFunction() {
  const passwordInput = document.getElementById('password');
  const controls      = document.querySelector('.PasswordControls');
  if (passwordInput && controls) {
    passwordInput.addEventListener('focus', () => {
      document.querySelector('.PasswordControls').style.display = 'block';
    });

    const indicators = {
      length   : document.getElementById('length'),
      uppercase: document.getElementById('uppercase'),
      lowercase: document.getElementById('lowercase'),
      number   : document.getElementById('number'),
      special  : document.getElementById('special')
    };

    const controls = {
      length   : (value) => value.length >= 8,
      uppercase: (value) => /[A-Z]/.test(value),
      lowercase: (value) => /[a-z]/.test(value),
      number   : (value) => /[0-9]/.test(value),
      special  : (value) => /[\W_]/.test(value)
    };

    const updateIndicator = (condition, isValid) => {
      const indicator = indicators[condition];
      if (isValid) {
        indicator.classList.add('valid');
      } else {
        indicator.classList.remove('valid');
      }
    };

    passwordInput.addEventListener('input', function() {
      const value = passwordInput.value;
      for (const [condition, check] of Object.entries(controls)) {
        updateIndicator(condition, check(value));
      }
    });
  }
}
