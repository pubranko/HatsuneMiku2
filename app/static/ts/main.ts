///<reference path="./etc/_init_screen.ts"/>
///<reference path="./input/_input_form_add.ts"/>
/*
外部モジュールメソッドのグローバル化
*/
import * as test from './_test';
import * as input_form_add from './input/_input_form_add';
import * as init_screen from './etc/_init_screen';
//import * as global from './global/_global';

export interface Window {
    test1(): void;
    test2(): void;
    test3(): void;
    input_form_add(position:number): void;
}
declare let window: Window;
window.test1 = () => { test.test1(); };
window.test2 = () => { test.test2(); };
window.test3 = () => { test.test3(); };
window.input_form_add = (position) => { input_form_add.input_form_add(position); };    //初回検索条件フィールド追加

//初画面表示
init_screen.init_screen();
