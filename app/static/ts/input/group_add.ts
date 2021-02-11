import * as global from '../global/_global';    //グローバル変数

/**
 * 検索条件フィールドを追加する。
 * @param position 追加位置の指定。
 */
export const group_add = (position: number): void => {

    global.add('global_num','search_group_count', 1); //検索グループカウントアップ

    //
    let div_tag = document.createElement('div');
    div_tag.className = 'search_group';
    div_tag.id = 'search_group_' + global.global_num['search_group_count'];

    let a_tag = document.createElement('a');
    a_tag.text = 'And';
    div_tag.appendChild(a_tag);


    //
    let elem;
    if(position == 0){
        elem = document.getElementById("search_conditions_top");
        elem.appendChild(div_tag);
    }else{
        console.log(position);
        elem = document.getElementById ("search_conditions_" + position);
        elem.parentNode.insertBefore(div_tag, elem.nextSibling);
    }
}
