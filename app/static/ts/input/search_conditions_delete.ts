/**検索条件を削除。
 * @param 削除対象の検索条件id(search_conditions_id)
 */
export const search_conditions_delete = (search_conditions_id: string): void => {
    let search_conditions = document.querySelector("#" + search_conditions_id);
    search_conditions.parentNode.removeChild(search_conditions);
}