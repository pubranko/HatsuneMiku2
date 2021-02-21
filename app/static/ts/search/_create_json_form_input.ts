/**
 * @param 
 * @param 
 */
export const create_json_form_input = (input_list:Array<any>): {} => {

    let json_data = {
        'search_conditions':input_list,
        'page_number': 1,
        'details_number': 10,
    }
    return json_data;
}
