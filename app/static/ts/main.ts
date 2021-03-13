/*
外部モジュールメソッドのグローバル化
*/
import * as test from './_test';
import { init_screen } from './etc/_init_screen';
import { menu_off } from './etc/_menu_off';
import { search_conditions_add } from './input/search_conditions_add';
import { search_field_change } from './input/search_field_change';
import { search_conditions_delete } from './input/search_conditions_delete';
import { search_conditions_menu_swich } from './input/search_conditions_menu_swich';
import { group_menu_swich } from './group/group_menu_swich';
import { grouping_start } from './group/grouping_start';
import { grouping_finished } from './group/grouping_finished';
import { group_release } from './group/group_release';
import { search_main } from './search/search_main';
//import * as global from './global/_global';

export interface Window {
    test1(): void;
    test2(): void;
    test3(): void;
    search_conditions_add(group_id: string): void;
    search_field_change(search_conditions_id: string, option_type: string): void;
    search_conditions_delete(search_conditions_id: string): void;
    search_conditions_menu_swich(search_conditions_id: string): void
    group_menu_swich(search_group_id: string): void
    grouping_start(search_conditions_id: string): void
    grouping_finished(): void
    group_release(search_group_id: string): void;
    search_main(search_destination: string): void;
    addEventListener(event: string, func: any): void;
}
declare let window: Window;
window.test1 = () => { test.test1(); };
window.test2 = () => { test.test2(); };
window.test3 = () => { test.test3(); };
window.search_main = (search_destination) => { search_main(search_destination) }
window.search_conditions_add = (group_id) => { search_conditions_add(group_id); };    //初回検索条件フィールド追加
window.search_field_change = (search_conditions_id, option_type) => { search_field_change(search_conditions_id, option_type); };
window.search_conditions_delete = (search_conditions_id) => { search_conditions_delete(search_conditions_id); };
window.search_conditions_menu_swich = (search_conditions_id) => { search_conditions_menu_swich(search_conditions_id); };
window.group_menu_swich = (search_group_id) => { group_menu_swich(search_group_id); };
window.grouping_start = (search_conditions_id) => { grouping_start(search_conditions_id); };
window.grouping_finished = () => { grouping_finished(); };
window.group_release = (search_group_id) => { group_release(search_group_id); };


//初画面表示
init_screen();

//クリックイベントの終了処理
window.addEventListener("click", (e) => {
    menu_off();
});