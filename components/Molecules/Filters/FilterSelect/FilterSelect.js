const filterSelectFunction = () => {
  // Gestion de la couleur des pastilles
  const elements = document.querySelectorAll('.colorRounded');

  if (elements.length) {
    elements.forEach(function (element) {
      const bgColor = element.getAttribute('data-bg-color');
      if (bgColor) {
        element.style.setProperty('--default-bg-color', bgColor);
      }
    });
  }

  let focusActive = false;
  const currentOption = document.querySelector('.FilterSelect-current');
  const options = document.querySelectorAll('.FilterSelect-option');
  const liOptions = document.querySelectorAll('.FilterSelect-listItem');

  // Supprimer le focus de l'option pour refermer le filtre
  options.forEach(function (option) {
    option.addEventListener('click', function () {
      if (focusActive) {
        option.blur();
      }
    });
  });

  // Navigation clavier
  liOptions.forEach(function (liOption) {
    liOption.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        liOption.querySelector('label').blur();
        const inputId = liOption.querySelector('label').getAttribute('for');
        const correspondingInput = document.getElementById(inputId);
        correspondingInput.checked = true;
      }
    });
  });

  // Refermer le filtre si on reclic sur l'option currente (en-tête)
  if (currentOption) {
    currentOption.addEventListener('click', function () {
      if (focusActive) {
        currentOption.blur();
      }
      focusActive = !focusActive;
    });
  }
};

export default filterSelectFunction;
