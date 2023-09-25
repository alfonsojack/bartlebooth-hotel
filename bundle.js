/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: 'Libre Caslon Text', serif;\n}\n\nbody {\n  margin:0;\n  padding:0;\n  font-family: sans-serif;\n  background: #A3D9FF;\n  animation: fadeInAnimation ease 1s;\n  animation-iteration-count: 1;\n  animation-fill-mode: forwards;\n}\n\n.main-page, #available-bookings, .filter-style, .dashboard, .book-now, .calendar-form, #bookings-display {\n  animation: fadeInAnimation ease 1s;\n} \n \n@keyframes fadeInAnimation {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n     }\n}\n\n.hidden {\n  display: none;\n}\n\n.nav-style {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-top: 50px;\n}\n\n.filter-style {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #042A2B;\n  padding: 20px;\n  box-shadow: 0 15px 25px rgba(0,0,0,.6);\n}\n\nnav {\n  position: relative;\n  padding-bottom: 12px;\n  margin: auto\n}\n\n\n\n\n.active a span {\n  bottom: 0;\n  right: 0%;\n  width: 20%;\n  height: 2px;\n  background: linear-gradient(270deg, transparent, #96E6B3);\n  animation: btn-anim5 4s linear infinite;\n  animation-delay: 0s\n}\n.active a span {\n  position: absolute;\n  display: block;\n}\n@keyframes btn-anim5 {\n  0% {\n    right: 0%;\n    width: 0%\n  }\n  10% {\n    right: 20%;\n    width: 20%\n  }\n  20% {\n    right: 40%;\n    width: 40%\n  }\n  30% {\n    right: 60%;\n    width: 40%\n  }\n  40%{\n    right: 80%;\n    width: 20%\n  }\n  50%{\n    right: 100%;\n    width: 0%;\n  }\n  60%{\n    right: 80%;\n    width: 20%\n  }\n  70%{\n    right: 60%;\n    width: 40%\n  }\n  80%{\n    right: 40%;\n    width: 40%\n  }\n  90%{\n    right: 20%;\n    width: 20%\n  }\n  100% {\n    right: 0%;\n    width: 0%\n  }\n}\n\nnav ul {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  display: flex;\n}\n\n\nnav ul li {\n  margin: 0 40px 0 0;\n  opacity: 1;\n  transition: all 0.4s ease;\n}\n\nnav ul li:hover {\n  opacity: 0.7\n}\n\nnav ul li.active a {\n  color: #96E6B3\n}\n\nnav ul li:last-child {\n  margin-right: 0;\n}\n\nnav ul li a {\n  text-decoration: none;\n  color: #ffff;\n  text-transform: uppercase;\n  display: block;\n  font-weight: 600;\n  letter-spacing: 0.2em;\n  font-size: 14px;\n}\n\nh1 {\n  text-align: center;\n  color: white;\n  font-size:  50px\n}\n\n#greeting {\n  color: white;\n  margin: auto;\n  text-align: center;\n  font-style: italic;\n  overflow: hidden; \n  white-space: nowrap; \n  margin: 0 auto; \n  letter-spacing: .15em; \n  animation: \n    typing 6s steps(40, end),\n    blink-caret 1s step-end;\n}\n\n\n@keyframes typing {\n  from { width: 0 }\n  to { width: 100% }\n}\n\n\n.top {\n  padding-top: 50px;\n  padding-bottom: 20px;\n  background-color: #042A2B;\n  box-shadow: 0 15px 25px rgba(0,0,0,.6);\n  margin-bottom: 50px;\n}\n\n#bookings {\n  margin: auto;\n  margin-top: 50px;\n  width: 1000px;\n  padding: 20px;\n  color: white;\n  background-color: #042A2B;\n  text-align: center;\n  box-shadow: 0 15px 25px rgba(0,0,0,.6);\n  letter-spacing: 0.2em;\n}\n\nspan.name {\n  color:#96E6B3;\n}\n\n.main-page {\n  height: 100%;\n  width: 100%;\n}\n\narticle {\n  box-shadow: 0 15px 25px rgba(0,0,0,.6);\n  margin: 20px;\n  padding: 10px;\n  background-color: #042A2B;\n  color: white;\n  width: 800px;\n  font-size: 20px;\n  align-items: center;\n}\n\n#spending {\n  padding: 20px;\n  margin: auto;\n  text-align: center;\n  height: 150px;\n  width: 1000px;\n  color: #96E6B3\n}\n\n#my-bookings {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: start;\n  text-align: center;\n  padding-bottom: 90px;\n  max-height: 1000px;\n  overflow-y: auto;\n  background-color: #042A2B;\n}\n\n#available-bookings {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  justify-content: center;\n  text-align: start;\n  height: 400px; \n  overflow-y: auto;\n  width: 1500px;\n  background-color: #042A2B;\n  padding-bottom: 90px;\n  margin-bottom: 50px;\n}\n\n.dashboard {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.login-error, .calendar-error {\n  width: 90%;\n  margin: auto;\n  background: #da3e52;\n  color: #fff;\n  text-align: center;\n  padding: 5px;\n  font-size: 18px;\n  font-style: italic;\n}\n\n.bookings-card {\n  padding: 10px;\n  background-color: #042A2B;\n  border: 5px #96E6B3 solid;\n  width: 800px;\n  height: 600px;\n}\n\n.login-box {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 400px;\n  padding: 40px;\n  transform: translate(-50%, -50%);\n  background: #042A2B;\n  box-sizing: border-box;\n  box-shadow: 0 15px 25px rgba(0,0,0,.6);\n  border-radius: 10px;\n}\n\n.login-box h2 {\n  margin: 0 0 30px;\n  padding: 0;\n  color: #fff;\n  text-align: center;\n}\n\n.login-box .user-box {\n  position: relative;\n}\n\n.login-box .user-box input {\n  width: 100%;\n  padding: 10px 0;\n  font-size: 16px;\n  color: #fff;\n  margin-bottom: 30px;\n  border: none;\n  border-bottom: 1px solid #fff;\n  outline: none;\n  background: transparent;\n}\n.login-box .user-box label {\n  position: absolute;\n  top:0;\n  left: 0;\n  padding: 10px 0;\n  font-size: 16px;\n  color: #fff;\n  pointer-events: none;\n  transition: .5s;\n}\n\n#cal-label {\n  font-size: 20px;\n  color: #fff;\n  padding-top: 20px;\n  font-weight: 600;\n  letter-spacing: 0.2em;\n}\n\n.login-box .user-box input:focus ~ label,\n.login-box .user-box input:valid ~ label {\n  top: -20px;\n  left: 0;\n  color: #96E6B3;\n  font-size: 12px;\n}\n\n\n.login-box form a {\n  position: relative;\n  display: inline-block;\n  padding: 10px 20px;\n  color: #96E6B3;\n  font-size: 16px;\n  text-decoration: none;\n  text-transform: uppercase;\n  overflow: hidden;\n  transition: .5s;\n  margin-top: 40px;\n  letter-spacing: 4px\n}\n\n.login-box a:hover {\n  background: #96E6B3;\n  color: #fff;\n  border-radius: 5px;\n  box-shadow: 0 0 5px #96E6B3,\n              0 0 25px #96E6B3,\n              0 0 50px #96E6B3,\n              0 0 100px #96E6B3;\n}\n\n.login-box a span {\n  position: absolute;\n  display: block;\n}\n\n.login-box a span:nth-child(1) {\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 2px;\n  background: linear-gradient(90deg, transparent, #96E6B3);\n  animation: btn-anim1 1s linear infinite;\n}\n\n@keyframes btn-anim1 {\n  0% {\n    left: -100%;\n  }\n  50%,100% {\n    left: 100%;\n  }\n}\n\n\n\n.login-box a span:nth-child(2) {\n  top: -100%;\n  right: 0;\n  width: 2px;\n  height: 100%;\n  background: linear-gradient(180deg, transparent, #96E6B3);\n  animation: btn-anim2 1s linear infinite;\n  animation-delay: .25s\n}\n\n@keyframes btn-anim2 {\n  0% {\n    top: -100%;\n  }\n  50%,100% {\n    top: 100%;\n  }\n}\n\n.login-box a span:nth-child(3) {\n  bottom: 0;\n  right: -100%;\n  width: 100%;\n  height: 2px;\n  background: linear-gradient(270deg, transparent, #96E6B3);\n  animation: btn-anim3 1s linear infinite;\n  animation-delay: .5s\n}\n\n@keyframes btn-anim3 {\n  0% {\n    right: -100%;\n  }\n  50%,100% {\n    right: 100%;\n  }\n}\n\n.login-box a span:nth-child(4) {\n  bottom: -100%;\n  left: 0;\n  width: 2px;\n  height: 100%;\n  background: linear-gradient(360deg, transparent, #96E6B3);\n  animation: btn-anim4 1s linear infinite;\n  animation-delay: .75s\n}\n\n@keyframes btn-anim4 {\n  0% {\n    bottom: -100%;\n  }\n  50%,100% {\n    bottom: 100%;\n  }\n}\n\n.book-now {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  margin-top: 50px;\n  height: 50vh; \n}\n\n\n.calendar {\n  margin: 10px;\n  border-radius: 10px;\n  width: 250px;\n  height: 10px;\n  text-align: center;\n  align-content: center;\n  padding: 20px;\n  font-size: 20px;\n  margin-top: 30px;\n}\n\n#submit-button, button {\n  padding: 10px 20px;\n  color: #96E6B3;\n  border: none;\n  cursor: pointer;\n}\n\n#submit-button:hover, button:hover {\n  color: white\n}\n\n.calendar-form a:hover, button:hover {\n  background: #96E6B3;\n  color: #fff;\n  border-radius: 5px;\n  box-shadow: 0 0 5px #96E6B3,\n              0 0 25px #96E6B3,\n              0 0 50px #96E6B3,\n              0 0 100px #96E6B3;\n}\n\n.calendar-form a span {\n  position: absolute;\n  display: block;\n}\n\n.calendar-form {\n  padding: 50px;\n}\n\n.calendar-form a span:nth-child(1) {\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 2px;\n  background: linear-gradient(90deg, transparent, #96E6B3);\n  animation: btn-anim1 1s linear infinite;\n}\n\n@keyframes btn-anim1 {\n  0% {\n    left: -100%;\n  }\n  50%,100% {\n    left: 100%;\n  }\n}\n\n\n\n.calendar-form a span:nth-child(2) {\n  top: -100%;\n  right: 0;\n  width: 2px;\n  height: 100%;\n  background: linear-gradient(180deg, transparent, #96E6B3);\n  animation: btn-anim2 1s linear infinite;\n  animation-delay: .25s\n}\n\n@keyframes btn-anim2 {\n  0% {\n    top: -100%;\n  }\n  50%,100% {\n    top: 100%;\n  }\n}\n\n.calendar-form a span:nth-child(3) {\n  bottom: 0;\n  right: -100%;\n  width: 100%;\n  height: 2px;\n  background: linear-gradient(270deg, transparent, #96E6B3);\n  animation: btn-anim3 1s linear infinite;\n  animation-delay: .5s\n}\n\n@keyframes btn-anim3 {\n  0% {\n    right: -100%;\n  }\n  50%,100% {\n    right: 100%;\n  }\n}\n\n.calendar-form a span:nth-child(4) {\n  bottom: -100%;\n  left: 0;\n  width: 2px;\n  height: 100%;\n  background: linear-gradient(360deg, transparent, #96E6B3);\n  animation: btn-anim4 1s linear infinite;\n  animation-delay: .75s\n}\n\n@keyframes btn-anim4 {\n  0% {\n    bottom: -100%;\n  }\n  50%,100% {\n    bottom: 100%;\n  }\n}\n.calendar-form form{\n  background-color: #042A2B;\n  height: 250px;\n  width: 500px; \n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  border-radius: 10px;\n  box-shadow: 0 15px 25px rgba(0,0,0,.6);\n}\n\n.calendar-form form a {\n  position: relative;\n  display: inline-block;\n  padding: 10px 20px;\n  color: #96E6B3;\n  font-size: 16px;\n  text-decoration: none;\n  text-transform: uppercase;\n  overflow: hidden;\n  transition: .5s;\n  margin-top: 40px;\n  letter-spacing: 4px\n}\n\n#available-card {\n\n  width: 500px;\n  padding: 20px;\n  height: 150px;\n  margin: 20px;\n  font-size: 25px;\n}\n\n#calendar-box {\n  padding: 10px\n}\n\nbutton {\n  margin: auto;\n  height: 40px;\n  width: 500px;\n  margin-top: 20px;\n  background-color: #042A2B;\n  font-size: 20px;\n  padding: 10px\n}\n\nmenu {\n  margin: 0\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,uCAAuC;AACzC;;AAEA;EACE,QAAQ;EACR,SAAS;EACT,uBAAuB;EACvB,mBAAmB;EACnB,kCAAkC;EAClC,4BAA4B;EAC5B,6BAA6B;AAC/B;;AAEA;EACE,kCAAkC;AACpC;;AAEA;IACI;QACI,UAAU;IACd;IACA;QACI,UAAU;KACb;AACL;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,yBAAyB;EACzB,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,kBAAkB;EAClB,oBAAoB;EACpB;AACF;;;;;AAKA;EACE,SAAS;EACT,SAAS;EACT,UAAU;EACV,WAAW;EACX,yDAAyD;EACzD,uCAAuC;EACvC;AACF;AACA;EACE,kBAAkB;EAClB,cAAc;AAChB;AACA;EACE;IACE,SAAS;IACT;EACF;EACA;IACE,UAAU;IACV;EACF;EACA;IACE,UAAU;IACV;EACF;EACA;IACE,UAAU;IACV;EACF;EACA;IACE,UAAU;IACV;EACF;EACA;IACE,WAAW;IACX,SAAS;EACX;EACA;IACE,UAAU;IACV;EACF;EACA;IACE,UAAU;IACV;EACF;EACA;IACE,UAAU;IACV;EACF;EACA;IACE,UAAU;IACV;EACF;EACA;IACE,SAAS;IACT;EACF;AACF;;AAEA;EACE,UAAU;EACV,SAAS;EACT,gBAAgB;EAChB,aAAa;AACf;;;AAGA;EACE,kBAAkB;EAClB,UAAU;EACV,yBAAyB;AAC3B;;AAEA;EACE;AACF;;AAEA;EACE;AACF;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,qBAAqB;EACrB,YAAY;EACZ,yBAAyB;EACzB,cAAc;EACd,gBAAgB;EAChB,qBAAqB;EACrB,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ;AACF;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;EAChB,mBAAmB;EACnB,cAAc;EACd,qBAAqB;EA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","sourcesContent":["* {\n  font-family: 'Libre Caslon Text', serif;\n}\n\nbody {\n  margin:0;\n  padding:0;\n  font-family: sans-serif;\n  background: #A3D9FF;\n  animation: fadeInAnimation ease 1s;\n  animation-iteration-count: 1;\n  animation-fill-mode: forwards;\n}\n\n.main-page, #available-bookings, .filter-style, .dashboard, .book-now, .calendar-form, #bookings-display {\n  animation: fadeInAnimation ease 1s;\n} \n \n@keyframes fadeInAnimation {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n     }\n}\n\n.hidden {\n  display: none;\n}\n\n.nav-style {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-top: 50px;\n}\n\n.filter-style {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #042A2B;\n  padding: 20px;\n  box-shadow: 0 15px 25px rgba(0,0,0,.6);\n}\n\nnav {\n  position: relative;\n  padding-bottom: 12px;\n  margin: auto\n}\n\n\n\n\n.active a span {\n  bottom: 0;\n  right: 0%;\n  width: 20%;\n  height: 2px;\n  background: linear-gradient(270deg, transparent, #96E6B3);\n  animation: btn-anim5 4s linear infinite;\n  animation-delay: 0s\n}\n.active a span {\n  position: absolute;\n  display: block;\n}\n@keyframes btn-anim5 {\n  0% {\n    right: 0%;\n    width: 0%\n  }\n  10% {\n    right: 20%;\n    width: 20%\n  }\n  20% {\n    right: 40%;\n    width: 40%\n  }\n  30% {\n    right: 60%;\n    width: 40%\n  }\n  40%{\n    right: 80%;\n    width: 20%\n  }\n  50%{\n    right: 100%;\n    width: 0%;\n  }\n  60%{\n    right: 80%;\n    width: 20%\n  }\n  70%{\n    right: 60%;\n    width: 40%\n  }\n  80%{\n    right: 40%;\n    width: 40%\n  }\n  90%{\n    right: 20%;\n    width: 20%\n  }\n  100% {\n    right: 0%;\n    width: 0%\n  }\n}\n\nnav ul {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  display: flex;\n}\n\n\nnav ul li {\n  margin: 0 40px 0 0;\n  opacity: 1;\n  transition: all 0.4s ease;\n}\n\nnav ul li:hover {\n  opacity: 0.7\n}\n\nnav ul li.active a {\n  color: #96E6B3\n}\n\nnav ul li:last-child {\n  margin-right: 0;\n}\n\nnav ul li a {\n  text-decoration: none;\n  color: #ffff;\n  text-transform: uppercase;\n  display: block;\n  font-weight: 600;\n  letter-spacing: 0.2em;\n  font-size: 14px;\n}\n\nh1 {\n  text-align: center;\n  color: white;\n  font-size:  50px\n}\n\n#greeting {\n  color: white;\n  margin: auto;\n  text-align: center;\n  font-style: italic;\n  overflow: hidden; \n  white-space: nowrap; \n  margin: 0 auto; \n  letter-spacing: .15em; \n  animation: \n    typing 6s steps(40, end),\n    blink-caret 1s step-end;\n}\n\n\n@keyframes typing {\n  from { width: 0 }\n  to { width: 100% }\n}\n\n\n.top {\n  padding-top: 50px;\n  padding-bottom: 20px;\n  background-color: #042A2B;\n  box-shadow: 0 15px 25px rgba(0,0,0,.6);\n  margin-bottom: 50px;\n}\n\n#bookings {\n  margin: auto;\n  margin-top: 50px;\n  width: 1000px;\n  padding: 20px;\n  color: white;\n  background-color: #042A2B;\n  text-align: center;\n  box-shadow: 0 15px 25px rgba(0,0,0,.6);\n  letter-spacing: 0.2em;\n}\n\nspan.name {\n  color:#96E6B3;\n}\n\n.main-page {\n  height: 100%;\n  width: 100%;\n}\n\narticle {\n  box-shadow: 0 15px 25px rgba(0,0,0,.6);\n  margin: 20px;\n  padding: 10px;\n  background-color: #042A2B;\n  color: white;\n  width: 800px;\n  font-size: 20px;\n  align-items: center;\n}\n\n#spending {\n  padding: 20px;\n  margin: auto;\n  text-align: center;\n  height: 150px;\n  width: 1000px;\n  color: #96E6B3\n}\n\n#my-bookings {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: start;\n  text-align: center;\n  padding-bottom: 90px;\n  max-height: 1000px;\n  overflow-y: auto;\n  background-color: #042A2B;\n}\n\n#available-bookings {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  justify-content: center;\n  text-align: start;\n  height: 400px; \n  overflow-y: auto;\n  width: 1500px;\n  background-color: #042A2B;\n  padding-bottom: 90px;\n  margin-bottom: 50px;\n}\n\n.dashboard {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.login-error, .calendar-error {\n  width: 90%;\n  margin: auto;\n  background: #da3e52;\n  color: #fff;\n  text-align: center;\n  padding: 5px;\n  font-size: 18px;\n  font-style: italic;\n}\n\n.bookings-card {\n  padding: 10px;\n  background-color: #042A2B;\n  border: 5px #96E6B3 solid;\n  width: 800px;\n  height: 600px;\n}\n\n.login-box {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 400px;\n  padding: 40px;\n  transform: translate(-50%, -50%);\n  background: #042A2B;\n  box-sizing: border-box;\n  box-shadow: 0 15px 25px rgba(0,0,0,.6);\n  border-radius: 10px;\n}\n\n.login-box h2 {\n  margin: 0 0 30px;\n  padding: 0;\n  color: #fff;\n  text-align: center;\n}\n\n.login-box .user-box {\n  position: relative;\n}\n\n.login-box .user-box input {\n  width: 100%;\n  padding: 10px 0;\n  font-size: 16px;\n  color: #fff;\n  margin-bottom: 30px;\n  border: none;\n  border-bottom: 1px solid #fff;\n  outline: none;\n  background: transparent;\n}\n.login-box .user-box label {\n  position: absolute;\n  top:0;\n  left: 0;\n  padding: 10px 0;\n  font-size: 16px;\n  color: #fff;\n  pointer-events: none;\n  transition: .5s;\n}\n\n#cal-label {\n  font-size: 20px;\n  color: #fff;\n  padding-top: 20px;\n  font-weight: 600;\n  letter-spacing: 0.2em;\n}\n\n.login-box .user-box input:focus ~ label,\n.login-box .user-box input:valid ~ label {\n  top: -20px;\n  left: 0;\n  color: #96E6B3;\n  font-size: 12px;\n}\n\n\n.login-box form a {\n  position: relative;\n  display: inline-block;\n  padding: 10px 20px;\n  color: #96E6B3;\n  font-size: 16px;\n  text-decoration: none;\n  text-transform: uppercase;\n  overflow: hidden;\n  transition: .5s;\n  margin-top: 40px;\n  letter-spacing: 4px\n}\n\n.login-box a:hover {\n  background: #96E6B3;\n  color: #fff;\n  border-radius: 5px;\n  box-shadow: 0 0 5px #96E6B3,\n              0 0 25px #96E6B3,\n              0 0 50px #96E6B3,\n              0 0 100px #96E6B3;\n}\n\n.login-box a span {\n  position: absolute;\n  display: block;\n}\n\n.login-box a span:nth-child(1) {\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 2px;\n  background: linear-gradient(90deg, transparent, #96E6B3);\n  animation: btn-anim1 1s linear infinite;\n}\n\n@keyframes btn-anim1 {\n  0% {\n    left: -100%;\n  }\n  50%,100% {\n    left: 100%;\n  }\n}\n\n\n\n.login-box a span:nth-child(2) {\n  top: -100%;\n  right: 0;\n  width: 2px;\n  height: 100%;\n  background: linear-gradient(180deg, transparent, #96E6B3);\n  animation: btn-anim2 1s linear infinite;\n  animation-delay: .25s\n}\n\n@keyframes btn-anim2 {\n  0% {\n    top: -100%;\n  }\n  50%,100% {\n    top: 100%;\n  }\n}\n\n.login-box a span:nth-child(3) {\n  bottom: 0;\n  right: -100%;\n  width: 100%;\n  height: 2px;\n  background: linear-gradient(270deg, transparent, #96E6B3);\n  animation: btn-anim3 1s linear infinite;\n  animation-delay: .5s\n}\n\n@keyframes btn-anim3 {\n  0% {\n    right: -100%;\n  }\n  50%,100% {\n    right: 100%;\n  }\n}\n\n.login-box a span:nth-child(4) {\n  bottom: -100%;\n  left: 0;\n  width: 2px;\n  height: 100%;\n  background: linear-gradient(360deg, transparent, #96E6B3);\n  animation: btn-anim4 1s linear infinite;\n  animation-delay: .75s\n}\n\n@keyframes btn-anim4 {\n  0% {\n    bottom: -100%;\n  }\n  50%,100% {\n    bottom: 100%;\n  }\n}\n\n.book-now {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  margin-top: 50px;\n  height: 50vh; \n}\n\n\n.calendar {\n  margin: 10px;\n  border-radius: 10px;\n  width: 250px;\n  height: 10px;\n  text-align: center;\n  align-content: center;\n  padding: 20px;\n  font-size: 20px;\n  margin-top: 30px;\n}\n\n#submit-button, button {\n  padding: 10px 20px;\n  color: #96E6B3;\n  border: none;\n  cursor: pointer;\n}\n\n#submit-button:hover, button:hover {\n  color: white\n}\n\n.calendar-form a:hover, button:hover {\n  background: #96E6B3;\n  color: #fff;\n  border-radius: 5px;\n  box-shadow: 0 0 5px #96E6B3,\n              0 0 25px #96E6B3,\n              0 0 50px #96E6B3,\n              0 0 100px #96E6B3;\n}\n\n.calendar-form a span {\n  position: absolute;\n  display: block;\n}\n\n.calendar-form {\n  padding: 50px;\n}\n\n.calendar-form a span:nth-child(1) {\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 2px;\n  background: linear-gradient(90deg, transparent, #96E6B3);\n  animation: btn-anim1 1s linear infinite;\n}\n\n@keyframes btn-anim1 {\n  0% {\n    left: -100%;\n  }\n  50%,100% {\n    left: 100%;\n  }\n}\n\n\n\n.calendar-form a span:nth-child(2) {\n  top: -100%;\n  right: 0;\n  width: 2px;\n  height: 100%;\n  background: linear-gradient(180deg, transparent, #96E6B3);\n  animation: btn-anim2 1s linear infinite;\n  animation-delay: .25s\n}\n\n@keyframes btn-anim2 {\n  0% {\n    top: -100%;\n  }\n  50%,100% {\n    top: 100%;\n  }\n}\n\n.calendar-form a span:nth-child(3) {\n  bottom: 0;\n  right: -100%;\n  width: 100%;\n  height: 2px;\n  background: linear-gradient(270deg, transparent, #96E6B3);\n  animation: btn-anim3 1s linear infinite;\n  animation-delay: .5s\n}\n\n@keyframes btn-anim3 {\n  0% {\n    right: -100%;\n  }\n  50%,100% {\n    right: 100%;\n  }\n}\n\n.calendar-form a span:nth-child(4) {\n  bottom: -100%;\n  left: 0;\n  width: 2px;\n  height: 100%;\n  background: linear-gradient(360deg, transparent, #96E6B3);\n  animation: btn-anim4 1s linear infinite;\n  animation-delay: .75s\n}\n\n@keyframes btn-anim4 {\n  0% {\n    bottom: -100%;\n  }\n  50%,100% {\n    bottom: 100%;\n  }\n}\n.calendar-form form{\n  background-color: #042A2B;\n  height: 250px;\n  width: 500px; \n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  border-radius: 10px;\n  box-shadow: 0 15px 25px rgba(0,0,0,.6);\n}\n\n.calendar-form form a {\n  position: relative;\n  display: inline-block;\n  padding: 10px 20px;\n  color: #96E6B3;\n  font-size: 16px;\n  text-decoration: none;\n  text-transform: uppercase;\n  overflow: hidden;\n  transition: .5s;\n  margin-top: 40px;\n  letter-spacing: 4px\n}\n\n#available-card {\n\n  width: 500px;\n  padding: 20px;\n  height: 150px;\n  margin: 20px;\n  font-size: 25px;\n}\n\n#calendar-box {\n  padding: 10px\n}\n\nbutton {\n  margin: auto;\n  height: 40px;\n  width: 500px;\n  margin-top: 20px;\n  background-color: #042A2B;\n  font-size: 20px;\n  padding: 10px\n}\n\nmenu {\n  margin: 0\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchData": () => (/* binding */ fetchData),
/* harmony export */   "updateBookings": () => (/* binding */ updateBookings)
/* harmony export */ });
/* harmony import */ var _dom_updates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


