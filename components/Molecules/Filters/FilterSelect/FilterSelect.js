const filterSelectFunction = () => {
  console.log('tets');
  const elements = document.querySelectorAll(".colorRounded");
  elements.forEach(function (element) {
    const bgColor = element.getAttribute("data-bg-color");
    if (bgColor) {
      element.style.setProperty("--default-bg-color", bgColor);
    }
  });
}

export default filterSelectFunction;
