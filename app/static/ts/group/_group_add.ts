import { global_num, global_num_add, } from '../global/_global';    //グローバル変数

/**
 * 検索条件フィールドを追加する。
 * @param insertion_position 追加位置の指定。初期表示時は''。それ以外は検索条件id(search_conditions_id)を指定する。
 */
export const group_add = (insertion_position: string, move_target: Array<Element>): void => {
    /**ulタグ内にliタグを設定して返す。
     * @param ul_tag:対象のulタグエレメント。
     * @param lists:liごとの配列。配列の中は連想配列で各要素を渡す。
     */
    const list_add = (ul_tag: Element, lists: any): Element => {
        lists.forEach(dict => {
            let list_tag = document.createElement('li');
            list_tag.classList.add(dict['class_name']);
            //例外：検索グループ１は解除禁止
            if (search_group_id == 'search_group_1' && dict['menu'] == 'グループ解除') {
                list_tag.classList.add('p-operation_menu__li--inactive');
            } else {
                list_tag.setAttribute('onclick', dict['onclick']);
            }
            list_tag.innerHTML = dict['menu'];
            ul_tag.appendChild(list_tag);
        })
        return ul_tag;
    }

    global_num_add('global_num', 'search_group_count', 1); //検索グループカウントアップ
    let search_group_id = 'search_group_' + global_num['search_group_count'];   //今回作成される検索グループID

    let fieldset_tag = document.createElement('fieldset');
    fieldset_tag.classList.add('c-search_group');
    fieldset_tag.id = search_group_id;

    let legend_tag = document.createElement('legend');
    legend_tag.innerHTML = search_group_id + '(And結合)';
    fieldset_tag.appendChild(legend_tag);

    //グループメニュー
    let menu_tag = document.createElement('div');
    menu_tag.classList.add('p-operation_menu__position');
    menu_tag.id = search_group_id + '_menu';

    let nav_tag = document.createElement('nav');
    nav_tag.classList.add('p-operation_menu__nav', 'u-margin--l80');
    nav_tag.innerText = '…';
    nav_tag.setAttribute('onclick', 'group_menu_swich("' + search_group_id + '")');
    menu_tag.appendChild(nav_tag);

    //メニュー内のグループ化用チェックボックス
    let check_box_tag = document.createElement('input');
    check_box_tag.type = 'checkbox';
    check_box_tag.classList.add('p-operation_menu__grouping_selecter', 'u-display--none');
    check_box_tag.setAttribute('onclick', 'grouping_finished()');
    menu_tag.appendChild(check_box_tag);

    fieldset_tag.appendChild(menu_tag);

    //グループメニューリスト
    let menu_list_tag = document.createElement('div');
    menu_list_tag.classList.add('p-operation_menu_list__position', 'u-margin--t50');
    menu_list_tag.id = search_group_id + '_menu_list'

    let ul_tag = document.createElement('ul');
    ul_tag.classList.add('p-operation_menu__ul', 'u-display--none', 'u-margin--t0');
    ul_tag.id = search_group_id + '_ul';

    let lists = [       //liタグの内容を配列・連想配列で生成
        { 'class_name': 'p-operation_menu__li', 'onclick': 'search_conditions_add("' + search_group_id + '")', 'menu': '検索条件追加' },
        { 'class_name': 'p-operation_menu__li', 'onclick': 'grouping_conditions_change("' + search_group_id + '")', 'menu': 'AND/OR切り替え' },
        { 'class_name': 'p-operation_menu__li', 'onclick': 'group_release("' + search_group_id + '")', 'menu': 'グループ解除' },
    ];

    menu_list_tag.appendChild(list_add(ul_tag, lists)); //最後にulタグをnavタグへ追加
    fieldset_tag.appendChild(menu_list_tag);

    let elem;
    if (insertion_position == '') {
        elem = document.querySelector("#search_conditions_top");
        elem.appendChild(fieldset_tag);
    } else {
        elem = document.querySelector('#' + insertion_position);
        elem.parentNode.insertBefore(fieldset_tag, elem.nextSibling);
        for (let target of move_target) {
            fieldset_tag.appendChild(target);
        }
    }
}
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