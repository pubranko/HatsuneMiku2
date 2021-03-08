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

var _group_add_1 = __webpack_require__(/*! ../group/_group_add */ "./app/static/ts/group/_group_add.ts");
/**初回の読み込み時に、入力フォームの1つ目を追加 。
 * ただし検索結果を別のタブで開く場合は操作なし。
*/


var init_screen = function init_screen() {
  window.addEventListener("load", function (e) {
    _group_add_1.group_add('');

    search_conditions_add_1.search_conditions_add('search_group_1');
  });
};

exports.init_screen = init_screen;

/***/ }),

/***/ "./app/static/ts/etc/_menu_off.ts":
/*!****************************************!*\
  !*** ./app/static/ts/etc/_menu_off.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.menu_off = void 0;

var _global_1 = __webpack_require__(/*! ../global/_global */ "./app/static/ts/global/_global.ts"); //グローバル変数

/**
 * 選択されたメニューリスト以外を全て非表示にする。
 * @param key なし
 */


var menu_off = function menu_off() {
  //メニューリスト全件取得
  var operation_menu = document.querySelectorAll('.p-operation_menu__ul');
  operation_menu.forEach(function (menu) {
    //表示中、かつ、処理中のメニューリスト以外は非表示にする。
    if (!menu.classList.contains('u-display--none') && _global_1.global_runing_events.indexOf(menu.id) < 0) {
      //if()
      menu.classList.add('u-display--none');
    }
  });

  _global_1.global_runing_events.splice(0);
};

exports.menu_off = menu_off;

/***/ }),

/***/ "./app/static/ts/global/_global.ts":
/*!*****************************************!*\
  !*** ./app/static/ts/global/_global.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.global_runing_events_add = exports.global_runing_events = exports.global_search_conditions_table = exports.global_num_add = exports.global_num = void 0;
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
/**グローバル変数：実行中にイベント配列として保存する*/

exports.global_runing_events = [];
/**グローバル変数：実行中イベント配列への追加を行う。
 * @param key グローバル変数の項目を指定
 * @param num グローバル変数へ加算する値を指定。マイナスを入れると減算される。
 */

var global_runing_events_add = function global_runing_events_add(event) {
  exports.global_runing_events.push(event);
};

exports.global_runing_events_add = global_runing_events_add;

/***/ }),

/***/ "./app/static/ts/group/_group_add.ts":
/*!*******************************************!*\
  !*** ./app/static/ts/group/_group_add.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.group_add = void 0;

var _global_1 = __webpack_require__(/*! ../global/_global */ "./app/static/ts/global/_global.ts"); //グローバル変数

/**
 * 検索条件フィールドを追加する。
 * @param insertion_position 追加位置の指定。初期表示時は''。それ以外は検索条件id(search_conditions_id)を指定する。
 */


var group_add = function group_add(insertion_position) {
  /**ulタグ内にliタグを設定して返す。
   * @param ul_tag:対象のulタグエレメント。
   * @param lists:liごとの配列。配列の中は連想配列で各要素を渡す。
   */
  var list_add = function list_add(ul_tag, lists) {
    lists.forEach(function (dict) {
      var list_tag = document.createElement('li');
      list_tag.classList.add(dict['class_name']);
      list_tag.setAttribute('onclick', dict['onclick']);
      list_tag.innerHTML = dict['menu'];
      ul_tag.appendChild(list_tag);
    });
    return ul_tag;
  };

  _global_1.global_num_add('global_num', 'search_group_count', 1); //検索グループカウントアップ


  var search_group_id = 'search_group_' + _global_1.global_num['search_group_count']; //今回作成される検索グループID

  var fieldset_tag = document.createElement('fieldset');
  fieldset_tag.classList.add('c-search_group');
  fieldset_tag.id = search_group_id;
  var legend_tag = document.createElement('legend');
  legend_tag.innerHTML = search_group_id + '(And結合)';
  fieldset_tag.appendChild(legend_tag); //グループメニュー

  var div_tag = document.createElement('div');
  div_tag.classList.add('p-operation_menu__position', 'u-margin--t-150');
  div_tag.id = search_group_id + '_menu';
  var nav_tag = document.createElement('nav');
  nav_tag.classList.add('p-operation_menu__nav', 'u-margin--l80');
  nav_tag.innerText = '…';
  nav_tag.setAttribute('onclick', 'group_menu_swich("' + search_group_id + '")');
  div_tag.appendChild(nav_tag);
  fieldset_tag.appendChild(div_tag); //グループメニューリスト

  var div_tag2 = document.createElement('div');
  div_tag2.classList.add('p-operation_menu_list__position', 'u-margin--t50');
  div_tag2.id = search_group_id + '_menu_list';
  var ul_tag = document.createElement('ul');
  ul_tag.classList.add('p-operation_menu__ul', 'u-display--none', 'u-margin--t0');
  ul_tag.id = search_group_id + '_ul';
  var lists = [{
    'class_name': 'p-operation_menu__li',
    'onclick': 'search_conditions_add("' + search_group_id + '")',
    'menu': '検索条件追加'
  }, {
    'class_name': 'p-operation_menu__li',
    'onclick': 'grouping_conditions_change("' + search_group_id + '")',
    'menu': 'AND/OR切り替え'
  }, {
    'class_name': 'p-operation_menu__li',
    'onclick': 'group_release("' + search_group_id + '")',
    'menu': 'グループ解除'
  }];
  div_tag2.appendChild(list_add(ul_tag, lists)); //最後にulタグをnavタグへ追加

  fieldset_tag.appendChild(div_tag2);
  console.log(insertion_position);
  var elem;

  if (insertion_position == '') {
    elem = document.querySelector("#search_conditions_top");
    elem.appendChild(fieldset_tag);
  } else {
    elem = document.querySelector('#' + insertion_position);
    console.log(elem);
    elem.parentNode.insertBefore(fieldset_tag, elem.nextSibling);
  }
};

