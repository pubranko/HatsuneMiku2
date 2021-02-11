import * as global from '../global/_global';    //グローバル変数

/**
 * @param 
 * @param 
 */
export const create_json_form_input = (input_list:[]): {} => {



    //テスト用のサンプルデータ
    let json_data = {
        'search_conditions': [
            '(',
            //{'field' : 'title', 'range_flg':'off', 'value1':'中国'},
            {'field' : 'article', 'range_flg':'off', 'value1':'安倍'},
            ')'
        ],
        'page_number': 1,
        'details_number': 10,
    }

    return json_data;
}