const fetchData = (type, link, fn) => {
  return fetch(link)
    .then(response => response.json())
    .then(data => {
      return fn(data[type]);
    })
    .catch(error => {
       console.error(`An error occurred: ${error}`);
       (0,_dom_updates__WEBPACK_IMPORTED_MODULE_0__.printError)(error, type)
    })
};

const updateBookings = (booking) => {
  console.log(booking)
  const promise = fetch("http://localhost:3001/api/v1/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "userID": booking['userID'],
      "date": booking['date'],
      "roomNumber": booking['roomNumber']
    }),
  })
    .then((response) => response.json())
    .catch((err) => console.error(`You got an ${err}`));
  return promise;
};



/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayLoginAttempt": () => (/* binding */ displayLoginAttempt),
/* harmony export */   "displayDashboard": () => (/* binding */ displayDashboard),
/* harmony export */   "handleNavigation": () => (/* binding */ handleNavigation),
/* harmony export */   "displayAvailability": () => (/* binding */ displayAvailability),
/* harmony export */   "handleFilterNav": () => (/* binding */ handleFilterNav),
/* harmony export */   "displayCalendarError": () => (/* binding */ displayCalendarError),
/* harmony export */   "resetFilterBar": () => (/* binding */ resetFilterBar),
/* harmony export */   "printError": () => (/* binding */ printError)
/* harmony export */ });
/* harmony import */ var _user_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);


