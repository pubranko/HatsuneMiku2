import * as global from '../global/_global';    //グローバル変数

/**
 * 検索条件フィールドを追加する。
 * @param position 追加位置の指定。
 */
export const input_form_add = (position: number): void => {
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
            option_tag.setAttribute('onclick', 'input_form_change(' + global.global_num['search_conditions_count'] + ',' + dict['op_num'] + ')');
            select_tag.appendChild(option_tag);
        })
        return select_tag;
    }

    global.add('global_num', 'search_conditions_count', 1); //検索条件カウントアップ

    //divタグを作成し、条件フィールドと条件追加ボタンを中に設定する。
    let div_tag = document.createElement('div');
    div_tag.className = 'search_conditions';
    div_tag.id = 'search_conditions_' + global.global_num['search_conditions_count'];

    //selectタグを作成。またその中にoptionタグを追加していく。
    let select_tag = document.createElement('select');
    select_tag.name = 'Filed';

    //optionタグの内容を配列・連想配列で生成
    let lists = [
        { 'op_num': 0, 'op_case': '件名or本文', 'selected': true },
        { 'op_num': 1, 'op_case': '件名' },
        { 'op_num': 2, 'op_case': '本文' },
        { 'op_num': 3, 'op_case': '記事公開日' },
        { 'op_num': 4, 'op_case': '発行者' },
    ];
    div_tag.appendChild(option_add(select_tag, lists)); //最後にselectタグをdivタグへ追加

    //inputタグ（検索条件入力フィールド）を作成し、divタグへ追加
    let input_tag_text = document.createElement('input');
    input_tag_text.type = 'text';
    input_tag_text.value = '';
    div_tag.appendChild(input_tag_text);

    //inputタグ（チェックボックス）を作成し、divタグへ追加
    let input_tag_checkbox = document.createElement('input');
    input_tag_checkbox.type = 'checkbox';
    input_tag_checkbox.value = 'not_search';
    div_tag.appendChild(input_tag_checkbox);
    let not_tag = document.createTextNode('not(まだ未実装) ');
    div_tag.appendChild(not_tag);

    //inputタグ（条件削除ボタン）を作成し、divタグへ追加
    let input_tag_button_del = document.createElement('input');
    input_tag_button_del.type = 'button';
    input_tag_button_del.value = '条件削除';
    input_tag_button_del.setAttribute('onclick', 'input_form_delete(' + global.global_num['search_conditions_count'] + ')');
    div_tag.appendChild(input_tag_button_del);

    //inputタグ（条件追加ボタン）を作成し、divタグへ追加
    let input_tag_button_add = document.createElement('input');
    input_tag_button_add.type = 'button';
    input_tag_button_add.value = '条件追加↓';
    input_tag_button_add.setAttribute('onclick', 'input_form_add(' + global.global_num['search_conditions_count'] + ')');
    div_tag.appendChild(input_tag_button_add);

    //押下された条件追加ボタンを取得し、その次に新なフィールド(divタグ)を追加。

    let elem;
    if(position == 0){
        elem = document.getElementById("search_group_1");
        elem.appendChild(div_tag);
    }else{
        console.log(position);
        elem = document.getElementById ("search_conditions_" + position);
        elem.parentNode.insertBefore(div_tag, elem.nextSibling);
    }
}
