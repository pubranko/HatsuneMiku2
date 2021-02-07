/**グローバル変数として使用したい変数を連想配列で格納*/
export let global_num : {[key:string]:number;}= {
    'search_conditions_count' : 0,
}

/**グローバル変数への加算を行う。
 * @param key グローバル変数の項目を指定
 * @param num グローバル変数へ加算する値を指定。マイナスを入れると減算される。
 */
export const add = (key:string,num:number): void => {

    if(key in global_num){
        global_num[key] += num;
    }else{
        throw new Error('連想配列（global_num）に存在しないKeyが指定されています。(key = ' + key + ')');
    }
}
