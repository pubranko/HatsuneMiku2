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
      console.log(document.getElementsByClassName("hokanko"));
      var get_hokanko_elem = document.getElementsByClassName("hokanko")[0];
      var t = xhr_request.response['description'] + ' : ' + xhr_request.response['name'];
      get_hokanko_elem.innerHTML = t;
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

/***/ "./app/static/ts/etc/_init_screen.ts":
/*!*******************************************!*\
  !*** ./app/static/ts/etc/_init_screen.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.init_screen = void 0;

var input_form_add_1 = __webpack_require__(/*! ../input/input_form_add */ "./app/static/ts/input/input_form_add.ts");

var group_add_1 = __webpack_require__(/*! ../input/group_add */ "./app/static/ts/input/group_add.ts");
/**初回の読み込み時に、入力フォームの1つ目を追加 。
 * ただし検索結果を別のタブで開く場合は操作なし。
*/


var init_screen = function init_screen() {
  window.addEventListener("load", function (e) {
    group_add_1.group_add(0);
    input_form_add_1.input_form_add(0);
  });
};

exports.init_screen = init_screen;

/***/ }),

/***/ "./app/static/ts/global/_global.ts":
/*!*****************************************!*\
  !*** ./app/static/ts/global/_global.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.add = exports.global_num = void 0;
/**グローバル変数として使用したい変数を連想配列で格納*/

exports.global_num = {
  'search_conditions_count': 0,
  'search_group_count': 0
};
/**グローバル変数への加算を行う。
 * @param key グローバル変数の項目を指定
 * @param num グローバル変数へ加算する値を指定。マイナスを入れると減算される。
 */

var add = function add(field, key, num) {
  if (field == 'global_num') {
    if (key in exports.global_num) {
      exports.global_num[key] += num;
    } else {
      throw new Error('連想配列（global_num）に存在しないKeyが指定されています。(key = ' + key + ')');
    }
  }
};

exports.add = add;

/***/ }),

/***/ "./app/static/ts/input/group_add.ts":
/*!******************************************!*\
  !*** ./app/static/ts/input/group_add.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



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
exports.group_add = void 0;

var global = __importStar(__webpack_require__(/*! ../global/_global */ "./app/static/ts/global/_global.ts")); //グローバル変数

/**
 * 検索条件フィールドを追加する。
 * @param position 追加位置の指定。
 */


var group_add = function group_add(position) {
  global.add('global_num', 'search_group_count', 1); //検索グループカウントアップ
  //

  var div_tag = document.createElement('div');
  div_tag.className = 'search_group';
  div_tag.id = 'search_group_' + global.global_num['search_group_count'];
  var a_tag = document.createElement('a');
  a_tag.text = 'And';
  div_tag.appendChild(a_tag); //

  var elem;

  if (position == 0) {
    elem = document.getElementById("search_conditions_top");
    elem.appendChild(div_tag);
  } else {
    console.log(position);
    elem = document.getElementById("search_conditions_" + position);
    elem.parentNode.insertBefore(div_tag, elem.nextSibling);
  }
};

exports.group_add = group_add;

/***/ }),

/***/ "./app/static/ts/input/input_form_add.ts":
/*!***********************************************!*\
  !*** ./app/static/ts/input/input_form_add.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



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
exports.input_form_add = void 0;

var global = __importStar(__webpack_require__(/*! ../global/_global */ "./app/static/ts/global/_global.ts")); //グローバル変数

/**
 * 検索条件フィールドを追加する。
 * @param position 追加位置の指定。
 */


