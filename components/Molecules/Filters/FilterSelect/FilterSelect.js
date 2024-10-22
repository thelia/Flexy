const renderfilterSelect = (wrapper) => {
  let focusActive = false;
  const options = wrapper.querySelectorAll('[data-select-option]');
  const label = wrapper.querySelector('[data-select-label]');
  const liOptions = document.querySelectorAll('.FilterSelect-listItem');

  // Supprimer le focus de l'option pour refermer le filtre
  options.forEach(function (option) {
    option.addEventListener('click', function () {
      label.dataset.selectLabel = option.dataset.selectOption;
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
};

export default function filterSelect() {
  // Gestion de la couleur des pastilles
  const bullets = document.querySelectorAll('.colorRounded');

  if (bullets.length) {
    bullets.forEach(function (element) {
      const bgColor = element.getAttribute('data-bg-color');
      if (bgColor) {
        element.style.setProperty('--default-bg-color', bgColor);
      }
    });
  }

  const selects = document.querySelectorAll(['[data-select]']);
  selects.forEach((select) => renderfilterSelect(select));
}
