const x = document.querySelectorAll(".duplicate");
x.forEach((el) => {
  el.addEventListener("load", () => {
    const node = el.cloneNode();
    node.setAttribute("aria-hidden", true);
    node.classList.add("duplicated");
    el.parentElement.classList.add("position-relative");
    el.parentElement.appendChild(node);
  });
});
