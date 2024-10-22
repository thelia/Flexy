export default function MobileDrawer() {
  const toggleDrawers = document.querySelectorAll('[data-drawer-toggle]');
  const closeDrawers = document.querySelectorAll('[data-drawer-close]');
  const drawers = document.querySelectorAll('.MobileDrawer');
  const drawerOptions = document.querySelectorAll('[data-select-option]');

  toggleDrawers.forEach(function (drawer) {
    drawer.addEventListener('click', () => {
      if (!drawer.dataset?.drawerToggle) return;
      const currentDrawer = document.querySelector(drawer.dataset.drawerToggle);

      if (!currentDrawer) return;
      openDrawer(currentDrawer);
    });
  });
  closeDrawers.forEach(function (drawer) {
    drawer.addEventListener('click', () => {
      const parent = drawer.closest('.MobileDrawer');

      if (!parent) return;
      closeDrawer(parent);
    });
  });

  drawers.forEach(function (drawer) {
    let startY;

    drawer.addEventListener('touchstart', function (event) {
      startY = event.touches[0].clientY;
    });

    drawer.addEventListener('touchmove', function (event) {
      let moveY = event.touches[0].clientY;
      let diffY = moveY - startY;

      if (diffY > 50) {
        // close drawer after 50px
        closeDrawer(drawer);
      }
    });
  });
  drawerOptions.forEach(function (option) {
    option.addEventListener('click', function () {
      const parentDrawer = option.closest('.MobileDrawer');
      if (parentDrawer) {
        closeDrawer(parentDrawer);
      }
    });
  });
}

function openDrawer(currentDrawer) {
  const isOpen = currentDrawer.classList.toggle('MobileDrawer-show');
  document.body.classList.toggle('locked');
  toggleOverlay(isOpen, currentDrawer);
}

function closeDrawer(currentDrawer) {
  currentDrawer.classList.remove('MobileDrawer-show');
  document.body.classList.remove('locked');
  toggleOverlay(false);
}

function toggleOverlay(open, currentDrawer) {
  if (open) {
    const div = document.createElement('div');
    div.classList.add('MobileDrawer-overlay');
    currentDrawer.parentNode.insertBefore(div, currentDrawer.nextSibling);
    return;
  }
  document.querySelector('.MobileDrawer-overlay')?.remove();
}
