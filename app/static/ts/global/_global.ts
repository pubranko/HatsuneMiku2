/**グローバル変数として使用したい変数を連想配列で格納*/
export let global_num: { [key: string]: number } = {
    'search_conditions_count': 0,
    'search_group_count': 0,
}

/**グローバル変数への加算を行う。
 * @param key グローバル変数の項目を指定
 * @param num グローバル変数へ加算する値を指定。マイナスを入れると減算される。
 */
export const global_num_add = (field: string, key: string, num: number): void => {

    if (field == 'global_num') {
        if (key in global_num) {
            global_num[key] += num;
        } else {
            throw new Error('連想配列（global_num）に存在しないKeyが指定されています。(key = ' + key + ')');
        }
    }
}

/**
 * グローバル変数として、検索条件フィールド種類を配列にして格納。
 * 配列内には連想配列でフィールドごとの要素を格納。
 */
export const global_search_conditions_table: { [key: number]: { [key: string]: any } } = {
    0: {
        'type': 'text',
        //{field_set : {field : フィールド名,range_flg:off,value1:値,}}
        'field_set': { 'field': 'title & article', 'range_flg': false, 'value1': '' },
        'field_name': '件名or本文',
        'selected': true
    },
    1: {
        'type': 'text',
        'field_set': { 'field': 'title', 'range_flg': false, 'value1': '' },
        'field_name': '件名'
    },
    2: {
        'type': 'text',
        'field_set': { 'field': 'article', 'range_flg': false, 'value1': '' },
        'field_name': '本文'
    },
    3: {
        'type': 'date',
        'field_set': { 'field': 'publish_date', 'range_flg': true, 'value1': '', 'value2': '' },
        'field_name': '記事公開日'
    },
    4: {
        'type': 'text',
        'field_set': { 'field': 'issuer', 'range_flg': false, 'value1': '' },
        'field_name': '発行者'
    }
}

/**実行中にイベント配列として保存する*/
export let global_runing_events: Array<string> = [];


/**グローバル変数として使用したい変数を連想配列で格納*/
export let global_string: { [key: string]: string } = {
    'global_grouping_id': '',
}

/**グローバル変数への編集を行う。
 * @param key グローバル変数の項目を指定
 * @param field グローバル変数へ設定する値を指定。
 */
export const global_string_edit = (key: string, field: string): void => {

    if (key in global_string) {
        global_string[key] = field;
    } else {
        throw new Error('連想配列（global_string）に存在しないKeyが指定されています。(key = ' + key + ')');
    }
}