exports.group_add = group_add;
/* グループのイメージ
<fieldset class="c-search_group" id = "search_group_1" >
    <legend>search_group_1(And結合) < /legend>
        <div class="p-operation_menu__position u-margin--t-150" id="search_group_1_menu">
            <nav class="p-operation_menu__nav u-margin--l80" onclick="group_menu_swich("search_group_1","on")">…</nav >
        </div>
        <div class="p-operation_menu_list__position u-margin--t50" id="search_group_1_menu_list">
            <ul class="p-operation_menu__ul u-margin--t0 u-display--none">
                <li class="p-operation_menu__li" onclick="search_conditions_add("search_group_1")">検索条件追加</li >
                <li class="p-operation_menu__li" onclick = "grouping_conditions_change("search_group_1")" > AND / OR切り替え < /li>
                <li class="p-operation_menu__li" onclick="group_release("search_group_1")">グループ解除</li >
            </ul>
        </div >
</fieldset>
*/

/***/ }),

/***/ "./app/static/ts/group/group_menu_swich.ts":
/*!*************************************************!*\
  !*** ./app/static/ts/group/group_menu_swich.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.group_menu_swich = void 0;

var _global_1 = __webpack_require__(/*! ../global/_global */ "./app/static/ts/global/_global.ts"); //グローバル変数

/**
 * グループメニューの表示/非表示の切り替えを行う。。
 * @param 選択対象の検索条件id(search_group_id)
 */


var group_menu_swich = function group_menu_swich(search_group_id) {
  var menu_list = document.querySelector('#' + search_group_id + '_menu_list');
  var menu_list_ul = menu_list.querySelector('.p-operation_menu__ul'); //実行中のメニューは非表示にしないよう実行中イベントへ登録

  _global_1.global_runing_events.push(menu_list_ul.id);

  if (menu_list_ul.classList.contains('u-display--none')) {
    menu_list_ul.classList.remove('u-display--none');
  } else {
    menu_list_ul.classList.add('u-display--none');
  }
};

exports.group_menu_swich = group_menu_swich;

/***/ }),

/***/ "./app/static/ts/group/grouping_finished.ts":
/*!**************************************************!*\
  !*** ./app/static/ts/group/grouping_finished.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.grouping_finished = void 0;

var _group_add_1 = __webpack_require__(/*! ../group/_group_add */ "./app/static/ts/group/_group_add.ts");
/**
 *
 *
 * @param 検索グループID(search_group_id)
 * @param 検索条件ID(search_conditions_id)
 */


var grouping_finished = function grouping_finished(search_group_id, search_conditions_id) {
  var search_conditions = document.querySelectorAll('#' + search_group_id + '>.p-search_conditions');
  search_conditions.forEach(function (search_condition) {
    var menu = document.querySelector('#' + search_condition.id + '_menu');
    var menu_nav = menu.querySelector("[class^='p-operation_menu__nav']");
    var menu_checkbox = menu.querySelector("[class^='p-operation_menu__grouping_selecter']");
    menu_checkbox.classList.add('u-display--none');
    menu_checkbox['checked'] = false;
    menu_nav.classList.remove('u-display--none');
  });

  _group_add_1.group_add(search_conditions_id);
};

