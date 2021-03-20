/*
外部モジュールメソッドのグローバル化
*/
import { init_screen } from './etc/_init_screen';
import { menu_off } from './etc/_menu_off';
import { menu_swich } from './etc/menu_swich';
import { search_main } from './search/search_main';
import { search_conditions_add } from './input/search_conditions_add';
import { search_field_change } from './input/search_field_change';
import { search_conditions_delete } from './input/search_conditions_delete';
import { grouping_start } from './group/grouping_start';
import { grouping_finished } from './group/grouping_finished';
import { group_conjunction_change } from './group/group_conjunction_change';
import { group_release } from './group/group_release';

export interface Window {
    search_main(search_destination: string): void;
    search_conditions_add(group_id: string): void;
    search_field_change(search_conditions_id: string, option_type: string): void;
    search_conditions_delete(search_conditions_id: string): void;

    grouping_start(selected_id: string): void
    grouping_finished(): void
    group_conjunction_change(search_group_id: string): void;
    group_release(search_group_id: string): void;

    menu_swich(search_conditions_id: string): void
    addEventListener(event: string, func: any): void;
}
declare let window: Window;
window.search_main = (search_destination) => { search_main(search_destination) }
window.search_conditions_add = (group_id) => { search_conditions_add(group_id); };    //初回検索条件フィールド追加
window.search_field_change = (search_conditions_id, option_type) => { search_field_change(search_conditions_id, option_type); };
window.search_conditions_delete = (search_conditions_id) => { search_conditions_delete(search_conditions_id); };

window.grouping_start = (selected_id) => { grouping_start(selected_id); };
window.grouping_finished = () => { grouping_finished(); };
window.group_conjunction_change = (search_group_id) => { group_conjunction_change(search_group_id); };
window.group_release = (search_group_id) => { group_release(search_group_id); };

window.menu_swich = (search_group_id) => { menu_swich(search_group_id); };

//初画面表示
init_screen();

//クリックイベントの終了処理
window.addEventListener("click", (e) => {
    menu_off();
});