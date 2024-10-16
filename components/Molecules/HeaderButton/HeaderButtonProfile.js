const headerButtonProfileFunction = () => {
  const button = document.querySelector('.profile');
  const dropdown = document.querySelector('.DropdownProfile');

  button?.addEventListener('click', () => dropdown?.classList.toggle('active'));
};

export default headerButtonProfileFunction;
