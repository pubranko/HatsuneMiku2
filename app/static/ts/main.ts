/// <reference path='./test.ts'>

import * as _test from './_test';

interface Window {
    test1():void;
    test2():void;
    test3():void;
}
declare var window: Window;
window.test1 = () => {_test.test1();};
window.test2 = () => {_test.test2();};
window.test3 = () => {_test.test3();};
