const inputs = document.querySelectorAll('.verification-input input');
const form = document.getElementById('email-verification-form');
const errorMessage = document.getElementById('error-message');

// Initialize event listeners for all input fields
function initializeEventListeners() {
  inputs.forEach((input, index) => {
    input.addEventListener('paste', (e) => handlePaste(e, index));
    input.addEventListener('input', (e) => handleInput(e, index));
    input.addEventListener('keydown', (e) => handleBackspace(e, index));
  });
}

// Handle the paste event
function handlePaste(e) {
  const paste = (e.clipboardData || window.clipboardData).getData('text');
  pasteCode(paste);
  if (paste.length > inputs.length) {
    inputs[inputs.length - 1].focus();
  } else {
    inputs[paste.length - 1].focus();
  }
  e.preventDefault();
  validateCode();
}

// Fill input fields with the pasted code
function pasteCode(paste) {
  inputs.forEach((input, index) => {
    input.value = paste[index] || '';
  });
}

// Handle text input event
function handleInput(e, index) {
  const input = e.target;
  if (
    e.inputType === 'insertText' &&
    input.value.length === 1 &&
    index < inputs.length - 1
  ) {
    inputs[index + 1].focus();
  }
  validateCode();
}

// Handle the Backspace key event
function handleBackspace(e, index) {
  const input = e.target;
  if (e.key === 'Backspace') {
    if (input.value === '' && index > 0) {
      inputs[index - 1].focus();
    } else {
      input.value = '';
    }
    validateCode();
  }
}

// Validate the entered code (solution provisoire)
function validateCode() {
  let code = '';
  inputs.forEach((input) => {
    code += input.value;
  });

  if (code.length === inputs.length) {
    if (code === '000000') {
      errorMessage.classList.add('hidden');
      form.submit();
      window.location.href = '/register-confirmation';
    } else {
      errorMessage.classList.remove('hidden');
    }
  } else {
    errorMessage.classList.add('hidden');
  }
}

initializeEventListeners();
