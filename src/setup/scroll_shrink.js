window.addEventListener("scroll", function () {
  this.document.body.classList.toggle("is-scrolled", window.scrollY > 0);
});