const loginError = document.querySelector('.login-error')
const mainPage = document.querySelector('.main-page')
const loginBox = document.querySelector('.login-box')
const myBookings = document.querySelector('#my-bookings')
const mySpendingTitle = document.querySelector('#my-spending')
const greeting = document.querySelector('#greeting')
const dashboardNav = document.querySelector('#dashboard-nav')
const booknowNav = document.querySelector('#book-now-nav')
const dashboard = document.querySelector('.dashboard')
const bookNow = document.querySelector('.book-now')
const calendarForm = document.querySelector('.calendar-form')
const availableBookings = document.querySelector('#available-bookings')
const availabilityDisplay = document.querySelector('.availability-display')
const filterList = document.querySelectorAll('.filter-link');
const calendarError = document.querySelector('.calendar-error')
const filterBar = document.querySelector('.filter-style')
const bookingsDisplay = document.querySelector('#bookings-display')
const filterAll = document.querySelector('#all')

const handleNavigation = (linkId) => {
  if (linkId == 'book-now-nav'){
    calendarForm.style.paddingTop = '0px'
    bookingsDisplay.classList.toggle('hidden', true)
    bookNow.classList.toggle('hidden', false)
    booknowNav.classList.toggle('active', true)
    dashboardNav.classList.toggle('active', false)
    calendarForm.classList.toggle('hidden', false)
    availabilityDisplay.classList.toggle('hidden', true)
    filterBar.classList.toggle('hidden', false)
  } else if (linkId == 'dashboard-nav') {
    bookingsDisplay.classList.toggle('hidden', false)
    bookNow.classList.toggle('hidden', true)
    booknowNav.classList.toggle('active', false)
    dashboardNav.classList.toggle('active', true)
    calendarForm.classList.toggle('hidden', true)
    availabilityDisplay.classList.toggle('hidden', true)
    filterBar.classList.toggle('hidden', true)
  }
}

