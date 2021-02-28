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

var search_conditions_add_1 = __webpack_require__(/*! ../input/search_conditions_add */ "./app/static/ts/input/search_conditions_add.ts");

var group_add_1 = __webpack_require__(/*! ../group/group_add */ "./app/static/ts/group/group_add.ts");
/**初回の読み込み時に、入力フォームの1つ目を追加 。
 * ただし検索結果を別のタブで開く場合は操作なし。
*/


var init_screen = function init_screen() {
  window.addEventListener("load", function (e) {
    group_add_1.group_add('first');
    search_conditions_add_1.search_conditions_add('search_group_1');
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
exports.global_search_conditions_table = exports.global_num_add = exports.global_num = void 0;
/**グローバル変数として使用したい変数を連想配列で格納*/

exports.global_num = {
  'search_conditions_count': 0,
  'search_group_count': 0
};
/**グローバル変数への加算を行う。
 * @param key グローバル変数の項目を指定
 * @param num グローバル変数へ加算する値を指定。マイナスを入れると減算される。
 */

var global_num_add = function global_num_add(field, key, num) {
  if (field == 'global_num') {
    if (key in exports.global_num) {
      exports.global_num[key] += num;
    } else {
      throw new Error('連想配列（global_num）に存在しないKeyが指定されています。(key = ' + key + ')');
    }
  }
};

exports.global_num_add = global_num_add;
/**
 * グローバル変数として、検索条件フィールド種類を配列にして格納。
 * 配列内には連想配列でフィールドごとの要素を格納。
 */

exports.global_search_conditions_table = {
  0: {
    'type': 'text',
    //{field_set : {field : フィールド名,range_flg:off,value1:値,}}
    'field_set': {
      'field': 'title & article',
      'range_flg': false,
      'value1': ''
    },
    'field_name': '件名or本文',
    'selected': true
  },
  1: {
    'type': 'text',
    'field_set': {
      'field': 'title',
      'range_flg': false,
      'value1': ''
    },
    'field_name': '件名'
  },
  2: {
    'type': 'text',
    'field_set': {
      'field': 'article',
      'range_flg': false,
      'value1': ''
    },
    'field_name': '本文'
  },
  3: {
    'type': 'date',
    'field_set': {
      'field': 'publish_date',
      'range_flg': true,
      'value1': '',
      'value2': ''
    },
    'field_name': '記事公開日'
  },
  4: {
    'type': 'text',
    'field_set': {
      'field': 'issuer',
      'range_flg': false,
      'value1': ''
    },
    'field_name': '発行者'
  }
};

/***/ }),

/***/ "./app/static/ts/group/group_add.ts":
/*!******************************************!*\
  !*** ./app/static/ts/group/group_add.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.group_add = void 0;

var _global_1 = __webpack_require__(/*! ../global/_global */ "./app/static/ts/global/_global.ts"); //グローバル変数

/**
 * 検索条件フィールドを追加する。
 * @param insertion_position 追加位置の指定。初期表示時はfirst。それ以外は検索条件id(search_conditions_id)を指定する。
 */


