/**
 * 検索条件フィールドを追加する。
 * @param 選択対象の検索条件id(search_conditions_id)
 * @param on/offの切り替え(swich)

 */
export const grouping_select = (grouing_select_id: string, swich: string): void => {
    let grouing_select = document.querySelector("#" + grouing_select_id);
    let class_list =grouing_select.classList;

    if (swich == 'on') {
        class_list.remove('p-search_conditions__grouping_select--type1');
        class_list.add('p-search_conditions__grouping_select--type2');
        grouing_select.setAttribute('onclick', 'grouping_select("' + grouing_select_id + '","off")');
    } else {
        class_list.remove('p-search_conditions__grouping_select--type2');
        class_list.add('p-search_conditions__grouping_select--type1');
        grouing_select.setAttribute('onclick', 'grouping_select("' + grouing_select_id + '","on")');
    }
}