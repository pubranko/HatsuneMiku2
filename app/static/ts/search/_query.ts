import {result_news_clip} from './_result_news_clip';   //news_clipへの検索結果を画面に編集する。

/**
 * サーバーのAPIへリクエストデータを送る。
 * @param search_conditions_json サーバーのAPIへ渡すjsonデータ
 */
export const query = (search_conditions_json: {}): void => {

    let xhr_request = new XMLHttpRequest();
    xhr_request.onreadystatechange = result;    //戻り値を処理する関数
    xhr_request.open('POST', window.location.origin + '/news_clip', true);
    xhr_request.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr_request.responseType = 'json';
    xhr_request.send(JSON.stringify(search_conditions_json));

    /** コールバック関数：サーバーからのレスポンスを処理する。
    * @param なし
    */
   function result(): void  {
        if (xhr_request.readyState == 4 && xhr_request.status == 200) {
            result_news_clip(xhr_request.response['recodes']);
        }
    }
}