// Set all carousel items to the same height
/**
 *
 * @param {HTMLElement} root
 */
function carouselNormalization(root) {
  function reset() {
    let heights = [], //create empty array to store height values
      tallest = 0; //create variable to make note of the tallest slide
    const toReset = [];
    const elements = root.querySelectorAll(".landing-content");

    elements.forEach(function (el) {
      if (!el.parentElement.classList.contains("active")) {
        el.parentElement.classList.add("active");
        toReset.push(el);
      }
      el.style.minHeight = 0;
    });
    elements.forEach(function (el) {
      // const style = getComputedStyle(el);
      heights.push(el.clientHeight);
    });
    tallest = Math.max(...heights); //cache largest value
    elements.forEach(function (e) {
      e.style.minHeight = tallest + "px";
    });
    toReset.forEach((el) => {
      el.parentElement.classList.remove("active");
    });
  }
  reset();
  window.addEventListener("resize", reset);
  window.addEventListener("orientationchange", reset);
}

window.addEventListener("load", function once() {
  document
    .querySelectorAll(".carousel .carousel-inner")
    .forEach(carouselNormalization);
  window.removeEventListener("load", once);
});
