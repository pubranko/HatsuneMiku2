import { global_search_conditions_table } from '../global/_global';    //グローバル変数

/**
 * 検索グループと検索条件より、サーバーへのクエリーに必要な情報を配列として生成する。
 * @param なし
 */
export const input_get = (): Array<any> => {

    let input_lists:Array<any> = [['search_group_1']]; //クエリーを生成するための配列を宣言
    let search_group_check_flg:boolean = true;      //search_group_analysis内に、検索グループが残っている場合はtrue、残っていない場合false
    let analysis_result:Array<any> = [];

    //グループ1の要素から解析。
    while (search_group_check_flg) { //solr_query_listを順に検査し、検索グループが残っていないかチェック
        search_group_check_flg = false;
        for (let i:number = 0; i < input_lists.length; i++) {
            if (toString.call(input_lists[i]) == '[object Array]') {    //input_lists内に配列がある（まだ置き換えられていないグループがある）場合。
                search_group_check_flg = true;
                analysis_result = [];                                     //結果の格納エリアを初期化
                group_analysis(input_lists[i][0], analysis_result);       //グループを解析して、配列にして返す。
                input_lists.splice(i, 1);                                       //グループ部分を配列より除去
                Array.prototype.splice.apply(input_lists, [i, 0].concat(analysis_result)); //除去した部分にを挿入
            }
        }
    }

    return input_lists;
}

/**渡されたグループ名を検索し、グループ内の要素を配列にして返す。
 * 返す配列には、要素がグループであればグループ名、検索条件であれば、そのクエリーを設定する。
 */
function group_analysis(search_group_id: string, analysis_result: Array<any>) {

    analysis_result.push('(');     //リストの末尾にグループの閉じ括弧を追加。

    let legend_tag = document.querySelector('#' + search_group_id + '>legend');
    let conjunction = legend_tag.innerHTML.match(/AND/) == null ? ' OR ' : ' AND ';

    let conditions_or_groups = document.querySelectorAll(
        '#' + search_group_id + '>.p-search_conditions ,' +
        '#' + search_group_id + '>.c-search_group'
    );

    conditions_or_groups.forEach(condition_or_group => {
        if (condition_or_group.classList.contains('p-search_conditions')) {   //検索条件の場合
            let select_tag = condition_or_group.querySelector('select')
            let input_tags: NodeList = condition_or_group.querySelectorAll('input')

            //選択されたfieldに応じた雛形のfield_setを取得　※値渡し
            let field_set: object = {
                'field_set': Object.assign({}, global_search_conditions_table[select_tag['value']]['field_set'])
            };

            if (input_tags[0]['type'] == 'text') {
                //{field_set : {field : フィールド名,range_flg:off,value1:値,}}

                field_set['field_set']['value1'] = input_tags[0]['value'];
                analysis_result.push(field_set);
                analysis_result.push(conjunction); //最後に接続詞（and/or）を追加。

            } else if (input_tags[0]['type'] == 'date') {
                //日付はまだ未実装

                field_set['field_set']['value1'] = input_tags[0]['value'];
                field_set['field_set']['value2'] = input_tags[1]['value'];
                field_set['field_set']['range_flg'] = 'on'

                analysis_result.push(field_set);
                analysis_result.push(conjunction); //最後に接続詞（and/or）を追加。
            }
        } else {    //検索グループの場合、検索グループIDを設定（再度実行させる）
            analysis_result.push([condition_or_group.id], conjunction);
        }
    });

    analysis_result.pop();         //末尾に追加された余計なand/orを削除。
    analysis_result.push(')');     //リストの末尾にグループの閉じ括弧を追加。
}
