const x = document.querySelectorAll(".duplicate");
x.forEach((el) => {
  if (el.complete && el.naturalHeight !== 0) {
    duplicate(el);
  }
  el.addEventListener("load", () => {
    duplicate(el);
  });
});

function duplicate(el) {
  const node = el.cloneNode();
  node.setAttribute("aria-hidden", true);
  node.classList.add("duplicated");
  el.parentElement.classList.add("position-relative");
  el.parentElement.appendChild(node);
}