const printError = (error, type) => {
  loginError.classList.toggle('hidden', false);
  loginError.innerText = `Error loading ${type}: ${error}`
};

const displayLoginAttempt = (loggedUser, bookings, rooms) => {
  if (loggedUser === 'Invalid username or password') {
    loginError.classList.toggle('hidden', false);
    loginError.innerText = loggedUser
  } else {
    loginError.classList.toggle('hidden', true);
    loginBox.classList.toggle('hidden', true);
    mainPage.classList.toggle('hidden', false);
    greeting.innerHTML = `<h2 tabindex="0" id="greeting"> Welcome back, <span class="name">${loggedUser['name'].split(' ', 1)}</span>.</h2>`
    let userBookings = (0,_user_functions__WEBPACK_IMPORTED_MODULE_0__.findBookings)(loggedUser, bookings);
    let userSpending = (0,_user_functions__WEBPACK_IMPORTED_MODULE_0__.calculateSpending)(loggedUser, bookings, rooms);
    displayDashboard(userBookings, userSpending)
  }
}

const displayDashboard = (userBookings, userSpending) => {
  mySpendingTitle.innerText = `$${userSpending}`;
  userBookings.forEach(booking => 
    myBookings.innerHTML += `<article tabindex="0" class="bookings-card"><p tabindex="0">${(0,_user_functions__WEBPACK_IMPORTED_MODULE_0__.formatDate)(booking['date'])}</p><p tabindex="0">Room ${booking['roomNumber']}</p></article>`
    )
}
const resetFilterBar = () => {
  filterList.forEach((link) => {
    link.classList.toggle('active', false)
  })
  filterAll.classList.toggle('active', true)
}

