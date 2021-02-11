import * as global from '../global/_global';    //グローバル変数

//import * as input_get from './_input_get';
import {input_get} from './_input_get';
import {input_check} from './_input_check';
import {create_json_form_input} from './_create_json_form_input';
import { query } from './_query';



/**
 * 入力フィールドより検索条件を取得し、検索を実行する。
 * @param search_destination 検索先を指定する（site,twitterなど）。
 */
export const search_main = (search_destination: string): void => {
    let input_list:[] = input_get();

    let error:{} = input_check(input_list);

    if(error['error_flg'] == 'on'){

    }else{
        let search_conditions_json:{} = create_json_form_input(input_list);
        query(search_conditions_json);
    }



}

//let input_data = 

/*
１．inputデータの取得、
    １）search_conditions_topクラスを検索して検索条件全量を取得
    ２）上記の結果を解析し、配列（groupはカッコ、検索条件はjson）にして返す。※f_group_analysis()を参考に。ただ昔はjson使っていない。
    ３）検索条件チェック。空欄はエラー。
    ４）
２．ajaxでクエリーを飛ばす。
３．戻り値を画面へ反映。
*/