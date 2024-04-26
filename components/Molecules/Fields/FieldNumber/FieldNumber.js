const fieldNumberFunction = () => {
  const input = document.querySelector("input");

  if (input) {
    input.addEventListener('input', function () {
      if (input.value.trim() !== '') {
        input.classList.add('FieldNumber-input--filled');
      } else {
        input.classList.remove('FieldNumber-input--filled');
      }
    });
  }
}

export default fieldNumberFunction;
