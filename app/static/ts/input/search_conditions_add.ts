import { global_num, global_num_add, global_search_conditions_table, global_runing_events, } from '../global/_global';    //グローバル変数
import { menu_create, } from '../etc/_menu_create';
import { menu_grouping_control } from '../etc/_menu_grouping_control';

/**
 * 検索条件フィールドを追加する。
 * @param search_group_id 検索条件を追加するグループID。
 */
export const search_conditions_add = (search_group_id: string): void => {
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
                'search_field_change("search_conditions_' + global_num['search_conditions_count'] + '","' +
                global_search_conditions_table[dict['op_num']]['type'] +
                '")');
            select_tag.appendChild(option_tag);
        })
        return select_tag;
    }

    global_num_add('global_num', 'search_conditions_count', 1); //検索条件カウントアップ
    let search_conditions_id = 'search_conditions_' + global_num['search_conditions_count'];   //今回作成される検索条件ID

    //検索条件ボックス
    let search_conditions_tag = document.createElement('div');
    search_conditions_tag.id = search_conditions_id;
    search_conditions_tag.classList.add('p-search_conditions');

    //selectタグを作成。またその中にoptionタグを追加していく。
    let select_tag = document.createElement('select');
    select_tag.classList.add('p-search_conditions__field_select');
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
    input_tag_text.classList.add('p-search_conditions__search_text');
    input_tag_text.type = 'text';
    input_tag_text.value = '';
    search_conditions_tag.appendChild(input_tag_text);

    //検索条件メニューボタン：検索条件ボックスへ追加
    let menu_class: string[] = ['p-operation_menu__position--type2'];
    let nav_class: string[] = ['p-operation_menu__nav--type2'];
    let grouping_check_box_class: string[] = ['p-operation_menu__grouping_selecter', 'u-display--none'];
    let menu_list_box_class: string[] = ['p-operation_menu_list__position--type2', 'u-margin--t50'];
    let menu_lists_class: string[] = ['p-operation_menu__ul', 'u-display--none', 'u-margin--t0'];
    let menu_list_line: Array<object> = [
        { 'class_name': ['p-operation_menu__li--DOM__type1'], 'onclick': 'grouping_start("' + search_conditions_id + '")', 'menu': '検索条件グループ化' },
        { 'class_name': ['p-operation_menu__li'], 'onclick': 'search_conditions_delete("' + search_conditions_id + '")', 'menu': '検索条件削除' },
    ];

    let search_conditions_menu_tag = menu_create(
        search_group_id, search_conditions_id, menu_class, nav_class, grouping_check_box_class,
        menu_list_box_class, menu_lists_class, menu_list_line,
    );
    search_conditions_tag.appendChild(search_conditions_menu_tag.menu);
    search_conditions_tag.appendChild(search_conditions_menu_tag.menu_list);

    //検索条件を追加したい検索グループを取得し、検索条件を追加。
    let elem = document.querySelector('#' + search_group_id);
    elem.appendChild(search_conditions_tag);

    //実行中のメニューは非表示にしないよう実行中イベントへ登録
    let menu_list_ul = elem.querySelector('#' + search_group_id + '_ul');
    global_runing_events.push(menu_list_ul.id);
    //グループ内の要素数（検索グループと検索条件の合計）に応じた措置を実施する。
    menu_grouping_control(search_group_id);
}
/*検索条件のイメージ
    <div id="search_conditions_1" class="p-search_conditions">
        <select class="p-search_conditions__field_select">
            <option value="0" onclick="search_field_change(&quot;search_conditions_1&quot;,&quot;text&quot;)">件名or本文</option>
            <option value="1" onclick="search_field_change(&quot;search_conditions_1&quot;,&quot;text&quot;)">件名</option>
            <option value="2" onclick="search_field_change(&quot;search_conditions_1&quot;,&quot;text&quot;)">本文</option>
            <option value="3" onclick="search_field_change(&quot;search_conditions_1&quot;,&quot;date&quot;)">記事公開日</option>
            <option value="4" onclick="search_field_change(&quot;search_conditions_1&quot;,&quot;text&quot;)">発行者</option>
        </select>
        <input class="p-search_conditions__search_text" type="text">
        <div class="p-operation_menu__position--type2" id="search_conditions_1_menu">
            <nav class="p-operation_menu__nav--type2" onclick="search_conditions_menu_swich(&quot;search_conditions_1&quot;)">…</nav>
            <input type="checkbox" class="p-operation_menu__grouping_selecter u-display--none" onclick="grouping_finished(&quot;search_group_1&quot;)">
        </div>
        <div class="p-operation_menu_list__position--type2 u-margin--t50" id="search_conditions_1_menu_list">
            <ul class="p-operation_menu__ul u-display--none u-margin--t0" id="search_conditions_1_ul">
                <li class="p-operation_menu__li--DOM__type1 u-display--none" onclick="grouping_start(&quot;search_conditions_1&quot;)">検索条件グループ化</li>
                <li class="p-operation_menu__li" onclick="search_conditions_delete(&quot;search_conditions_1&quot;)">検索条件削除</li>
            </ul>
        </div>
    </div>
*/