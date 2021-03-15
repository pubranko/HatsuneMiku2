/**
 * サーバーからのレスポンスを保管庫へ表示させる。
 * @param 検索結果のレコード(recodes)
 */
export const result_news_clip = (recodes:[]): void => {

    let get_hokanko_elem = document.querySelector(".hokanko"); //getElementsByClassName("hokanko");
    if(typeof get_hokanko_elem.innerHTML != 'undefined'){
        get_hokanko_elem.innerHTML = '';
    };

    for (let recode of recodes){
        let element_title = document.createElement('p');
        element_title.innerHTML = recode['publish_date'] + ' | ' + recode['title'];
        get_hokanko_elem.appendChild(element_title);
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