var input_form_add = function input_form_add(position) {
  /**selectタグ内のoptionタグを設定して返す。
   * @param select_tag:渡されたselectタグに対してoptionタグを埋め込む
   * @param lists:optionごとの配列。配列の中は連想配列で各要素を渡す。
   */
  var option_add = function option_add(select_tag, lists) {
    lists.forEach(function (dict) {
      var option_tag = document.createElement('option');
      option_tag.value = dict['op_num'];

      if ('selected' in dict) {
        option_tag.selected = true;
      }

      option_tag.innerHTML = dict['op_case'];
      option_tag.setAttribute('onclick', 'input_form_change(' + global.global_num['search_conditions_count'] + ',' + dict['op_num'] + ')');
      select_tag.appendChild(option_tag);
    });
    return select_tag;
  };

  global.add('global_num', 'search_conditions_count', 1); //検索条件カウントアップ
  //divタグを作成し、条件フィールドと条件追加ボタンを中に設定する。

  var div_tag = document.createElement('div');
  div_tag.className = 'search_conditions';
  div_tag.id = 'search_conditions_' + global.global_num['search_conditions_count']; //selectタグを作成。またその中にoptionタグを追加していく。

  var select_tag = document.createElement('select');
  select_tag.name = 'Filed'; //optionタグの内容を配列・連想配列で生成

  var lists = [{
    'op_num': 0,
    'op_case': '件名or本文',
    'selected': true
  }, {
    'op_num': 1,
    'op_case': '件名'
  }, {
    'op_num': 2,
    'op_case': '本文'
  }, {
    'op_num': 3,
    'op_case': '記事公開日'
  }, {
    'op_num': 4,
    'op_case': '発行者'
  }];
  div_tag.appendChild(option_add(select_tag, lists)); //最後にselectタグをdivタグへ追加
  //inputタグ（検索条件入力フィールド）を作成し、divタグへ追加

  var input_tag_text = document.createElement('input');
  input_tag_text.type = 'text';
  input_tag_text.value = '';
  div_tag.appendChild(input_tag_text); //inputタグ（チェックボックス）を作成し、divタグへ追加

  var input_tag_checkbox = document.createElement('input');
  input_tag_checkbox.type = 'checkbox';
  input_tag_checkbox.value = 'not_search';
  div_tag.appendChild(input_tag_checkbox);
  var not_tag = document.createTextNode('not(まだ未実装) ');
  div_tag.appendChild(not_tag); //inputタグ（条件削除ボタン）を作成し、divタグへ追加

  var input_tag_button_del = document.createElement('input');
  input_tag_button_del.type = 'button';
  input_tag_button_del.value = '条件削除';
  input_tag_button_del.setAttribute('onclick', 'input_form_delete(' + global.global_num['search_conditions_count'] + ')');
  div_tag.appendChild(input_tag_button_del); //inputタグ（条件追加ボタン）を作成し、divタグへ追加

  var input_tag_button_add = document.createElement('input');
  input_tag_button_add.type = 'button';
  input_tag_button_add.value = '条件追加↓';
  input_tag_button_add.setAttribute('onclick', 'input_form_add(' + global.global_num['search_conditions_count'] + ')');
  div_tag.appendChild(input_tag_button_add); //押下された条件追加ボタンを取得し、その次に新なフィールド(divタグ)を追加。

  var elem;

  if (position == 0) {
    elem = document.getElementById("search_group_1");
    elem.appendChild(div_tag);
  } else {
    console.log(position);
    elem = document.getElementById("search_conditions_" + position);
    elem.parentNode.insertBefore(div_tag, elem.nextSibling);
  }
};

exports.input_form_add = input_form_add;

/***/ }),

/***/ "./app/static/ts/main.ts":
/*!*******************************!*\
  !*** ./app/static/ts/main.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



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
/*
外部モジュールメソッドのグローバル化
*/

var test = __importStar(__webpack_require__(/*! ./_test */ "./app/static/ts/_test.ts"));

var input_form_add_1 = __webpack_require__(/*! ./input/input_form_add */ "./app/static/ts/input/input_form_add.ts");

var _init_screen_1 = __webpack_require__(/*! ./etc/_init_screen */ "./app/static/ts/etc/_init_screen.ts");

var search_main_1 = __webpack_require__(/*! ./search/search_main */ "./app/static/ts/search/search_main.ts");

window.test1 = function () {
  test.test1();
};

window.test2 = function () {
  test.test2();
};

window.test3 = function () {
  test.test3();
};

window.input_form_add = function (position) {
  input_form_add_1.input_form_add(position);
}; //初回検索条件フィールド追加


window.search_main = function (search_destination) {
  search_main_1.search_main(search_destination);
}; //初画面表示


_init_screen_1.init_screen();

/***/ }),

/***/ "./app/static/ts/search/_create_json_form_input.ts":
/*!*********************************************************!*\
  !*** ./app/static/ts/search/_create_json_form_input.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.create_json_form_input = void 0;
/**
 * @param
 * @param
 */

var create_json_form_input = function create_json_form_input(input_list) {
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
  return json_data;
};

exports.create_json_form_input = create_json_form_input;

/***/ }),

/***/ "./app/static/ts/search/_input_check.ts":
/*!**********************************************!*\
  !*** ./app/static/ts/search/_input_check.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.input_check = void 0;
/**
 * @param
 * @param
 */

var input_check = function input_check(input_list) {
  return {
    "error_flg": "off"
  };
};

exports.input_check = input_check;

/***/ }),

