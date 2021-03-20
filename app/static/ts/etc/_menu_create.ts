/**
 * 渡された引数をもとにメニューを作成してメインへ返す。
 * @param search_group_id : 作成するメニューが所属している検索グループID
 * @param parent_node_id : 作成するメニュを追加する要素のID(検索条件IDまたは検索グループID)
 * @param menu_class : メニューのdivタグへ追加するクラス
 * @param nav_class : メニュー内のnavタグへ追加するクラス
 * @param grouping_check_box_class : メニュー内のcheck_boxへ追加するクラス
 * @param menu_list_box_class : メニューリストのdivタグへ追加するクラス
 * @param menu_lists_class : メニューリスト内のulタグへ追加するクラス
 * @param menu_list_line : メニューリスト内のliタグへ追加するクラス
 * @returns menu => メニューボタンの要素、menu_list => メニューボタンを押した後表示されるリスト
 */
export const menu_create = (
    search_group_id: string,
    parent_node_id: string,
    menu_class: string[],
    nav_class: string[],
    grouping_check_box_class: string[],
    menu_list_box_class: string[],
    menu_lists_class: string[],
    menu_list_line: Array<object>,
): {
    'menu': Element,
    'menu_list': Element
} => {

    /**ulタグ内にliタグを設定して返す。
     * @param ul_tag:対象のulタグエレメント。
     * @param lists:liごとの配列。配列の中は連想配列で各要素を渡す。
     */
    const line_add = (ul_tag: Element, lists: any): Element => {
        lists.forEach(dict => {
            let list_tag = document.createElement('li');
            list_tag.classList.add(...dict['class_name']);
            list_tag.setAttribute('onclick', dict['onclick']);
            list_tag.innerHTML = dict['menu'];
            ul_tag.appendChild(list_tag);
        })
        return ul_tag;
    }

    //メニューの作成
    let menu = document.createElement('div');
    menu.classList.add(...menu_class);
    menu.id = parent_node_id + '_menu';
    let nav = document.createElement('nav');
    nav.classList.add(...nav_class);
    nav.innerText = '…';
    nav.setAttribute('onclick', 'menu_swich("' + parent_node_id + '")');
    menu.appendChild(nav);

    //メニュー内のグループ化用チェックボックス
    let grouping_check_box = document.createElement('input');
    grouping_check_box.type = 'checkbox';
    grouping_check_box.classList.add(...grouping_check_box_class);
    grouping_check_box.setAttribute('onclick', 'grouping_finished("' + search_group_id + '")');
    menu.appendChild(grouping_check_box);

    //メニューリストの作成
    let menu_list_box = document.createElement('div');
    menu_list_box.classList.add(...menu_list_box_class);
    menu_list_box.id = parent_node_id + '_menu_list'
    let menu_lists = document.createElement('ul');
    menu_lists.classList.add(...menu_lists_class);
    menu_lists.id = parent_node_id + '_ul';
    menu_list_box.appendChild(line_add(menu_lists, menu_list_line));

    return { 'menu': menu, 'menu_list': menu_list_box };
}