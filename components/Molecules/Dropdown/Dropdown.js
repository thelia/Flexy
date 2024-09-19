const dropdownFunction = () => {
  let focusActive = false;
  const currentOption = document.querySelector(".Dropdown-current");
  const options = document.querySelectorAll(".Dropdown-option");
  const liOptions = document.querySelectorAll(".Dropdown-listItem");

  // Supprimer le focus de l'option pour refermer le dropdown
  options.forEach(function (option) {
    option.addEventListener("click", function () {
      if (focusActive) {
        option.blur();
      }
    });
  });

  // Navigation clavier
  liOptions.forEach(function (liOption) {
    liOption.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        liOption.querySelector('label').blur();
        const inputId = liOption.querySelector('label').getAttribute("for");
        const correspondingInput = document.getElementById(inputId);
        correspondingInput.checked = true;
      }
    });
  });

  // Refermer le dropdown si on reclic sur l'option currente (en-tête)
  currentOption.addEventListener("click", function () {
    if (focusActive) {
      currentOption.blur();
    };
    focusActive = !focusActive;
  });
};

export default dropdownFunction;
