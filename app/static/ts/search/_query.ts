import * as global from '../global/_global';    //グローバル変数
import {result_news_clip} from './_result_news_clip';   //news_clipへの検索結果を画面に編集する。


/**
 * @param
 * @param
 */
export const query = (search_conditions_json: {}): void => {

    let xhr_request = new XMLHttpRequest();
    xhr_request.onreadystatechange = result;    //戻り値を処理する関数
    xhr_request.open('POST', 'http://localhost:8000/news_clip', true);
    xhr_request.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr_request.responseType = 'json';
    xhr_request.send(JSON.stringify(search_conditions_json));

    /**
    * @param
    * @param
    */
   function result(): void  {

        if (xhr_request.readyState == 4 && xhr_request.status == 200) {
            result_news_clip(xhr_request.response['recodes']);
        }
    }
}

/*recode:[
    'title':recode['title'],
    'article':recode['article'],
    'url':recode['url'],
    'publish_date':datetime.strftime(parser.parse(recode['publish_date']),'%Y-%m-%d %H:%M'),
    'issuer':recode['issuer'][0],
    'update_count':recode['update_count'],
  ]
*/