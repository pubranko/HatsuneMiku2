/**
 * 検索グループと検索条件を解析した結果より、サーバーのAPIへ送信するJSONを生成する。
 * @param input_list 検索グループをカッコ、検索条件をjsonへまとめてある配列
 */
export const create_json_form_input = (input_list:Array<any>): {} => {
    let json_data = {
        'search_conditions':input_list,
        'page_number': 1,
        'details_number': 10,
    }
    return json_data;
}
