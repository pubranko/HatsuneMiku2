import { global_runing_events } from '../global/_global';    //グローバル変数

/**
 * 検索条件メニューの表示/非表示の切り替えを行う。
 * @param 選択対象の検索条件id(search_conditions_id)
 */
export const search_conditions_menu_swich = (search_conditions_id: string): void => {

    let menu_list = document.querySelector('#' + search_conditions_id + '_menu_list');
    let menu_list_ul = menu_list.querySelector('.p-operation_menu__ul');

    //実行中のメニューは非表示にしないよう実行中イベントへ登録
    global_runing_events.push(menu_list_ul.id);

    if (menu_list_ul.classList.contains('u-display--none')) {
        menu_list_ul.classList.remove('u-display--none');
    } else {
        menu_list_ul.classList.add('u-display--none');
    }
}