/***/ "./app/static/ts/search/_input_get.ts":
/*!********************************************!*\
  !*** ./app/static/ts/search/_input_get.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.input_get = void 0;
/**
 * @param
 * @param
 */

var input_get = function input_get() {
  var search_conditions_top = document.getElementById('search_conditions_top'); //検索条件全体を取得

  console.log(search_conditions_top);
  return [];
};

exports.input_get = input_get;

/***/ }),

/***/ "./app/static/ts/search/_query.ts":
/*!****************************************!*\
  !*** ./app/static/ts/search/_query.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.query = void 0;

var _result_news_clip_1 = __webpack_require__(/*! ./_result_news_clip */ "./app/static/ts/search/_result_news_clip.ts"); //news_clipへの検索結果を画面に編集する。

/**
 * @param
 * @param
 */


var query = function query(search_conditions_json) {
  var xhr_request = new XMLHttpRequest();
  xhr_request.onreadystatechange = result; //戻り値を処理する関数

  xhr_request.open('POST', 'http://localhost:8000/news_clip', true);
  xhr_request.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
  xhr_request.responseType = 'json';
  xhr_request.send(JSON.stringify(search_conditions_json));
  /**
  * @param
  * @param
  */

  function result() {
    if (xhr_request.readyState == 4 && xhr_request.status == 200) {
      _result_news_clip_1.result_news_clip(xhr_request.response['recodes']);
    }
  }
};

exports.query = query;
/*recode:[
    'title':recode['title'],
    'article':recode['article'],
    'url':recode['url'],
    'publish_date':datetime.strftime(parser.parse(recode['publish_date']),'%Y-%m-%d %H:%M'),
    'issuer':recode['issuer'][0],
    'update_count':recode['update_count'],
  ]
*/

/***/ }),

/***/ "./app/static/ts/search/_result_news_clip.ts":
/*!***************************************************!*\
  !*** ./app/static/ts/search/_result_news_clip.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.result_news_clip = void 0;
/**
 * @param
 * @param
 */

var result_news_clip = function result_news_clip(recodes) {
  var get_hokanko_elem = document.getElementsByClassName("hokanko");

  for (var _i = 0, recodes_1 = recodes; _i < recodes_1.length; _i++) {
    var recode = recodes_1[_i];
    var element_title = document.createElement('p');
    element_title.innerHTML = recode['title'];
    get_hokanko_elem[0].appendChild(element_title);
  } //let t = xhr_request.response['title'] + ' : ' + xhr_request.response['name'];
  //get_hokanko_elem.innerHTML = t;

};

exports.result_news_clip = result_news_clip;
/*recode:[
    'title':recode['title'],
    'article':recode['article'],
    'url':recode['url'],
    'publish_date':datetime.strftime(parser.parse(recode['publish_date']),'%Y-%m-%d %H:%M'),
    'issuer':recode['issuer'][0],
    'update_count':recode['update_count'],
  ]
*/

/***/ }),

/***/ "./app/static/ts/search/search_main.ts":
/*!*********************************************!*\
  !*** ./app/static/ts/search/search_main.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.search_main = void 0; //import * as input_get from './_input_get';

var _input_get_1 = __webpack_require__(/*! ./_input_get */ "./app/static/ts/search/_input_get.ts");

var _input_check_1 = __webpack_require__(/*! ./_input_check */ "./app/static/ts/search/_input_check.ts");

var _create_json_form_input_1 = __webpack_require__(/*! ./_create_json_form_input */ "./app/static/ts/search/_create_json_form_input.ts");

var _query_1 = __webpack_require__(/*! ./_query */ "./app/static/ts/search/_query.ts");
/**
 * 入力フィールドより検索条件を取得し、検索を実行する。
 * @param search_destination 検索先を指定する（site,twitterなど）。
 */


var search_main = function search_main(search_destination) {
  var input_list = _input_get_1.input_get();

  var error = _input_check_1.input_check(input_list);

  if (error['error_flg'] == 'on') {} else {
    var search_conditions_json = _create_json_form_input_1.create_json_form_input(input_list);

    _query_1.query(search_conditions_json);
  }
};

exports.search_main = search_main; //let input_data = 

/*
１．inputデータの取得、
    １）search_conditions_topクラスを検索して検索条件全量を取得
    ２）上記の結果を解析し、配列（groupはカッコ、検索条件はjson）にして返す。※f_group_analysis()を参考に。ただ昔はjson使っていない。
    ３）検索条件チェック。空欄はエラー。
    ４）
２．ajaxでクエリーを飛ばす。
３．戻り値を画面へ反映。
*/

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