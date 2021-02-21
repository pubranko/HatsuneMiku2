/**検索フィールドを、テキスト、日付の切り替えを行う。
 * @param 変更対象の検索条件id(search_conditions_id)
 * @param 変更後のinputタグのタイプ(option_type)
 */
export const search_field_change = (search_conditions_id: string, option_type: string): void => {
    let search_conditions = document.querySelector("#" + search_conditions_id);
    let input_tag = search_conditions.querySelector("input");

    if (input_tag.type !== option_type) {  //現在のtypeと選択されたオプションのタイプが変更された場合
        if (option_type == 'date') {
            let input_date_from = document.createElement('input');
            input_date_from.type = 'date';
            //input_date_from.name = 'sch_date_from_'+sch_num;
            //input_date_from.className = get_sch_field[0].className;
            input_date_from.value = '';
            let input_date_to = document.createElement('input');
            input_date_to.type = 'date';
            //input_date_to.name = 'sch_date_to_'+sch_num;
            //input_date_to.className = get_sch_field[0].className;
            input_date_to.value = '';
            search_conditions.insertBefore(input_date_to, input_tag.nextSibling);
            search_conditions.insertBefore(input_date_from, input_tag.nextSibling);
            search_conditions.removeChild(input_tag);  //sch_textを削除
        } else if (option_type == 'text') {
            let input_text = document.createElement('input');
            input_text.type = 'text';
            //input_text.name = 'sch_text_'+sch_num;
            //input_text.className = get_sch_field[0].className;
            input_text.value = '';
            search_conditions.insertBefore(input_text, input_tag.nextSibling);
            search_conditions.removeChild(search_conditions.querySelector('input[type="date"]'));  //sch_date_from_を削除
            search_conditions.removeChild(search_conditions.querySelector('input[type="date"]'));  //sch_date_from_を削除
        }
    }
}
