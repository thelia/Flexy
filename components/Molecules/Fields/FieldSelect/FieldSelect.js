const fieldSelectFunction = () => {
  const select = document.querySelector("select");

  if (select) {
    select.addEventListener('change', function () {
      if (select.value.trim() !== '') {
        select.classList.add('FieldSelect-select--filled');
      } else {
        select.classList.remove('FieldSelect-select--filled');
      }
    });
  }
}

export default fieldSelectFunction;
