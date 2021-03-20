import { global_runing_events } from '../global/_global';    //グローバル変数

/**
 * 指定されたメニューの表示/非表示の切り替えを行う。。
 * @param selected_id 対象のID(検索条件IDまたは0検索グループID)
 */
export const menu_swich = (selected_id: string): void => {

    let menu_list = document.querySelector('#' + selected_id + '_menu_list');
    let menu_list_ul = menu_list.querySelector("[class^='p-operation_menu__ul']");

    //実行中のメニューは非表示にしないよう実行中イベントへ登録
    global_runing_events.push(menu_list_ul.id);

    if (menu_list_ul.classList.contains('u-display--none')) {
        menu_list_ul.classList.remove('u-display--none');
    } else {
        menu_list_ul.classList.add('u-display--none');
    }
}