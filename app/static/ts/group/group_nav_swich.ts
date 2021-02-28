/**
 * グループメニューのON/OFFの切り替えを行う。。
 * @param 選択対象の検索条件id(search_group_id)
 * @param on/offの切り替え(swich)
 */
export const group_nav_swich = (search_group_id: string, swich: string): void => {
    let group = document.querySelector("#" + search_group_id);
    let group_nav = group.querySelector(".c-operation_menu__ul");
    let class_list = group_nav.classList;
    console.log(class_list);

    if (swich == 'on') {
        class_list.remove('u-display--none');
        group_nav.setAttribute('onclick','group_nav_swich("' + search_group_id + '","off")');
    } else {
        class_list.add('u-display--none');
        group_nav.setAttribute('onclick','group_nav_swich("' + search_group_id + '","on")');
    }
}