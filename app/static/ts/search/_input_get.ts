import {global_search_conditions_table} from '../global/_global';    //グローバル変数

/**
 * @param
 * @param
 */
export const input_get = (): Array<any> => {

    let elems = document.getElementById('search_conditions_top');    //検索条件全体を取得
    let grp_check_flg = true;
    let x = 0;

    //クエリーを生成するための配列を宣言
    let input_lists = [['search_group_1']];
    let grp_analysis = [];

    //グループ1の要素から解析。
    while (grp_check_flg) {
        //solr_query_listを順に検査し、group_*の有無をチェックする。
        grp_check_flg = false;
        for (let i = 0; i < input_lists.length; i++) {
            if (toString.call(input_lists[i]) == '[object Array]') {    //input_lists内に配列がある（まだ置き換えられていないグループがある）場合。
                grp_check_flg = true;
                grp_analysis = [];                                      //結果の格納エリアを初期化
                group_analysis(input_lists[i][0], grp_analysis);        //グループを解析して、配列にして返す。
                input_lists.splice(i, 1);                               //グループ部分を配列より除去
                Array.prototype.splice.apply(input_lists, [i, 0].concat(grp_analysis)); //除去した部分にを挿入
            }
        }
        /*x++
        if (x >= 10) {
            break;
        }*/
    }
    /*for(let elem of search_group){
        console.log(elem);
    }*/

    //console.log(search_conditions_top);
    console.log(input_lists);
    return input_lists;
}

/**渡されたグループ名を検索し、グループ内の要素を配列にして返す。
 * 返す配列には、要素がグループであればグループ名、検索条件であれば、そのクエリーを設定する。
 */
function group_analysis(grp_name, grp_analysis) {
    let grp_elem:HTMLElement = document.getElementById(grp_name); //引数より渡されたグループ名を検索。(filedsetタグ)
    //console.log(grp_elem);
    //console.log(grp_elem.children);

    let now = new Date();
    let search_field_num:number=0;     //selectタグのoptionで選択されているvalueを保存するワーク。
    let conjunction:string='';    //現在分析中のグループのand/orの接続詞を保存するエリア。

    grp_analysis.push('(');                 //リストの先頭にグループの括弧を追加。
    //for (let elem of grp_elem.children){     //fieldsetの子要素（孫は含まない）を順に処理する。
    for (let i = 0; i < grp_elem.childElementCount; i++) {     //fieldsetの子要素（孫は含まない）を順に処理する。
        let grp_child_elem = grp_elem.children[i];

        if (grp_child_elem['tagName'] == 'LEGEND') {
            //グループのクラス名に、or,andのどちらがあるか確認。
            if (grp_child_elem.innerHTML.indexOf('Or結合', 0) >= 0) {
                conjunction = ' OR ';
            } else if (grp_child_elem.innerHTML.indexOf('And結合', 0) >= 0) {
                conjunction = ' AND ';
            }
        } else if (grp_child_elem['tagName'] == 'DIV') {   //検索条件div
            for (let idx_div_child = 0; idx_div_child < grp_child_elem.childElementCount; idx_div_child++) {
                let div_child_elem = grp_child_elem.children[idx_div_child];


                global_search_conditions_table

                if (div_child_elem['tagName'] == 'SELECT') {
                    search_field_num = div_child_elem['value'];

                } else if (div_child_elem['tagName'] == 'INPUT' && div_child_elem['type'] == 'text') {
                    //{field_set : {field : フィールド名,range_flg:off,value1:値,}}
                    let field_set = {'field_set':global_search_conditions_table[search_field_num]['field_set']};
                    field_set['field_set']['value1'] = div_child_elem['value'];
                    grp_analysis.push(field_set);
                    grp_analysis.push(conjunction); //最後に接続詞（and/or）を追加。

                } else if (div_child_elem['tagName'] == 'INPUT' && div_child_elem['type'] == 'date') {
                    //日付はまだ未実装

                    //publish_date :[2019-01-01T00:00:00Z TO 2019-01-31T23:59:59Z] 範囲指定の仕方
                    var wk_sch_date_from;
                    var wk_sch_date_to;
                    if (search_field_num == 3 && div_child_elem['name'].substring(0, 13) == "sch_date_from") {
                        if (div_child_elem['value'] == "") {
                            wk_sch_date_from = "1990-1-1";
                        } else {
                            wk_sch_date_from = div_child_elem['value'];
                        }
                    } else {
                        if (div_child_elem['value'] == "") {
                            wk_sch_date_to = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
                        } else {
                            wk_sch_date_to = div_child_elem['value'];
                        }
                        grp_analysis.push("publish_date:[" + wk_sch_date_from + "T00:00:00Z TO " + wk_sch_date_to + "T23:59:59Z]");

                        grp_analysis.push(conjunction); //最後に接続詞（and/or）を追加。
                    }
                }
                /*
                }else if(div_child_elem.tagName == 'INPUT' && div_child_elem.type == 'checkbox' && div_child_elem.value == 'not_search'){
                    console.log('a3 '+div_child_elem.tagName+' '+div_child_elem.type+''+div_child_elem.value);
                }else{
                    console.log('a4 '+div_child_elem.tagName+' '+div_child_elem.type);
                }
                */
            }
        } else if (grp_child_elem['tagName'] == 'FIELDSET') {
            grp_analysis.push([grp_child_elem['name']], conjunction);
        }
    }
    grp_analysis.pop();         //末尾に追加された余計なand/orを削除。
    grp_analysis.push(')');     //リストの末尾にグループの閉じ括弧を追加。
    console.log(grp_analysis);
}