var group_add = function group_add(insertion_position) {
  /**ulタグ内にliタグを設定して返す。
   * @param ul_tag:対象のulタグエレメント。
   * @param lists:liごとの配列。配列の中は連想配列で各要素を渡す。
   */
  var list_add = function list_add(ul_tag, lists) {
    lists.forEach(function (dict) {
      var list_tag = document.createElement('li');
      list_tag.className = dict['class_name'];
      list_tag.setAttribute('onclick', dict['onclick']);
      list_tag.innerHTML = dict['menu'];
      ul_tag.appendChild(list_tag);
    });
    return ul_tag;
  };

  _global_1.global_num_add('global_num', 'search_group_count', 1); //検索グループカウントアップ


  var search_group_id = 'search_group_' + _global_1.global_num['search_group_count']; //今回作成されるグループの検索グループID

  var fieldset_tag = document.createElement('fieldset');
  fieldset_tag.className = 'c-search_group';
  fieldset_tag.id = search_group_id;
  var legend_tag = document.createElement('legend');
  legend_tag.innerHTML = search_group_id + '(And結合)';
  fieldset_tag.appendChild(legend_tag); //グループメニュー

  var div_tag = document.createElement('div');
  div_tag.className = 'c-operation_menu__postion u-margin--t-150'; //div_tag.id = search_group_id;

  var nav_tag = document.createElement('nav');
  nav_tag.className = 'c-operation_menu__nav u-margin--l80';
  nav_tag.innerText = '…';
  nav_tag.setAttribute('onclick', 'group_nav_swich("' + search_group_id + '","on")');
  div_tag.appendChild(nav_tag); //最後にulタグをnavタグへ追加

  var ul_tag = document.createElement('ul');
  ul_tag.className = 'c-operation_menu__ul u-display--none u-margin--tb30';
  var lists = [{
    'class_name': 'c-operation_menu__li',
    'onclick': 'search_conditions_add("' + search_group_id + '")',
    'menu': '検索条件追加'
  }, {
    'class_name': 'c-operation_menu__li',
    'onclick': 'grouping_conditons_change("' + search_group_id + '")',
    'menu': 'AND/OR切り替え'
  }, //{ 'class_name': 'c-operation_menu__li', 'onclick': 'grouping_start("'+search_group_id+'")','menu': '検索条件をグループ化' },
  {
    'class_name': 'c-operation_menu__li',
    'onclick': 'group_release("' + search_group_id + '")',
    'menu': 'グループ解除'
  }];
  div_tag.appendChild(list_add(ul_tag, lists)); //最後にulタグをnavタグへ追加
  //div_tag.appendChild(nav_tag);

  fieldset_tag.appendChild(div_tag);
  var elem;

  if (insertion_position == 'first') {
    elem = document.getElementById("search_conditions_top");
    elem.appendChild(fieldset_tag);
  } else {
    elem = document.getElementById(insertion_position);
    elem.parentNode.insertBefore(fieldset_tag, elem.nextSibling);
  }
};

exports.group_add = group_add;

/***/ }),

/***/ "./app/static/ts/group/group_nav_swich.ts":
/*!************************************************!*\
  !*** ./app/static/ts/group/group_nav_swich.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.group_nav_swich = void 0;
/**
 * グループメニューのON/OFFの切り替えを行う。。
 * @param 選択対象の検索条件id(search_group_id)
 * @param on/offの切り替え(swich)
 */

var group_nav_swich = function group_nav_swich(search_group_id, swich) {
  var group = document.querySelector("#" + search_group_id);
  var group_nav = group.querySelector(".c-operation_menu__ul");
  var class_list = group_nav.classList;
  console.log(class_list);

  if (swich == 'on') {
    class_list.remove('u-display--none');
    group_nav.setAttribute('onclick', 'group_nav_swich("' + search_group_id + '","off")');
  } else {
    class_list.add('u-display--none');
    group_nav.setAttribute('onclick', 'group_nav_swich("' + search_group_id + '","on")');
  }
};

exports.group_nav_swich = group_nav_swich;

/***/ }),

/***/ "./app/static/ts/input/search_conditions_add.ts":
/*!******************************************************!*\
  !*** ./app/static/ts/input/search_conditions_add.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.search_conditions_add = void 0;

var _global_1 = __webpack_require__(/*! ../global/_global */ "./app/static/ts/global/_global.ts"); //グローバル変数

/**
 * 検索条件フィールドを追加する。
 * @param group_id 検索条件を追加するグループID。
 */


