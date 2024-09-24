const headerButtonProfileFunction = () => {
  const button = document.querySelector('.profile');
  const dropdown = document.querySelector('.DropdownProfile');

  button.onclick = function () {
    dropdown.classList.toggle('active');
  };
};

export default headerButtonProfileFunction;
