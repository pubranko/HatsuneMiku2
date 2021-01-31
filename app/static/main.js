/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/static/ts/_test.ts":
/*!********************************!*\
  !*** ./app/static/ts/_test.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.test3 = exports.test2 = exports.test1 = void 0;

function test1() {
  //console.log('hello');
  return 'test1';
}

exports.test1 = test1;

function test2() {
  //return 'test2';
  //テスト用のサンプルデータ
  var json_data = {
    'name': 'Foo',
    'description': 'An optional description',
    'price': 45.2,
    'tax': 3.5
  };
  var xhr_request = new XMLHttpRequest();
  xhr_request.onreadystatechange = f_hxr_showData; //戻り値を処理する関数

  xhr_request.open('POST', 'http://localhost:8000/test/ajax', true);
  xhr_request.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
  xhr_request.responseType = 'json';
  xhr_request.send(JSON.stringify(json_data)); //ajaxで取得したhtmlを、divタグ（name=hokanko）に挿入する。

  function f_hxr_showData() {
    if (xhr_request.readyState == 4 && xhr_request.status == 200) {
      //console.log(JSON.parse(xhr_request.responseText));
      console.log(xhr_request.responseType);
      console.log(xhr_request.response);
    }
  }
}

exports.test2 = test2;

function test3() {
  //テスト用のサンプルデータ
  var json_data = {
    'search_conditions': ['(', //{'field' : 'title', 'range_flg':'off', 'value1':'中国'},
    {
      'field': 'article',
      'range_flg': 'off',
      'value1': '安倍'
    }, ')'],
    'page_number': 1,
    'details_number': 10
  };
  var xhr_request = new XMLHttpRequest();
  xhr_request.onreadystatechange = f_hxr_showData; //戻り値を処理する関数

  xhr_request.open('POST', 'http://localhost:8000/news_clip', true);
  xhr_request.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
  xhr_request.responseType = 'json';
  xhr_request.send(JSON.stringify(json_data)); //ajaxで取得したhtmlを、divタグ（name=hokanko）に挿入する。

  function f_hxr_showData() {
    if (xhr_request.readyState == 4 && xhr_request.status == 200) {
      var get_hokanko_elem = document.getElementsByClassName("hokanko");

      for (var _i = 0, _a = xhr_request.response['recodes']; _i < _a.length; _i++) {
        var recode = _a[_i];
        var element_title = document.createElement('p');
        element_title.innerHTML = recode['title'];
        get_hokanko_elem[0].appendChild(element_title);
      }
    }
  }
}

exports.test3 = test3;

/***/ }),

/***/ "./app/static/ts/main.ts":
/*!*******************************!*\
  !*** ./app/static/ts/main.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

 /// <reference path='./test.ts'>

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _test = __importStar(__webpack_require__(/*! ./_test */ "./app/static/ts/_test.ts"));

window.test1 = function () {
  _test.test1();
};

window.test2 = function () {
  _test.test2();
};

window.test3 = function () {
  _test.test3();
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./app/static/ts/main.ts");
/******/ })()
;