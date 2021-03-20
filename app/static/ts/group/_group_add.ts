import { global_num, global_num_add, } from '../global/_global';    //グローバル変数
import { menu_grouping_control } from '../etc/_menu_grouping_control';
import { menu_create, } from '../etc/_menu_create';

/**
 * 検索グループを追加する。
 * @param insertion_position 追加位置の指定。初期表示時は''。それ以外は検索条件id(search_conditions_id)を指定する。
 * @param move_target グループ化した要素(検索条件、検索グループ)のElementを配列で設定する。
 */
export const group_add = (insertion_position: string, move_target: Array<Element>): void => {
    global_num_add('global_num', 'search_group_count', 1); //検索グループカウントアップ
    let search_group_id = 'search_group_' + global_num['search_group_count'];   //今回作成される検索グループID

    //検索グループを作成
    let fieldset_tag = document.createElement('fieldset');
    fieldset_tag.classList.add('c-search_group');
    fieldset_tag.id = search_group_id;

    //検索グループの説明を作成
    let legend_tag = document.createElement('legend');
    legend_tag.innerHTML = 'グループ内の条件をANDで結合';
    fieldset_tag.appendChild(legend_tag);

    //検索グループのメニューを作成
    let menu_class: string[] = ['p-operation_menu__position'];
    let nav_class: string[] = ['p-operation_menu__nav'];
    let grouping_check_box_class: string[] = ['p-operation_menu__grouping_selecter', 'u-display--none'];
    let menu_list_box_class: string[] = ['p-operation_menu_list__position', 'u-margin--t50'];
    let menu_lists_class: string[] = ['p-operation_menu__ul', 'u-display--none', 'u-margin--t0'];
    let menu_list_line: Array<object> = [
        { 'class_name': ['p-operation_menu__li'], 'onclick': 'search_conditions_add("' + search_group_id + '")', 'menu': '検索条件追加' },
        { 'class_name': ['p-operation_menu__li'], 'onclick': 'group_conjunction_change("' + search_group_id + '")', 'menu': 'AND/OR切り替え' },
        { 'class_name': ['p-operation_menu__li'], 'onclick': 'group_release("' + search_group_id + '")', 'menu': 'グループ解除' },
        { 'class_name': ['p-operation_menu__li--DOM__type1'], 'onclick': 'grouping_start("' + search_group_id + '")', 'menu': '検索条件グループ化' },
    ];
    //例外：検索グループ１は解除禁止のため非表示クラスを追加
    if (search_group_id == 'search_group_1' && menu_list_line[2]['menu'] == 'グループ解除') {
        menu_list_line[2]['class_name'].push('u-display--none');
    }
    let search_group_menu_tag = menu_create(
        search_group_id, search_group_id, menu_class, nav_class, grouping_check_box_class,
        menu_list_box_class, menu_lists_class, menu_list_line,
    );
    fieldset_tag.appendChild(search_group_menu_tag.menu);
    fieldset_tag.appendChild(search_group_menu_tag.menu_list);

    //作成した検索グループを追加する対象を特定し、子要素として追加する。
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
        //グループ内の要素数（検索グループと検索条件の合計）に応じた措置を実施する。
        menu_grouping_control(search_group_id);
    }
}
/* 検索グループのイメージ
<fieldset class="c-search_group" id="search_group_1">
    <legend>グループ内の条件をANDで結合</legend>
    <div class="p-operation_menu__position" id="search_group_1_menu">
        <nav class="p-operation_menu__nav" onclick="search_conditions_menu_swich(&quot;search_group_1&quot;)">…</nav>
        <input type="checkbox" class="p-operation_menu__grouping_selecter u-display--none" onclick="grouping_finished(&quot;search_group_1&quot;)">
    </div>
    <div class="p-operation_menu_list__position u-margin--t50" id="search_group_1_menu_list">
        <ul class="p-operation_menu__ul u-display--none u-margin--t0" id="search_group_1_ul">
            <li class="p-operation_menu__li" onclick="search_conditions_add(&quot;search_group_1&quot;)">検索条件追加</li>
            <li class="p-operation_menu__li" onclick="group_conjunction_change(&quot;search_group_1&quot;)">AND/OR切り替え</li>
            <li class="p-operation_menu__li u-display--none" onclick="group_release(&quot;search_group_1&quot;)">グループ解除</li>
            <li class="p-operation_menu__li--DOM__type1" onclick="grouping_start(&quot;search_group_1&quot;)">検索条件グループ化</li>
        </ul>
    </div>
    〜検索条件〜
</fieldset>*/