const displayAvailability = (availableRooms) => {
  calendarForm.style.paddingTop = '300px'
  calendarError.classList.toggle('hidden', true)
  availabilityDisplay.classList.toggle('hidden', false)
  availableBookings.innerHTML = ''
  availableRooms.forEach(room => 
    availableBookings.innerHTML += `<article class="bookings-card" id="available-card" tabindex="0"><menu><li tabindex="0">Room Type: ${room['roomType']}</li><li>Bed: ${room['numBeds']} ${room['bedSize']}</li><li tabindex="0">Price: $${room['costPerNight'].toFixed(2)} per night</li></menu><button tabindex="0" class="book-now-btn" id="${room['number']}">Book Now</button></article>`)
}

const handleFilterNav = (linkId) => {
  filterList.forEach((link) => {
    link.classList.toggle('active', false)
  })
  const activeFilter = document.querySelector(`#${linkId}`);
  activeFilter.classList.toggle('active', true)
}

const displayCalendarError = () => {
  calendarError.classList.toggle('hidden', false)
}



/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findBookings": () => (/* binding */ findBookings),
/* harmony export */   "calculateSpending": () => (/* binding */ calculateSpending),
/* harmony export */   "removeCustomerPrefix": () => (/* binding */ removeCustomerPrefix),
/* harmony export */   "getUser": () => (/* binding */ getUser),
/* harmony export */   "handleLogin": () => (/* binding */ handleLogin),
/* harmony export */   "formatDate": () => (/* binding */ formatDate)
/* harmony export */ });
const findBookings = (user, bookings) => {
  let userBookings = bookings.filter(booking => {
    return booking['userID'] === user['id']
  })
  let sortedUserBookings = userBookings.sort((a,b) => a['date'].replaceAll('/', '') - b['date'].replaceAll('/', ''))
  return sortedUserBookings
}

