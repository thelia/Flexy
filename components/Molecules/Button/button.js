export function quantityButton() {
  const minusButtons = document.querySelectorAll(
    '.Button-quantity button[data-qty="minus"]'
  );
  const plusButtons = document.querySelectorAll(
    '.Button-quantity button[data-qty="plus"]'
  );
  minusButtons.forEach((minus) => {
    minus.addEventListener('click', () => plusMinusInput(minus, true));
  });
  plusButtons.forEach((plus) => {
    plus.addEventListener('click', () => plusMinusInput(plus));
  });
}


function plusMinusInput(el, minus = false) {
  const input = el.parentElement.querySelector('input');
  const value = parseInt(input.value);
  if (minus) {
    input.value = (value - 1).toString();
    return;
  }
  input.value = (value + 1).toString();
}
