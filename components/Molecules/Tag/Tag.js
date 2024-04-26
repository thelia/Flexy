const tagFunction = () => {
  const close = document.querySelector('.Tag--close');

  if (close) {
    close.addEventListener('click', function () {
      this.parentNode.style.display = 'none';
    });
  };
}

export default tagFunction;
