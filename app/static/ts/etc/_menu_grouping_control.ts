/**
 * 各検索グループ内で要素(検索条件と検索グループ)の数が３を超えた場合にのみグループ化のメニューを表示する。
 * 要素が３未満の場合はグループメニューより検索条件グループ化のメニューを非表示にする。
 * @param コントロールしたい検索グループID(search_group_id)
 */
export const menu_grouping_control = (search_group_id: string): void => {

    let search_group = document.querySelector('#' + search_group_id);
    let conditions_or_groups = document.querySelectorAll(
        '#' + search_group.id + '>.p-search_conditions ,' +
        '#' + search_group.id + '>.c-search_group'
    );

    conditions_or_groups.forEach(condition_or_group => {
        let menu_list = document.querySelector('#' + condition_or_group.id + '_menu_list .p-operation_menu__li--DOM__type1');
        console.log(menu_list.classList.contains('u-display--none'));
        if (conditions_or_groups.length < 3) {
            menu_list.classList.add('u-display--none');
        } else {
            menu_list.classList.remove('u-display--none');
        }
    });
}