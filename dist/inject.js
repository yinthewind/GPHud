/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tableContainerMonitor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tableContainerMonitor.js */ \"./src/tableContainerMonitor.js\");\n\n\n\nconst app = document.getElementById('app');\nconst config = { childList: true, subtree: true };\nconst observer = new MutationObserver(function(mutationList, observer) {\n\tfor(let mutation of mutationList) {\n\t\tfor(let node of mutation.addedNodes) {\n\t\t\tif (node.classList.contains('view-port')) {\n\t\t\t\tlet tableContainer = document.getElementsByClassName('table-view-container')[0];\n\t\t\t\tObject(_tableContainerMonitor_js__WEBPACK_IMPORTED_MODULE_0__[\"monitorTableContainer\"])(tableContainer);\n\t\t\t\treturn observer.disconnect();\n\t\t\t}\n\t\t}\n\t}\n});\nobserver.observe(app, config);\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/tableContainerMonitor.js":
/*!**************************************!*\
  !*** ./src/tableContainerMonitor.js ***!
  \**************************************/
/*! exports provided: monitorTableContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"monitorTableContainer\", function() { return monitorTableContainer; });\n\n\n\nlet tableActionParser = function(mutationList, observer) {\n\tfor(let mutation of mutationList) {\n\t\tif (mutation.target.classList.contains('time')) {\n\t\t\treturn;\n\t\t}\n\t\t//let action = parseAction(mutation);\n\t\tconsole.log(mutation);\n\t}\n};\n\nlet monitorTable = function(tableId) {\n\tlet table = document.getElementById(tableId);\n\tlet config = { childList: true, subtree: true };\n\n\tlet observer = new MutationObserver(tableActionParser);\n\tobserver.observe(table, config);\n};\n\nlet observer = new MutationObserver(function(mutationList, observer) {\n\tfor(let mutation of mutationList) {\n\t\tfor(let node of mutation.addedNodes) {\n\t\t\tif (node.classList.contains('table-container')) {\n\t\t\t\t// new table found\n\t\t\t\tmonitorTable(node.id);\n\t\t\t}\n\t\t};\n\t}\n});\n\nconst monitorTableContainer = function(tableContainer) {\n\n\tlet config = { childList: true };\n\tobserver.observe(tableContainer, config);\n};\n\n\n//# sourceURL=webpack:///./src/tableContainerMonitor.js?");

/***/ })

/******/ });