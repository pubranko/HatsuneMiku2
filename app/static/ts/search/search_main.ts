import {input_get} from './_input_get';
import {input_check} from './_input_check';
import {create_json_form_input} from './_create_json_form_input';
import { query } from './_query';

/**
 * 入力フィールドより検索条件を取得し、検索を実行する。
 * @param search_destination 検索先を指定する(news_clip,twitterなど)。
 */
export const search_main = (search_destination: string): void => {
    let input_list:any[] = input_get();

    let error:{} = input_check(input_list);

    if(error['error_flg']){

    }else{
        let search_conditions_json:{} = create_json_form_input(input_list);
        query(search_conditions_json);
    }
}