exports.grouping_finished = grouping_finished;

/***/ }),

/***/ "./app/static/ts/group/grouping_start.ts":
/*!***********************************************!*\
  !*** ./app/static/ts/group/grouping_start.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.grouping_start = void 0;
/**
 * 指定された検索グループ直下の検索条件に対して、グループ化を行うための準備を行う。
 * 検索条件メニューをチェックボックスにする。指定された検索条件はチェック済みにする。
 * @param 検索グループID(search_group_id)
 * @param 検索条件ID(search_conditions_id)
 */

var grouping_start = function grouping_start(search_group_id, search_conditions_id) {
  var search_conditions = document.querySelectorAll('#' + search_group_id + '>.p-search_conditions');
  search_conditions.forEach(function (search_condition) {
    var menu = document.querySelector('#' + search_condition.id + '_menu');
    var menu_nav = menu.querySelector("[class^='p-operation_menu__nav']");
    var menu_checkbox = menu.querySelector("[class^='p-operation_menu__grouping_selecter']");
    menu_checkbox.classList.remove('u-display--none');

    if (search_conditions_id == search_condition.id) {
      menu_checkbox['checked'] = true;
    }

    menu_nav.classList.add('u-display--none');
  });
};

exports.grouping_start = grouping_start;

/***/ }),

/***/ "./app/static/ts/input/_search_conditions_menu.ts":
/*!********************************************************!*\
  !*** ./app/static/ts/input/_search_conditions_menu.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.search_conditions_menu = void 0;
/**
 * 検索条件フィールドを追加する。
 * @param
 */

var search_conditions_menu = function search_conditions_menu(search_group_id, search_conditions_id) {
  /**ulタグ内にliタグを設定して返す。
   * @param ul_tag:対象のulタグエレメント。
   * @param lists:liごとの配列。配列の中は連想配列で各要素を渡す。
   */
  var list_add = function list_add(ul_tag, lists) {
    lists.forEach(function (dict) {
      var list_tag = document.createElement('li');
      list_tag.classList.add(dict['class_name']);
      list_tag.setAttribute('onclick', dict['onclick']);
      list_tag.innerHTML = dict['menu'];
      ul_tag.appendChild(list_tag);
    });
    return ul_tag;
  }; //メニュー


  var menu_tag = document.createElement('div');
  menu_tag.classList.add('p-operation_menu__position--type2');
  menu_tag.id = search_conditions_id + '_menu';
  var nav_tag = document.createElement('nav');
  nav_tag.classList.add('p-operation_menu__nav--type2');
  nav_tag.innerText = '…';
  nav_tag.setAttribute('onclick', 'search_conditions_menu_swich("' + search_conditions_id + '")');
  menu_tag.appendChild(nav_tag); //メニュー内のグループ化用チェックボックス

  var check_box_tag = document.createElement('input');
  check_box_tag.type = 'checkbox';
  check_box_tag.classList.add('p-operation_menu__grouping_selecter', 'u-display--none'); //check_box_tag.innerText = '…';

  check_box_tag.setAttribute('onclick', 'grouping_finished("' + search_group_id + '","' + search_conditions_id + '")');
  menu_tag.appendChild(check_box_tag); //メニューリスト

  var menu_list_tag = document.createElement('div');
  menu_list_tag.classList.add('p-operation_menu_list__position--type2', 'u-margin--t50');
  menu_list_tag.id = search_conditions_id + '_menu_list';
  var ul_tag = document.createElement('ul');
  ul_tag.classList.add('p-operation_menu__ul', 'u-display--none', 'u-margin--t0');
  var lists = [{
    'class_name': 'p-operation_menu__li',
    'onclick': 'grouping_start("' + search_group_id + '","' + search_conditions_id + '")',
    'menu': '検索条件グループ化'
  }, {
    'class_name': 'p-operation_menu__li',
    'onclick': 'search_conditions_delete("' + search_conditions_id + '")',
    'menu': '検索条件削除'
  }];
  menu_list_tag.appendChild(list_add(ul_tag, lists)); //最後にulタグをnavタグへ追加

  return {
    'menu': menu_tag,
    'menu_list': menu_list_tag
  }; //あとで
};

exports.search_conditions_menu = search_conditions_menu;

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


var _search_conditions_menu_1 = __webpack_require__(/*! ./_search_conditions_menu */ "./app/static/ts/input/_search_conditions_menu.ts");
/**
 * 検索条件フィールドを追加する。
 * @param search_group_id 検索条件を追加するグループID。
 */