var search_conditions_add = function search_conditions_add(group_id) {
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
      option_tag.setAttribute('onclick', 'search_field_change("search_conditions_' + _global_1.global_num['search_conditions_count'] + '"' + ',"' + _global_1.global_search_conditions_table[dict['op_num']]['type'] + '")');
      select_tag.appendChild(option_tag);
    });
    return select_tag;
  };

  _global_1.global_num_add('global_num', 'search_conditions_count', 1); //検索条件カウントアップ
  //検索条件ボックス


  var search_conditions_tag = document.createElement('div');
  search_conditions_tag.id = 'search_conditions_' + _global_1.global_num['search_conditions_count'];
  search_conditions_tag.className = 'p-search_conditions'; // search_conditions_tag.setAttribute(
  //     'onclick',
  //     'search_conditions_select("search_conditions_' + global_num['search_conditions_count'] + '","on")');
  //グループ化ボタン用divタグ

  var grouping_select_tag = document.createElement('div');
  grouping_select_tag.id = 'grouping_select_' + _global_1.global_num['search_conditions_count'];
  grouping_select_tag.className = 'p-search_conditions__grouping_select--type1';
  grouping_select_tag.setAttribute('onclick', 'grouping_select("grouping_select_' + _global_1.global_num['search_conditions_count'] + '","on")');
  grouping_select_tag.textContent = 'Grp化選択';
  search_conditions_tag.appendChild(grouping_select_tag); //selectタグを作成。またその中にoptionタグを追加していく。

  var select_tag = document.createElement('select');
  select_tag.className = 'p-search_conditions__field_select';
  select_tag.name = 'Filed';
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
  search_conditions_tag.appendChild(option_add(select_tag, lists)); //最後にselectタグをdivタグへ追加
  //検索条件入力フィールド：検索条件ボックスへ追加

  var input_tag_text = document.createElement('input');
  input_tag_text.className = 'p-search_conditions__search_text';
  input_tag_text.type = 'text';
  input_tag_text.value = '';
  search_conditions_tag.appendChild(input_tag_text); //条件削除ボタンを作成し、：検索条件ボックスへ追加

  var input_tag_button_del = document.createElement('input');
  input_tag_button_del.type = 'button';
  input_tag_button_del.className = 'p-search_conditions__delete';
  input_tag_button_del.value = '条件削除';
  input_tag_button_del.setAttribute('onclick', 'search_conditions_delete("search_conditions_' + _global_1.global_num['search_conditions_count'] + '")');
  search_conditions_tag.appendChild(input_tag_button_del); //押下された条件追加ボタンを取得し、その次に新なフィールド(divタグ)を追加。

  var elem = document.getElementById(group_id);
  elem.appendChild(search_conditions_tag); // if (group_id == 0) {
  //     elem = document.getElementById("search_group_1");
  //     elem.appendChild(search_conditions_tag);
  // } else {
  //     elem = document.getElementById("search_conditions_" + global_num['search_conditions_count']);
  //     elem.parentNode.insertBefore(search_conditions_tag, elem.nextSibling);
  // }
};

exports.search_conditions_add = search_conditions_add;

/***/ }),

/***/ "./app/static/ts/input/search_conditions_delete.ts":
/*!*********************************************************!*\
  !*** ./app/static/ts/input/search_conditions_delete.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.search_conditions_delete = void 0;
/**検索フィールドを削除。
 * @param 削除対象の検索条件id(search_conditions_id)
 */

var search_conditions_delete = function search_conditions_delete(search_conditions_id) {
  var search_conditions = document.querySelector("#" + search_conditions_id);
  search_conditions.parentNode.removeChild(search_conditions);
};

exports.search_conditions_delete = search_conditions_delete;

/***/ }),

/***/ "./app/static/ts/input/search_field_change.ts":
/*!****************************************************!*\
  !*** ./app/static/ts/input/search_field_change.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.search_field_change = void 0;
/**検索フィールドを、テキスト、日付の切り替えを行う。
 * @param 変更対象の検索条件id(search_conditions_id)
 * @param 変更後のinputタグのタイプ(option_type)
 */

var search_field_change = function search_field_change(search_conditions_id, option_type) {
  var search_conditions = document.querySelector("#" + search_conditions_id);
  var input_tag = search_conditions.querySelector("input");

  if (input_tag.type !== option_type) {
    //現在のtypeと選択されたオプションのタイプが変更された場合
    if (option_type == 'date') {
      var input_date_from = document.createElement('input');
      input_date_from.type = 'date'; //input_date_from.name = 'sch_date_from_'+sch_num;
      //input_date_from.className = get_sch_field[0].className;

      input_date_from.value = '';
      var input_date_to = document.createElement('input');
      input_date_to.type = 'date'; //input_date_to.name = 'sch_date_to_'+sch_num;
      //input_date_to.className = get_sch_field[0].className;

      input_date_to.value = '';
      search_conditions.insertBefore(input_date_to, input_tag.nextSibling);
      search_conditions.insertBefore(input_date_from, input_tag.nextSibling);
      search_conditions.removeChild(input_tag); //sch_textを削除
    } else if (option_type == 'text') {
      var input_text = document.createElement('input');
      input_text.type = 'text'; //input_text.name = 'sch_text_'+sch_num;
      //input_text.className = get_sch_field[0].className;

      input_text.value = '';
      search_conditions.insertBefore(input_text, input_tag.nextSibling);
      search_conditions.removeChild(search_conditions.querySelector('input[type="date"]')); //sch_date_from_を削除

      search_conditions.removeChild(search_conditions.querySelector('input[type="date"]')); //sch_date_from_を削除
    }
  }
};

