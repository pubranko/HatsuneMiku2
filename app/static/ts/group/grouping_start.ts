import { global_string_edit, } from '../global/_global';    //グローバル変数
import {menu_grouping_control} from '../etc/_menu_grouping_control';

/**
 * 選択されたID(検索条件または検索グループ)に対して、グループ化を行うため以下のの準備を行う。
 * 1.メニューボタンをチェックボックスにする。
 * 2.選択されたIDはチェック済みにする。
 * @param selected_id 選択されたID。検索条件IDまたは検索グループIDのを設定する。
 */
export const grouping_start = (selected_id: string): void => {

    //選択されたIDの親要素（検索グループ）を取得
    let select = document.querySelector('#' + selected_id);
    let search_group = select.parentElement;
    //グループ化を実行中であることをグローバル変数へ記録
    global_string_edit('global_grouping_id' ,search_group.id);

    //選択されたIDと同じ階層の要素(検索条件、検索グループ)を取得する。
    let conditions_or_groups = search_group.querySelectorAll(
        '#' + search_group.id + '>.p-search_conditions ,' +
        '#' + search_group.id + '>.c-search_group'
    );
    //上記の要素内のメニューのnavボタンを表示をチェックボックスに切り替える。
    conditions_or_groups.forEach(condition_or_group => {
        let menu = condition_or_group.querySelector('#' + condition_or_group.id + '_menu');
        let menu_nav = menu.querySelector("[class^='p-operation_menu__nav']");
        let menu_checkbox = menu.querySelector("[class^='p-operation_menu__grouping_selecter']");
        menu_checkbox.classList.remove('u-display--none');
        if(selected_id == condition_or_group.id){
            menu_checkbox['checked'] = true;
        }
        menu_nav.classList.add('u-display--none');
    });
}