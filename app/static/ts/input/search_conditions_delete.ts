import {menu_grouping_control} from '../etc/_menu_grouping_control';

/**検索条件を削除。
 * @param search_conditions_id 削除対象の検索条件id
 */
export const search_conditions_delete = (search_conditions_id: string): void => {
    let search_conditions = document.querySelector("#" + search_conditions_id);
    let search_group = search_conditions.parentElement;
    search_conditions.remove();
    //グループ内の要素数（検索グループと検索条件の合計）に応じた措置を実施する。
    menu_grouping_control(search_group.id);
}