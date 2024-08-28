export function slider() {
  const sliders = document.querySelectorAll('.slider');
  let isDown = false;
  let startX;
  let scrollLeft;

  sliders.forEach(slider => {
    slider.addEventListener('mousedown', (e) => start(e.pageX, slider));
    slider.addEventListener('touchstart', (e) => start(e.touches[0].pageX, slider));

    slider.addEventListener('mouseleave', () => end(slider));
    slider.addEventListener('touchend', () => end(slider));

    slider.addEventListener('mouseup', () => end(slider));
    slider.addEventListener('touchcancel', () => end(slider));

    slider.addEventListener('mousemove', (e) => move(e, e.pageX, slider));
    slider.addEventListener('touchmove', (e) => move(e, e.touches[0].pageX, slider));
  });



  function start(pageX,slider)
  {
    isDown = true;
    slider.classList.add('active');
    startX = pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  }
  function end(slider)
  {
    isDown = false;
    slider.classList.remove('active');
  }

  function move(e, pageX, slider)
  {
    if (!isDown) return;
    e.preventDefault();
    const x = pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; // Adjust the scroll speed here
    slider.scrollLeft = scrollLeft - walk;
  }

}
