/**
 * 検索条件フィールドを追加する。
 * @param 選択対象の検索条件id(search_conditions_id)
 * @param on/offの切り替え(swich)

 */
export const search_conditions_select = (search_conditions_id: string, swich: string): void => {
    let search_conditions = document.querySelector("#" + search_conditions_id);

    let class_list =search_conditions.classList;
    if (swich == 'on') {
        class_list.remove('c-search_conditions--type1');
        class_list.add('c-search_conditions--type2');
        search_conditions.setAttribute('onclick', 'search_conditions_select("' + search_conditions_id + '","off")');
    } else {
        class_list.remove('c-search_conditions--type2');
        class_list.add('c-search_conditions--type1');
        search_conditions.setAttribute('onclick', 'search_conditions_select("' + search_conditions_id + '","on")');
    }
}