/*
外部モジュールメソッドのグローバル化
*/
import * as test from './_test';
import {input_form_add} from './input/input_form_add';
import {init_screen} from './etc/_init_screen';
import {search_main} from './search/search_main';
//import * as global from './global/_global';

export interface Window {
    test1(): void;
    test2(): void;
    test3(): void;
    input_form_add(position:number): void;
    search_main(search_destination:string): void;
}
declare let window: Window;
window.test1 = () => { test.test1(); };
window.test2 = () => { test.test2(); };
window.test3 = () => { test.test3(); };
window.input_form_add = (position) => { input_form_add(position); };    //初回検索条件フィールド追加
window.search_main = (search_destination) => {search_main(search_destination )}

//初画面表示
init_screen();
