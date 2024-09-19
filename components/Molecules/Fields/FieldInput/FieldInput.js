export function FieldInputFunction() {
  const input = document.querySelector("input");
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');

  if (input) {
    input.addEventListener('input', function () {
      if (input.value.trim() !== '') {
        input.classList.add('FieldInput-input--filled');
      } else {
        input.classList.remove('FieldInput-input--filled');
      }
    });

    togglePasswordButtons.forEach(button => {
      button.addEventListener('click', togglePasswordVisibility);
    });
  }
};

function togglePasswordVisibility(event) {
  const inputId = (event.currentTarget).getAttribute('data-id');
  const inputField = document.getElementById(inputId);
  const showIcon = document.getElementById('showIcon-' + inputId);
  const hideIcon = document.getElementById('hideIcon-' + inputId);

  if (inputField.type === 'password') {
    inputField.type = 'text';
    showIcon.classList.add('hidden');
    hideIcon.classList.remove('hidden');
  } else {
    inputField.type = 'password';
    showIcon.classList.remove('hidden');
    hideIcon.classList.add('hidden');
  }
}