exports.search_field_change = search_field_change;

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

var _init_screen_1 = __webpack_require__(/*! ./etc/_init_screen */ "./app/static/ts/etc/_init_screen.ts");

var search_conditions_add_1 = __webpack_require__(/*! ./input/search_conditions_add */ "./app/static/ts/input/search_conditions_add.ts");

var search_field_change_1 = __webpack_require__(/*! ./input/search_field_change */ "./app/static/ts/input/search_field_change.ts");

var search_conditions_delete_1 = __webpack_require__(/*! ./input/search_conditions_delete */ "./app/static/ts/input/search_conditions_delete.ts"); //import {search_conditions_select} from './input/search_conditions_select';


var group_nav_swich_1 = __webpack_require__(/*! ./group/group_nav_swich */ "./app/static/ts/group/group_nav_swich.ts");

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

window.search_main = function (search_destination) {
  search_main_1.search_main(search_destination);
};

window.search_conditions_add = function (group_id) {
  search_conditions_add_1.search_conditions_add(group_id);
}; //初回検索条件フィールド追加


window.search_field_change = function (search_conditions_id, option_type) {
  search_field_change_1.search_field_change(search_conditions_id, option_type);
};

window.search_conditions_delete = function (search_conditions_id) {
  search_conditions_delete_1.search_conditions_delete(search_conditions_id);
};

