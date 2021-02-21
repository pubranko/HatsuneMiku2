import { global_num, global_num_add, global_search_conditions_table, } from '../global/_global';    //グローバル変数

/**
 * 検索条件フィールドを追加する。
 * @param position 追加位置の指定。
 */
export const search_conditions_add = (position: number): void => {
    /**selectタグ内のoptionタグを設定して返す。
     * @param select_tag:渡されたselectタグに対してoptionタグを埋め込む
     * @param lists:optionごとの配列。配列の中は連想配列で各要素を渡す。
     */
    const option_add = (select_tag: Element, lists: any): Element => {
        lists.forEach(dict => {
            let option_tag = document.createElement('option');
            option_tag.value = dict['op_num'];
            if ('selected' in dict) {
                option_tag.selected = true;
            }
            option_tag.innerHTML = dict['op_case'];
            option_tag.setAttribute(
                'onclick',
                'search_field_change("search_conditions_' + global_num['search_conditions_count'] + '"' +
                ',"' +
                global_search_conditions_table[dict['op_num']]['type'] +
                '")');
            select_tag.appendChild(option_tag);
        })
        return select_tag;
    }

    global_num_add('global_num', 'search_conditions_count', 1); //検索条件カウントアップ

    //検索条件ボックス
    let search_conditions_tag = document.createElement('div');
    search_conditions_tag.id = 'search_conditions_' + global_num['search_conditions_count'];
    search_conditions_tag.className = 'p-search_conditions';
    // search_conditions_tag.setAttribute(
    //     'onclick',
    //     'search_conditions_select("search_conditions_' + global_num['search_conditions_count'] + '","on")');

    //グループ化ボタン用divタグ
    let grouping_select_tag = document.createElement('div');
    grouping_select_tag.id = 'grouping_select_' + global_num['search_conditions_count'];
    grouping_select_tag.className = 'p-search_conditions__grouping_select--type1';
    grouping_select_tag.setAttribute(
        'onclick',
        'grouping_select("grouping_select_' + global_num['search_conditions_count'] + '","on")');
    grouping_select_tag.textContent = 'Grp化選択';
    search_conditions_tag.appendChild(grouping_select_tag);

    //selectタグを作成。またその中にoptionタグを追加していく。
    let select_tag = document.createElement('select');
    select_tag.className = 'p-search_conditions__field_select';
    select_tag.name = 'Filed';
    let lists = [       //optionタグの内容を配列・連想配列で生成
        { 'op_num': 0, 'op_case': '件名or本文', 'selected': true },
        { 'op_num': 1, 'op_case': '件名' },
        { 'op_num': 2, 'op_case': '本文' },
        { 'op_num': 3, 'op_case': '記事公開日' },
        { 'op_num': 4, 'op_case': '発行者' },
    ];
    search_conditions_tag.appendChild(option_add(select_tag, lists)); //最後にselectタグをdivタグへ追加

    //検索条件入力フィールド：検索条件ボックスへ追加
    let input_tag_text = document.createElement('input');
    input_tag_text.className = 'p-search_conditions__search_text';
    input_tag_text.type = 'text';
    input_tag_text.value = '';
    search_conditions_tag.appendChild(input_tag_text);

    //条件削除ボタンを作成し、：検索条件ボックスへ追加
    let input_tag_button_del = document.createElement('input');
    input_tag_button_del.type = 'button';
    input_tag_button_del.className = 'p-search_conditions__delete';
    input_tag_button_del.value = '条件削除';
    input_tag_button_del.setAttribute('onclick', 'search_conditions_delete("search_conditions_' + global_num['search_conditions_count'] + '")');
    search_conditions_tag.appendChild(input_tag_button_del);

    //条件追加ボタンを作成し、：検索条件ボックスへ追加
    let input_tag_button_add = document.createElement('input');
    input_tag_button_add.className = 'p-search_conditions__add';
    input_tag_button_add.type = 'button';
    input_tag_button_add.value = '条件追加↓';
    input_tag_button_add.setAttribute('onclick', 'search_conditions_add(' + global_num['search_conditions_count'] + ')');
    search_conditions_tag.appendChild(input_tag_button_add);

    //押下された条件追加ボタンを取得し、その次に新なフィールド(divタグ)を追加。
    let elem;
    if (position == 0) {
        elem = document.getElementById("search_group_1");
        elem.appendChild(search_conditions_tag);
    } else {
        console.log(position);
        elem = document.getElementById("search_conditions_" + position);
        elem.parentNode.insertBefore(search_conditions_tag, elem.nextSibling);
    }
}
