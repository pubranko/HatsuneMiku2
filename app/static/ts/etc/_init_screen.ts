import {search_conditions_add} from '../input/search_conditions_add';
import {group_add} from '../group/group_add';

/**初回の読み込み時に、入力フォームの1つ目を追加 。
 * ただし検索結果を別のタブで開く場合は操作なし。
*/

export const init_screen = (): void => {
    window.addEventListener("load", (e) => {
        group_add(0)
        search_conditions_add(0)
    });
}