window.group_nav_swich = function (search_group_id, swich) {
  group_nav_swich_1.group_nav_swich(search_group_id, swich);
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
  var json_data = {
    'search_conditions': input_list,
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
  //とりあえず後回し
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.input_get = void 0;

var _global_1 = __webpack_require__(/*! ../global/_global */ "./app/static/ts/global/_global.ts"); //グローバル変数

/**
 * @param
 * @param
 */


var input_get = function input_get() {
  var elems = document.getElementById('search_conditions_top'); //検索条件全体を取得

  var grp_check_flg = true;
  var x = 0; //クエリーを生成するための配列を宣言

  var input_lists = [['search_group_1']];
  var grp_analysis = []; //グループ1の要素から解析。

  while (grp_check_flg) {
    //solr_query_listを順に検査し、group_*の有無をチェックする。
    grp_check_flg = false;

    for (var i = 0; i < input_lists.length; i++) {
      if (toString.call(input_lists[i]) == '[object Array]') {
        //input_lists内に配列がある（まだ置き換えられていないグループがある）場合。
        grp_check_flg = true;
        grp_analysis = []; //結果の格納エリアを初期化

        group_analysis(input_lists[i][0], grp_analysis); //グループを解析して、配列にして返す。

        input_lists.splice(i, 1); //グループ部分を配列より除去

        Array.prototype.splice.apply(input_lists, [i, 0].concat(grp_analysis)); //除去した部分にを挿入
      }
    }
    /*x++
    if (x >= 10) {
        break;
    }*/

  }
  /*for(let elem of search_group){
      console.log(elem);
  }*/
  //console.log(search_conditions_top);


  console.log(input_lists);
  return input_lists;
};

exports.input_get = input_get;
/**渡されたグループ名を検索し、グループ内の要素を配列にして返す。
 * 返す配列には、要素がグループであればグループ名、検索条件であれば、そのクエリーを設定する。
 */

function group_analysis(grp_name, grp_analysis) {
  var grp_elem = document.getElementById(grp_name); //引数より渡されたグループ名を検索。(filedsetタグ)
  //console.log(grp_elem);
  //console.log(grp_elem.children);

  var now = new Date();
  var search_field_num = 0; //selectタグのoptionで選択されているvalueを保存するワーク。

  var conjunction = ''; //現在分析中のグループのand/orの接続詞を保存するエリア。

  grp_analysis.push('('); //リストの先頭にグループの括弧を追加。
  //for (let elem of grp_elem.children){     //fieldsetの子要素（孫は含まない）を順に処理する。

  for (var i = 0; i < grp_elem.childElementCount; i++) {
    //fieldsetの子要素（孫は含まない）を順に処理する。
    var grp_child_elem = grp_elem.children[i];

    if (grp_child_elem['tagName'] == 'LEGEND') {
      //グループのクラス名に、or,andのどちらがあるか確認。
      if (grp_child_elem.innerHTML.indexOf('Or結合', 0) >= 0) {
        conjunction = ' OR ';
      } else if (grp_child_elem.innerHTML.indexOf('And結合', 0) >= 0) {
        conjunction = ' AND ';
      }
    } else if (grp_child_elem['tagName'] == 'DIV') {
      //検索条件div
      for (var idx_div_child = 0; idx_div_child < grp_child_elem.childElementCount; idx_div_child++) {
        var div_child_elem = grp_child_elem.children[idx_div_child];
        _global_1.global_search_conditions_table;

        if (div_child_elem['tagName'] == 'SELECT') {
          search_field_num = div_child_elem['value'];
        } else if (div_child_elem['tagName'] == 'INPUT' && div_child_elem['type'] == 'text') {
          //{field_set : {field : フィールド名,range_flg:off,value1:値,}}
          var field_set = {
            'field_set': _global_1.global_search_conditions_table[search_field_num]['field_set']
          };
          field_set['field_set']['value1'] = div_child_elem['value'];
          grp_analysis.push(field_set);
          grp_analysis.push(conjunction); //最後に接続詞（and/or）を追加。
        } else if (div_child_elem['tagName'] == 'INPUT' && div_child_elem['type'] == 'date') {
          //日付はまだ未実装
          //publish_date :[2019-01-01T00:00:00Z TO 2019-01-31T23:59:59Z] 範囲指定の仕方
          var wk_sch_date_from;
          var wk_sch_date_to;

          if (search_field_num == 3 && div_child_elem['name'].substring(0, 13) == "sch_date_from") {
            if (div_child_elem['value'] == "") {
              wk_sch_date_from = "1990-1-1";
            } else {
              wk_sch_date_from = div_child_elem['value'];
            }
          } else {
            if (div_child_elem['value'] == "") {
              wk_sch_date_to = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
            } else {
              wk_sch_date_to = div_child_elem['value'];
            }

            grp_analysis.push("publish_date:[" + wk_sch_date_from + "T00:00:00Z TO " + wk_sch_date_to + "T23:59:59Z]");
            grp_analysis.push(conjunction); //最後に接続詞（and/or）を追加。
          }
        }
        /*
        }else if(div_child_elem.tagName == 'INPUT' && div_child_elem.type == 'checkbox' && div_child_elem.value == 'not_search'){
            console.log('a3 '+div_child_elem.tagName+' '+div_child_elem.type+''+div_child_elem.value);
        }else{
            console.log('a4 '+div_child_elem.tagName+' '+div_child_elem.type);
        }
        */

      }
    } else if (grp_child_elem['tagName'] == 'FIELDSET') {
      grp_analysis.push([grp_child_elem['name']], conjunction);
    }
  }

  grp_analysis.pop(); //末尾に追加された余計なand/orを削除。

  grp_analysis.push(')'); //リストの末尾にグループの閉じ括弧を追加。

  console.log(grp_analysis);
}

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
exports.search_main = void 0;

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

exports.search_main = search_main;

/***/ }),

/***/ "./app/static/sass/app.scss":
/*!**********************************!*\
  !*** ./app/static/sass/app.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {}
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/app/static/main": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./app/static/ts/main.ts"],
/******/ 			["./app/static/sass/app.scss"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_001_RankoKoushin"] = self["webpackChunk_001_RankoKoushin"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;