const fieldInputFunction = () => {
  const input = document.querySelector("input");

  if (input) {
    input.addEventListener('input', function () {
      if (input.value.trim() !== '') {
        input.classList.add('FieldInput-input--filled');
      } else {
        input.classList.remove('FieldInput-input--filled');
      }
    });
  }
}

export default fieldInputFunction;
