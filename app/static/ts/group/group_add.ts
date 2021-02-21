import {global_num,global_num_add} from '../global/_global';    //グローバル変数

/**
 * 検索条件フィールドを追加する。
 * @param position 追加位置の指定。
 */
export const group_add = (position: number): void => {

    global_num_add('global_num','search_group_count', 1); //検索グループカウントアップ

    //
    let fieldset_tag = document.createElement('fieldset');
    fieldset_tag.className = 'c-search_group';
    fieldset_tag.id = 'search_group_' + global_num['search_group_count'];

    let legend_tag = document.createElement('legend');
    legend_tag.innerHTML = 'グループ'+ global_num['search_group_count'] +'(And結合)';
    fieldset_tag.appendChild(legend_tag);


    //ここに追加。　グループを追加、グループを削除、検索条件を追加、

    //
    let elem;
    if(position == 0){
        elem = document.getElementById("search_conditions_top");
        elem.appendChild(fieldset_tag);
    }else{
        console.log(position);
        elem = document.getElementById ("search_conditions_" + position);
        elem.parentNode.insertBefore(fieldset_tag, elem.nextSibling);
    }
}
