/**
 * グループメニューのON/OFFの切り替えを行う。。
 * @param 選択対象の検索条件id(search_group_id)
 * @param on/offの切り替え(swich)
 */
export const group_nav_swich = (search_group_id: string, swich: string): void => {
    let group = document.querySelector('#' + search_group_id);
    let group_nav = group.querySelector('.p-operation_menu__nav');
    let group_ul = document.querySelector('#' + search_group_id + '_menu_list');
    let class_list = group_ul.classList;
    console.log(class_list);

    if (swich == 'on') {
        group_nav.setAttribute('onclick','group_nav_swich("' + search_group_id + '","off")');
        class_list.remove('u-display--none');
    } else {
        group_nav.setAttribute('onclick','group_nav_swich("' + search_group_id + '","on")');
        class_list.add('u-display--none');
    }
}