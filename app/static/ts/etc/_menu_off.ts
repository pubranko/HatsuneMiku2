import { global_runing_events } from '../global/_global';    //グローバル変数

/**
 * 選択されたメニューリスト以外を全て非表示にする。
 */
export const menu_off = (): void => {
    //メニューリスト全件取得
    let operation_menu = document.querySelectorAll("[class^='p-operation_menu__ul']");

    operation_menu.forEach(menu => {
        //表示中、かつ、処理中のメニューリスト以外は非表示にする。
        if (!menu.classList.contains('u-display--none') && global_runing_events.indexOf(menu.id) < 0) {
            //if()
            menu.classList.add('u-display--none');
        }
    });

    global_runing_events.splice(0);
}

