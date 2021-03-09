import { group_add } from '../group/_group_add';

/**
 * 選択された２つの検索条件間の検索条件を全て、新しい検索グループの中へ移動する。
 * 新しい検索グループは、選択された検索条件の下とする。
 * @param 検索グループID(search_group_id)
 */
export const grouping_finished = (search_group_id: string): void => {

    let search_conditions = document.querySelectorAll('#' + search_group_id + '>.p-search_conditions');
    let move_target: Array<Element> = [];
    let move_flg: boolean = false;
    let insertion_position :string = '';

    search_conditions.forEach(search_condition => {
        let menu = document.querySelector('#' + search_condition.id + '_menu');
        let menu_nav = menu.querySelector("[class^='p-operation_menu__nav']");
        let menu_checkbox = menu.querySelector("[class^='p-operation_menu__grouping_selecter']");

        /*２つのチェックされた検索条件間の検索条件を移動対象とする*/
        if (menu_checkbox['checked'] == true) {
            move_target.push(search_condition);
            move_flg = !move_flg;
            insertion_position = search_condition.id;   //※2回めのtrueの結果のみ最終的に残す。
        } else {
            if (move_flg == true) { move_target.push(search_condition); }
        }

        menu_nav.classList.remove('u-display--none');
        menu_checkbox.classList.add('u-display--none');
        menu_checkbox['checked'] = false;
    });

    group_add(insertion_position,move_target);
}