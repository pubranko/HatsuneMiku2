/**
 * 指定された検索グループ直下の検索条件に対して、グループ化を行うための準備を行う。
 * 検索条件メニューをチェックボックスにする。指定された検索条件はチェック済みにする。
 * @param 検索グループID(search_group_id)
 * @param 検索条件ID(search_conditions_id)
 */
export const grouping_start = (search_group_id: string, search_conditions_id: string): void => {

    let search_conditions = document.querySelectorAll('#' + search_group_id + '>.p-search_conditions');

    search_conditions.forEach(search_condition => {
        let menu = document.querySelector('#' + search_condition.id + '_menu');
        let menu_nav = menu.querySelector("[class^='p-operation_menu__nav']");
        let menu_checkbox = menu.querySelector("[class^='p-operation_menu__grouping_selecter']");

        menu_checkbox.classList.remove('u-display--none');
        if(search_conditions_id == search_condition.id){
            menu_checkbox['checked'] = true;
        }

        menu_nav.classList.add('u-display--none');
    });
}