/**
 * @param
 * @param
 */
export const result_news_clip = (recodes:[]): void => {

    let get_hokanko_elem = document.getElementsByClassName("hokanko");

    for (let recode of recodes){
        let element_title = document.createElement('p');
        element_title.innerHTML = recode['title'];
        get_hokanko_elem[0].appendChild(element_title);
    }

    //let t = xhr_request.response['title'] + ' : ' + xhr_request.response['name'];
    //get_hokanko_elem.innerHTML = t;
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