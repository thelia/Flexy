export default function MobileDrawer() {
  const toggleDrawers = document.querySelectorAll('[data-drawer-toggle]');
  const closeDrawers = document.querySelectorAll('[data-drawer-close]');

  toggleDrawers.forEach(function (drawer) {
    drawer.addEventListener('click', () => {
      if (!drawer.dataset?.drawerToggle) return;
      console.log({ data: drawer.dataset?.drawerToggle });
      const currentDrawer = document.querySelector(drawer.dataset.drawerToggle);
      console.log({ currentDrawer });

      if (!currentDrawer) return;
      currentDrawer.classList.toggle('MobileDrawer-show');
    });
  });
  closeDrawers.forEach(function (drawer) {
    drawer.addEventListener('click', () => {
      const parent = drawer.closest('.MobileDrawer');
      if (!parent) return;
      parent.classList.remove('MobileDrawer-show');
    });
  });
}
