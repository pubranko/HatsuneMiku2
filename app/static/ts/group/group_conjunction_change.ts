/**
 * 検索グループ内のAND/ORの接続詞(conjunction)を切り替える。
 * @param search_group_id 選択対象の検索グループID
 */
export const group_conjunction_change = (search_group_id: string): void => {

    let legend_tag = document.querySelector('#' + search_group_id + '>legend');
    if(legend_tag.innerHTML.match(/AND/) == null){
        legend_tag.innerHTML = legend_tag.innerHTML.replace(/OR/,'AND');
    }else{
        legend_tag.innerHTML = legend_tag.innerHTML.replace(/AND/,'OR');
    }
}