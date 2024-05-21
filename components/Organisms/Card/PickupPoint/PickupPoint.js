
export function pickupPoint() {
  const buttons = document.querySelectorAll('.PickupPoint-hours');

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      const parent = this.closest(".PickupPoint");
      const hoursListing = parent.querySelector('.PickupPoint-hoursListing');
      hoursListing.classList.toggle("md:hidden");
    });
  });
}