var search_conditions_add = function search_conditions_add(search_group_id) {
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


  var search_conditions_id = 'search_conditions_' + _global_1.global_num['search_conditions_count']; //今回作成される検索条件ID
  //検索条件ボックス

  var search_conditions_tag = document.createElement('div');
  search_conditions_tag.id = search_conditions_id;
  search_conditions_tag.classList.add('p-search_conditions');

  var search_conditions_menu_tag = _search_conditions_menu_1.search_conditions_menu(search_group_id, search_conditions_id);

  search_conditions_tag.appendChild(search_conditions_menu_tag.menu);
  search_conditions_tag.appendChild(search_conditions_menu_tag.menu_list); //selectタグを作成。またその中にoptionタグを追加していく。

  var select_tag = document.createElement('select');
  select_tag.classList.add('p-search_conditions__field_select');
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
  input_tag_text.classList.add('p-search_conditions__search_text');
  input_tag_text.type = 'text';
  input_tag_text.value = '';
  search_conditions_tag.appendChild(input_tag_text); //押下された条件追加ボタンを取得し、その次に新なフィールド(divタグ)を追加。

  var elem = document.getElementById(search_group_id);
  elem.appendChild(search_conditions_tag); //実行中のメニューは非表示にしないよう実行中イベントへ登録

  var menu_list_ul = elem.querySelector('#' + search_group_id + '_ul');

  _global_1.global_runing_events.push(menu_list_ul.id);
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

/***/ "./app/static/ts/input/search_conditions_menu_swich.ts":
/*!*************************************************************!*\
  !*** ./app/static/ts/input/search_conditions_menu_swich.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.search_conditions_menu_swich = void 0;

var _global_1 = __webpack_require__(/*! ../global/_global */ "./app/static/ts/global/_global.ts"); //グローバル変数

/**
 * 検索条件メニューの表示/非表示の切り替えを行う。
 * @param 選択対象の検索条件id(search_conditions_id)
 */


var search_conditions_menu_swich = function search_conditions_menu_swich(search_conditions_id) {
  var menu_list = document.querySelector('#' + search_conditions_id + '_menu_list');
  var menu_list_ul = menu_list.querySelector('.p-operation_menu__ul'); //実行中のメニューは非表示にしないよう実行中イベントへ登録

  _global_1.global_runing_events.push(menu_list_ul.id);

  if (menu_list_ul.classList.contains('u-display--none')) {
    menu_list_ul.classList.remove('u-display--none');
  } else {
    menu_list_ul.classList.add('u-display--none');
  }
};

exports.search_conditions_menu_swich = search_conditions_menu_swich;

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

var _menu_off_1 = __webpack_require__(/*! ./etc/_menu_off */ "./app/static/ts/etc/_menu_off.ts");

var search_conditions_add_1 = __webpack_require__(/*! ./input/search_conditions_add */ "./app/static/ts/input/search_conditions_add.ts");

var search_field_change_1 = __webpack_require__(/*! ./input/search_field_change */ "./app/static/ts/input/search_field_change.ts");

var search_conditions_delete_1 = __webpack_require__(/*! ./input/search_conditions_delete */ "./app/static/ts/input/search_conditions_delete.ts");

var search_conditions_menu_swich_1 = __webpack_require__(/*! ./input/search_conditions_menu_swich */ "./app/static/ts/input/search_conditions_menu_swich.ts");

var group_menu_swich_1 = __webpack_require__(/*! ./group/group_menu_swich */ "./app/static/ts/group/group_menu_swich.ts");

var grouping_start_1 = __webpack_require__(/*! ./group/grouping_start */ "./app/static/ts/group/grouping_start.ts");

var grouping_finished_1 = __webpack_require__(/*! ./group/grouping_finished */ "./app/static/ts/group/grouping_finished.ts");

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

window.search_conditions_menu_swich = function (search_conditions_id) {
  search_conditions_menu_swich_1.search_conditions_menu_swich(search_conditions_id);
};

window.group_menu_swich = function (search_group_id) {
  group_menu_swich_1.group_menu_swich(search_group_id);
};

window.grouping_start = function (search_group_id, search_conditions_id) {
  grouping_start_1.grouping_start(search_group_id, search_conditions_id);
};

window.grouping_finished = function (search_group_id, search_conditions_id) {
  grouping_finished_1.grouping_finished(search_group_id, search_conditions_id);
}; //初画面表示


_init_screen_1.init_screen(); //クリックイベントの終了処理


window.addEventListener("click", function (e) {
  _menu_off_1.menu_off();
});

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