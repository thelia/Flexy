export function storeInfo() {
  const buttons = document.querySelectorAll('.StoreInfo-hours');

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      const parent = this.closest('.StoreInfo');
      const hoursListing = parent.querySelector('.StoreInfo-hoursListing');
      hoursListing.classList.toggle('hidden');
    });
  });
}
