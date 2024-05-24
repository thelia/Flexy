export function storeDelivery() {
  const buttons = document.querySelectorAll('.StoreDelivery-hours');

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      const parent = this.closest('.StoreDelivery');
      const hoursListing = parent.querySelector('.StoreDelivery-hoursListing');
      hoursListing.classList.toggle('md:hidden');
    });
  });
}
