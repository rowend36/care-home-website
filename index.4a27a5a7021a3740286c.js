(self["webpackChunkcare_home_website"] = self["webpackChunkcare_home_website"] || []).push([[826],{

/***/ 579:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _setup_normalize_carousel_heights__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(136);
/* harmony import */ var _setup_normalize_carousel_heights__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_setup_normalize_carousel_heights__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _setup_scroll_shrink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(304);
/* harmony import */ var _setup_scroll_shrink__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_setup_scroll_shrink__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _setup_duplicate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(274);
/* harmony import */ var _setup_duplicate__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_setup_duplicate__WEBPACK_IMPORTED_MODULE_2__);





AOS.init({
  duration: 1300
});

/***/ }),

/***/ 274:
/***/ (() => {

var x = document.querySelectorAll(".duplicate");
x.forEach(function (el) {
  if (el.complete && el.naturalHeight !== 0) {
    duplicate(el);
  }
  el.addEventListener("load", function () {
    duplicate(el);
  });
});
function duplicate(el) {
  var node = el.cloneNode();
  node.setAttribute("aria-hidden", true);
  node.classList.add("duplicated");
  el.parentElement.classList.add("position-relative");
  el.parentElement.appendChild(node);
}

/***/ }),

/***/ 136:
/***/ (() => {

// Set all carousel items to the same height
/**
 *
 * @param {HTMLElement} root
 */
function carouselNormalization(root) {
  function reset() {
    var heights = [],
      //create empty array to store height values
      tallest = 0; //create variable to make note of the tallest slide
    var toReset = [];
    var elements = root.querySelectorAll(".landing-content");
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
    tallest = Math.max.apply(Math, heights); //cache largest value
    elements.forEach(function (e) {
      e.style.minHeight = tallest + "px";
    });
    toReset.forEach(function (el) {
      el.parentElement.classList.remove("active");
    });
  }
  reset();
  window.addEventListener("resize", reset);
  window.addEventListener("orientationchange", reset);
}
window.addEventListener("load", function once() {
  document.querySelectorAll(".carousel .carousel-inner").forEach(carouselNormalization);
  window.removeEventListener("load", once);
});

/***/ }),

/***/ 304:
/***/ (() => {

window.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    this.document.body.classList.toggle("is-scrolled", window.scrollY > 0);
  });
  this.document.body.classList.toggle("is-scrolled", window.scrollY > 0);
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(579));
/******/ }
]);
//# sourceMappingURL=index.4a27a5a7021a3740286c.js.map