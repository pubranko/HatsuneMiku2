import { global_string_edit, } from '../global/_global';    //グローバル変数

/**
 * 指定された検索グループ直下の検索条件に対して、グループ化を行うための準備を行う。
 * 検索条件メニューをチェックボックスにする。指定された検索条件はチェック済みにする。
 * @param 検索条件ID(search_conditions_id)
 */
export const grouping_start = (search_conditions_id: string): void => {

    let select = document.querySelector('#' + search_conditions_id);
    let search_group = select.parentElement

    let conditions_or_groups = document.querySelectorAll('#' + search_group.id + '>.p-search_conditions ,' + '#' + search_group.id + '>.c-search_group');
    global_string_edit('global_grouping_id' ,search_group.id);

    conditions_or_groups.forEach(condition_or_group => {
        let menu = document.querySelector('#' + condition_or_group.id + '_menu');
        let menu_nav = menu.querySelector("[class^='p-operation_menu__nav']");
        let menu_checkbox = menu.querySelector("[class^='p-operation_menu__grouping_selecter']");

        menu_checkbox.classList.remove('u-display--none');
        if(search_conditions_id == condition_or_group.id){
            menu_checkbox['checked'] = true;
        }

        menu_nav.classList.add('u-display--none');
    });

}