function formatDate(inputDate) {

  const parts = inputDate.split('/');

  if (parts.length === 3) {
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthName = monthNames[month - 1];

    const formattedDate = `${monthName} ${day}, ${year}`;
    
    return formattedDate;
  } else {
    return 'Invalid date format';
  }
}


const calculateSpending = (user, bookings, rooms) => {
  let foundBookings = findBookings(user, bookings);
  let bookingCostList = foundBookings.map(booking => {
    let matchingRoom = rooms.find(room => room['number'] === booking['roomNumber']);
    if (matchingRoom !== undefined) {
      return matchingRoom['costPerNight']
    } else {
      return 0
    }
  });
  let totalBookingCost = bookingCostList.reduce((spending, roomPrice) => {
    return spending + roomPrice
    }, 0);
  let number =  totalBookingCost.toFixed(2) * 1;
  return number.toLocaleString()
}

const removeCustomerPrefix = (input) => {
  const userID = input.replace('customer', '');
  return userID;
}

const getUser = (userID, users) => {  
  let gotUser = users.find(user => {return user['id'] == userID});
  return gotUser
}

const handleLogin = (username, password, users) => {
  let userID = removeCustomerPrefix(username);
  let loggedUser = getUser(userID, users); 
  if (password !== 'overlook2021' || loggedUser == undefined) {
    return `Invalid username or password`
  } else {
    return loggedUser
  }
}




