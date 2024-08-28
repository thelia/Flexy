export default function MobileDrawer() {
  const toggleDrawers = document.querySelectorAll('[data-drawer-toggle]');
  const closeDrawers = document.querySelectorAll('[data-drawer-close]');
  const drawers = document.querySelectorAll('.MobileDrawer');
  const drawerOptions = document.querySelectorAll('.FilterSelect-option');

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
      console.log({drawer});
      const parent = drawer.closest('.MobileDrawer');
      console.log({parent});

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
  toggleOverlay(isOpen);
}

function closeDrawer(currentDrawer) {
  currentDrawer.classList.remove('MobileDrawer-show');
  toggleOverlay(false);
}

function toggleOverlay(open) {
  if (open) {
    const div = document.createElement('div');
    div.classList.add('MobileDrawer-overlay');
    document.body.prepend(div);
    return;
  }

  console.log('close overlays');
  document.querySelector('.MobileDrawer-overlay').remove();
}
