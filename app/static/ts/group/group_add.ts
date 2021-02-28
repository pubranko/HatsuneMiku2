import {global_num,global_num_add,global_search_conditions_table} from '../global/_global';    //グローバル変数

/**
 * 検索条件フィールドを追加する。
 * @param insertion_position 追加位置の指定。初期表示時はfirst。それ以外は検索条件id(search_conditions_id)を指定する。
 */
export const group_add = (insertion_position:string): void => {
    /**ulタグ内にliタグを設定して返す。
     * @param ul_tag:対象のulタグエレメント。
     * @param lists:liごとの配列。配列の中は連想配列で各要素を渡す。
     */
    const list_add = (ul_tag: Element, lists: any): Element => {
        lists.forEach(dict => {
            let list_tag = document.createElement('li');
            list_tag.className = dict['class_name'];
            list_tag.setAttribute('onclick',dict['onclick']);
            list_tag.innerHTML = dict['menu'];
            ul_tag.appendChild(list_tag);
        })
        return ul_tag;
    }

    global_num_add('global_num','search_group_count', 1); //検索グループカウントアップ
    let search_group_id = 'search_group_' + global_num['search_group_count'];   //今回作成されるグループの検索グループID

    let fieldset_tag = document.createElement('fieldset');
    fieldset_tag.className = 'c-search_group';
    fieldset_tag.id = search_group_id;

    let legend_tag = document.createElement('legend');
    legend_tag.innerHTML = search_group_id +'(And結合)';
    fieldset_tag.appendChild(legend_tag);

    //グループメニュー
    let div_tag = document.createElement('div');
    div_tag.className = 'c-operation_menu__postion u-margin--t-150';
    //div_tag.id = search_group_id;

    let nav_tag = document.createElement('nav');
    nav_tag.className = 'c-operation_menu__nav u-margin--l80';
    nav_tag.innerText = '…';
    nav_tag.setAttribute('onclick','group_nav_swich("' + search_group_id + '","on")');
    div_tag.appendChild(nav_tag); //最後にulタグをnavタグへ追加

    let ul_tag = document.createElement('ul');
    ul_tag.className = 'c-operation_menu__ul u-display--none u-margin--tb30';

    let lists = [       //liタグの内容を配列・連想配列で生成
        { 'class_name': 'c-operation_menu__li', 'onclick': 'search_conditions_add("'+search_group_id+'")','menu': '検索条件追加'},
        { 'class_name': 'c-operation_menu__li', 'onclick': 'grouping_conditons_change("'+search_group_id+'")','menu': 'AND/OR切り替え' },
        //{ 'class_name': 'c-operation_menu__li', 'onclick': 'grouping_start("'+search_group_id+'")','menu': '検索条件をグループ化' },
        { 'class_name': 'c-operation_menu__li', 'onclick': 'group_release("'+search_group_id+'")','menu': 'グループ解除' },
    ];
    div_tag.appendChild(list_add(ul_tag, lists)); //最後にulタグをnavタグへ追加

    //div_tag.appendChild(nav_tag);
    fieldset_tag.appendChild(div_tag);

    let elem;
    if(insertion_position == 'first'){
        elem = document.getElementById("search_conditions_top");
        elem.appendChild(fieldset_tag);
    }else{
        elem = document.getElementById (insertion_position);
        elem.parentNode.insertBefore(fieldset_tag, elem.nextSibling);
    }
}