/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkAvailability": () => (/* binding */ checkAvailability),
/* harmony export */   "filterByRoomType": () => (/* binding */ filterByRoomType),
/* harmony export */   "createUniqueID": () => (/* binding */ createUniqueID),
/* harmony export */   "bookRoom": () => (/* binding */ bookRoom),
/* harmony export */   "reformatDate": () => (/* binding */ reformatDate)
/* harmony export */ });
const checkAvailability = (bookings, rooms, date) => {
  let filledBookings = bookings.filter(booking => booking['date'] === date);
  let filledRooms = filledBookings.map(booking => {
    let matchingRoom = rooms.find(room => room['number'] === booking['roomNumber']);
      return matchingRoom
    })
  let availableRooms = rooms.filter(room => !filledRooms.includes(room));
  return availableRooms
}

const filterByRoomType = (availableRooms, type) => {
  let filteredRooms =  availableRooms.filter(room => {return room['roomType'] == type.replaceAll('-', ' ')})
  return filteredRooms
}

const reformatDate = (date) => {
  let reformattedDate = date.replaceAll('-', '/')
  return reformattedDate
}

const createUniqueID = (bookings) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomID = '';

  for (let i = 0; i < 17; i++) {
    randomID += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  if (bookings.some(booking => booking['id'] == randomID)) {
    return createUniqueID(bookings);
  }

  return randomID;
}


const bookRoom = (date, room, bookings, user) => {
  let newBooking = {
    "userID": user['id'],
    "date": date,
    "roomNumber": room * 1
  }
  console.log(newBooking)
  bookings.push(newBooking);
  return newBooking
}




