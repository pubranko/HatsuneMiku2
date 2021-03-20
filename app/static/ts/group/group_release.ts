import {menu_grouping_control} from '../etc/_menu_grouping_control';

/**検索グループを削除。
 * ただし削除対象の中の検索グループと検索条件は残す。
 * @param search_group_id 削除対象の検索グループid
 */
export const group_release = (search_group_id: string): void => {
    let search_group = document.querySelector("#" + search_group_id);
    let parent = search_group.parentElement;    //親の検索グループ

    let nodes: NodeList = search_group.querySelectorAll(
        '#' + search_group_id + '>.p-search_conditions , #' + search_group_id + '>.c-search_group'
    );
    nodes.forEach(node => {
        search_group.parentNode.insertBefore(node, search_group);
    });
    search_group.parentNode.removeChild(search_group);

    //親の検索グループに対して、グループ内の要素数（検索グループと検索条件の合計）に応じた措置を実施する。
    menu_grouping_control(parent.id);
}