const breadcrumbFunction = () => {
  const btnCompressed = document.querySelector('.Breadcrumb-compressed');
  const liCompressed = document.getElementById('Breadcrumb-compressed');
  const items = document.querySelectorAll(".Breadcrumb-item");

  if (btnCompressed) {
    btnCompressed.addEventListener('click', function () {
      items.forEach(function (item) {
        item.classList.remove("hide")
      });
      liCompressed.classList.add("hide")
    })
  };
}

export default breadcrumbFunction;