/***/ }),
/* 10 */
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[p]=!0}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return b},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return a+1;case"MM":return b.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return b.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,u,!0);case"A":return $(s,u,!1);case"m":return String(u);case"mm":return b.s(u,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=!0),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O}));

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _api_calls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _user_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _booking_functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _dom_updates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_5__);








const loginSubmit = document.getElementById("custom-submit")
const navList = document.querySelectorAll('.nav-link');
const submitButton = document.getElementById('submit-button');
const filterList = document.querySelectorAll('.filter-link');
const calendar = document.querySelector('.calendar')

let customers;
let bookings;
let rooms;
let loggedUser; 
let selectedDate;
let availableRooms

const setCustomer = (data) => {
  customers = data;
  return customers
}

const setBookings = (data) => {
  bookings = data;
  return bookings
}

const setRooms = (data) => {
  rooms = data;
  return rooms
}

window.addEventListener('load', function() {
  calendar.min = dayjs__WEBPACK_IMPORTED_MODULE_5___default()().format('YYYY-MM-DD');
  (0,_api_calls__WEBPACK_IMPORTED_MODULE_1__.fetchData)('bookings', 'http://localhost:3001/api/v1/bookings', setBookings)
  ;(0,_api_calls__WEBPACK_IMPORTED_MODULE_1__.fetchData)('rooms', 'http://localhost:3001/api/v1/rooms', setRooms)
  ;(0,_api_calls__WEBPACK_IMPORTED_MODULE_1__.fetchData)('customers', 'http://localhost:3001/api/v1/customers', setCustomer)
})

loginSubmit.addEventListener("click", function(event) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  loggedUser = (0,_user_functions__WEBPACK_IMPORTED_MODULE_2__.handleLogin)(username, password, customers);
  (0,_dom_updates__WEBPACK_IMPORTED_MODULE_4__.displayLoginAttempt)(loggedUser, bookings, rooms);
})

navList.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const linkId = link.getAttribute("id");
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_4__.handleNavigation)(linkId)
  });
});

filterList.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const linkId = link.getAttribute("id");
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_4__.handleFilterNav)(linkId);
    if (linkId == 'all') {
      (0,_dom_updates__WEBPACK_IMPORTED_MODULE_4__.displayAvailability)(availableRooms)
      const bookNowBtn = document.querySelectorAll('.book-now-btn')
      bookNowBtn.forEach((link) => {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          const roomId = link.getAttribute("id")
          let newBooking = (0,_booking_functions__WEBPACK_IMPORTED_MODULE_3__.bookRoom)(selectedDate, roomId, bookings, loggedUser);
          (0,_api_calls__WEBPACK_IMPORTED_MODULE_1__.updateBookings)(newBooking)
          ;(0,_dom_updates__WEBPACK_IMPORTED_MODULE_4__.handleNavigation)('dashboard-nav')
          ;(0,_dom_updates__WEBPACK_IMPORTED_MODULE_4__.displayLoginAttempt)(loggedUser, bookings, rooms);    
        }
        )
      }
      )
    } else {
      let filteredRooms = (0,_booking_functions__WEBPACK_IMPORTED_MODULE_3__.filterByRoomType)(availableRooms, linkId);
      (0,_dom_updates__WEBPACK_IMPORTED_MODULE_4__.displayAvailability)(filteredRooms)
      const bookNowBtn = document.querySelectorAll('.book-now-btn')
      bookNowBtn.forEach((link) => {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          const roomId = link.getAttribute("id")
          let newBooking = (0,_booking_functions__WEBPACK_IMPORTED_MODULE_3__.bookRoom)(selectedDate, roomId, bookings, loggedUser);
          (0,_api_calls__WEBPACK_IMPORTED_MODULE_1__.updateBookings)(newBooking)
          ;(0,_dom_updates__WEBPACK_IMPORTED_MODULE_4__.handleNavigation)('dashboard-nav')
          ;(0,_dom_updates__WEBPACK_IMPORTED_MODULE_4__.displayLoginAttempt)(loggedUser, bookings, rooms);    
        }
        )
      }
      )
    
    }
  });
});

submitButton.addEventListener('click', function (event) {
  event.preventDefault();
  const dateInput = document.querySelector('.calendar');
  const inputValue = dateInput.value;
  selectedDate = (0,_booking_functions__WEBPACK_IMPORTED_MODULE_3__.reformatDate)(inputValue);
  if (selectedDate == ''){
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_4__.displayCalendarError)()
  } else {
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_4__.resetFilterBar)();
    availableRooms = (0,_booking_functions__WEBPACK_IMPORTED_MODULE_3__.checkAvailability)(bookings, rooms, selectedDate);
    (0,_dom_updates__WEBPACK_IMPORTED_MODULE_4__.displayAvailability)(availableRooms)
    const bookNowBtn = document.querySelectorAll('.book-now-btn')
      bookNowBtn.forEach((link) => {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          const roomId = link.getAttribute("id")
          let newBooking = (0,_booking_functions__WEBPACK_IMPORTED_MODULE_3__.bookRoom)(selectedDate, roomId, bookings, loggedUser);
          (0,_api_calls__WEBPACK_IMPORTED_MODULE_1__.updateBookings)(newBooking)
          ;(0,_dom_updates__WEBPACK_IMPORTED_MODULE_4__.handleNavigation)('dashboard-nav')
          ;(0,_dom_updates__WEBPACK_IMPORTED_MODULE_4__.displayLoginAttempt)(loggedUser, bookings, rooms);    
        }
        )
      }
      )
  }
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map