export default function promotionalBanner() {
  const closeButtons = document.querySelectorAll(
    '[data-promotional-banner-close]'
  );

  closeButtons.forEach(function (button) {
    button.addEventListener('click', () => {
      const parent = button.closest('.PromotionalBanner');
      if (!parent) return;
      parent.classList.add('hidden');
    });
  });
}
