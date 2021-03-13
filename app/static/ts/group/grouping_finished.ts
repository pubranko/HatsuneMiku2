import { group_add } from '../group/_group_add';
import { global_string, global_string_edit, } from '../global/_global';    //グローバル変数
import {menu_grouping_control} from '../etc/_menu_grouping_control';

/**
 * 選択された２つの検索条件間の検索条件を全て、新しい検索グループの中へ移動する。
 * 新しい検索グループは、選択された検索条件の下とする。
 * チェックが１つもなかった場合、キャンセルとして処理する。
 * @param 検索グループID(search_group_id)
 */
export const grouping_finished = (): void => {

    //let search_conditions = document.querySelectorAll('#' + search_group_id + '>.p-search_conditions');
    let conditions_or_groups = document.querySelectorAll(
        '#' + global_string['global_grouping_id'] + '>.p-search_conditions,' +
        '#' + global_string['global_grouping_id'] + '>.c-search_group'
    );
    let move_target: Array<Element> = [];
    let move_flg: boolean = false;
    let insertion_position: string = '';

    conditions_or_groups.forEach(condition_or_group => {
        let menu = document.querySelector('#' + condition_or_group.id + '_menu');
        let menu_nav = menu.querySelector("[class^='p-operation_menu__nav']");
        let menu_checkbox = menu.querySelector("[class^='p-operation_menu__grouping_selecter']");

        /*２つのチェックされた検索条件間の検索条件を移動対象とする*/
        if (menu_checkbox['checked'] == true) {
            move_target.push(condition_or_group);
            move_flg = !move_flg;
            insertion_position = condition_or_group.id;   //※2回めのtrueの結果のみ最終的に残す。
        } else {
            if (move_flg == true) { move_target.push(condition_or_group); }
        }

        menu_nav.classList.remove('u-display--none');
        menu_checkbox.classList.add('u-display--none');
        menu_checkbox['checked'] = false;
    });

    if (move_target.length > 0) { group_add(insertion_position, move_target); }
    menu_grouping_control(global_string['global_grouping_id']);
    global_string_edit('global_grouping_id', '');
}