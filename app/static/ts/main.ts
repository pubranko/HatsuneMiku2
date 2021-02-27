/*
外部モジュールメソッドのグローバル化
*/
import * as test from './_test';
import {init_screen} from './etc/_init_screen';
import {search_conditions_add} from './input/search_conditions_add';
import {search_field_change} from './input/search_field_change';
import {search_conditions_delete} from './input/search_conditions_delete';
//import {search_conditions_select} from './input/search_conditions_select';
import {grouping_select} from './group/grouping_select';
import {search_main} from './search/search_main';
//import * as global from './global/_global';

export interface Window {
    test1(): void;
    test2(): void;
    test3(): void;
    search_conditions_add(group_id:string): void;
    search_field_change(search_conditions_id:string,option_type:string): void;
    search_conditions_delete(search_conditions_id:string): void;
    grouping_select(grouing_select_id:string,swich:string):void
    search_main(search_destination:string): void;
}
declare let window: Window;
window.test1 = () => { test.test1(); };
window.test2 = () => { test.test2(); };
window.test3 = () => { test.test3(); };
window.search_main = (search_destination) => {search_main(search_destination )}
window.search_conditions_add = (group_id) => { search_conditions_add(group_id); };    //初回検索条件フィールド追加
window.search_field_change = (search_conditions_id,option_type) => { search_field_change(search_conditions_id,option_type); };
window.search_conditions_delete = (search_conditions_id) => { search_conditions_delete(search_conditions_id); };
window.grouping_select = (grouing_select_id,swich) => {grouping_select(grouing_select_id,swich); };

//初画面表示
init_screen();
