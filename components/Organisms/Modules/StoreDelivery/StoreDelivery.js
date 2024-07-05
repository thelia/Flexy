export function storeDelivery() {
  const buttons = document.querySelectorAll('.StoreDelivery-hours');

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      const parent = this.closest('.StoreDelivery');
      const hoursListing = parent.querySelector('.StoreDelivery-hoursListing');
      const isOpen = hoursListing.classList.toggle('md:hidden');
      textShowHours(isOpen, button);
    });
  });
}

function textShowHours(isOpen = true, button) {
  const text = isOpen ? button.dataset.showHours : button.dataset.hideHours;
  button.querySelector('span').textContent = text;
}
