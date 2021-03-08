import {group_add} from '../group/_group_add';

/**
 * 
 * 
 * @param 検索グループID(search_group_id)
 * @param 検索条件ID(search_conditions_id)
 */
export const grouping_finished = (search_group_id: string, search_conditions_id: string): void => {

    let search_conditions = document.querySelectorAll('#' + search_group_id + '>.p-search_conditions');

    search_conditions.forEach(search_condition => {
        let menu = document.querySelector('#' + search_condition.id + '_menu');
        let menu_nav = menu.querySelector("[class^='p-operation_menu__nav']");
        let menu_checkbox = menu.querySelector("[class^='p-operation_menu__grouping_selecter']");

        menu_checkbox.classList.add('u-display--none');
        menu_checkbox['checked'] = false;

        menu_nav.classList.remove('u-display--none');
    });

    group_add(search_conditions_id);

}