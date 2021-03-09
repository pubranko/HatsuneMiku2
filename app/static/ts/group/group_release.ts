/**検索グループを削除。
 * ただし削除対象の中の検索グループと検索条件は残す。
 * @param 削除対象の検索グループid(search_group_id)
 */
export const group_release = (search_group_id: string): void => {
    let search_group = document.querySelector("#" + search_group_id);
    let nodes: NodeList = document.querySelectorAll(
        '#' + search_group_id + '>.p-search_conditions , #' + search_group_id + '>.c-search_group'
    );
    nodes.forEach(node => {
        search_group.parentNode.insertBefore(node, search_group);
    });
    search_group.parentNode.removeChild(search_group);
}