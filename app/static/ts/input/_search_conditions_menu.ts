/**
 * 検索条件フィールドを追加する。
 * @param
 */
export const search_conditions_menu = (search_group_id: string, search_conditions_id: string): { 'menu': Element, 'menu_list': Element } => {
    /**ulタグ内にliタグを設定して返す。
     * @param ul_tag:対象のulタグエレメント。
     * @param lists:liごとの配列。配列の中は連想配列で各要素を渡す。
     */
    const list_add = (ul_tag: Element, lists: any): Element => {
        lists.forEach(dict => {
            let list_tag = document.createElement('li');
            list_tag.classList.add(dict['class_name']);
            list_tag.setAttribute('onclick', dict['onclick']);
            list_tag.innerHTML = dict['menu'];
            ul_tag.appendChild(list_tag);
        })
        return ul_tag;
    }

    //メニュー
    let menu_tag = document.createElement('div');
    menu_tag.classList.add('p-operation_menu__position--type2');
    menu_tag.id = search_conditions_id + '_menu';

    let nav_tag = document.createElement('nav');
    nav_tag.classList.add('p-operation_menu__nav--type2');
    nav_tag.innerText = '…';
    nav_tag.setAttribute('onclick', 'search_conditions_menu_swich("' + search_conditions_id + '")');
    menu_tag.appendChild(nav_tag);

    //メニュー内のグループ化用チェックボックス
    let check_box_tag = document.createElement('input');
    check_box_tag.type = 'checkbox';
    check_box_tag.classList.add('p-operation_menu__grouping_selecter','u-display--none');
    check_box_tag.setAttribute('onclick', 'grouping_finished("' + search_group_id + '")');
    menu_tag.appendChild(check_box_tag);

    //メニューリスト
    let menu_list_tag = document.createElement('div');
    menu_list_tag.classList.add('p-operation_menu_list__position--type2', 'u-margin--t50');
    menu_list_tag.id = search_conditions_id + '_menu_list'

    let ul_tag = document.createElement('ul');
    ul_tag.classList.add('p-operation_menu__ul', 'u-display--none', 'u-margin--t0');

    let lists = [       //liタグの内容を配列・連想配列で生成
        { 'class_name': 'p-operation_menu__li', 'onclick': 'grouping_start("' + search_conditions_id + '")', 'menu': '検索条件グループ化' },
        { 'class_name': 'p-operation_menu__li', 'onclick': 'search_conditions_delete("' + search_conditions_id + '")', 'menu': '検索条件削除' },
    ];
    menu_list_tag.appendChild(list_add(ul_tag, lists)); //最後にulタグをnavタグへ追加

    return { 'menu': menu_tag, 'menu_list': menu_list_tag };
}