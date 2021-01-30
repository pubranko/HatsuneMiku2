/// <reference path="./test.ts">

import * as _test from "./_test";

interface Window { test1(): void;test2(): void; }
declare var window: Window;
window.test1 = () => {
    console.log(_test.test1());
};

//interface Window { test2(): void; }
//declare var window: Window;
window.test2 = () => {
    _test.test2();
};
