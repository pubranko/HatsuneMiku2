import { global_string_edit, } from '../global/_global';    //グローバル変数
import {menu_grouping_control} from '../etc/_menu_grouping_control';

/**
 * 選択されたID(検索条件または検索グループ)に対して、グループ化を行うための準備を行う。
 * メニューボタンをチェックボックスにする。選択されたIDはチェック済みにする。
 * @param 選択されたID(selected_id)
 */
export const grouping_start = (selected_id: string): void => {

    let select = document.querySelector('#' + selected_id);
    let search_group = select.parentElement;

    global_string_edit('global_grouping_id' ,search_group.id);

    let conditions_or_groups = document.querySelectorAll(
        '#' + search_group.id + '>.p-search_conditions ,' +
        '#' + search_group.id + '>.c-search_group'
    );
    conditions_or_groups.forEach(condition_or_group => {
        let menu = document.querySelector('#' + condition_or_group.id + '_menu');
        let menu_nav = menu.querySelector("[class^='p-operation_menu__nav']");
        let menu_checkbox = menu.querySelector("[class^='p-operation_menu__grouping_selecter']");

        menu_checkbox.classList.remove('u-display--none');
        if(selected_id == condition_or_group.id){
            menu_checkbox['checked'] = true;
        }

        menu_nav.classList.add('u-display--none');
    });

    menu_grouping_control(search_group.id);

}