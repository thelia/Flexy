const filterPillFunction = () => {
  const close = document.querySelector('.FilterPill--selected');

  if (close) {
    close.addEventListener('click', function () {
      this.parentNode.style.display = 'none';
      onClickClose();
    });
  };
}

export default filterPillFunction;
