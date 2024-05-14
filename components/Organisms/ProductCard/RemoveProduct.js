const progressBar = () => {
  var innerBar = document.querySelector('.ProductCard-progressBarInner');
  innerBar.style.width = '0%';

  var width = 0;
  var interval = setInterval(function () {
    width += 0.2;
    innerBar.style.width = width.toFixed(1) + '%';
    if (width >= 100) {
      clearInterval(interval);
    }
  }, 1);
};

export default progressBar;
