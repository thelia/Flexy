
export function addressCard() {
  const inputs = document.querySelectorAll('.AddressCard input[type="radio"]');

  inputs.forEach((input) => {
    input.addEventListener('change', function () {
      const parent = this.closest(".AddressCard");
      parent.classList.toggle("selected", input.checked);
    });
  });
}
