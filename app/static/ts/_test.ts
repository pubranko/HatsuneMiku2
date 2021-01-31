export function test1(): string {
    //console.log('hello');
    return 'test1';
}

export function test2():void {
    //return 'test2';

    //テスト用のサンプルデータ
    let json_data = {
        'name': 'Foo',
        'description': 'An optional description',
        'price': 45.2,
        'tax': 3.5
    }

    let xhr_request = new XMLHttpRequest();
    xhr_request.onreadystatechange = f_hxr_showData;    //戻り値を処理する関数
    xhr_request.open('POST','http://localhost:8000/test/ajax',true);
    xhr_request.setRequestHeader('content-type','application/x-www-form-urlencoded;charset=UTF-8');
    xhr_request.responseType = 'json';
    xhr_request.send(JSON.stringify(json_data));

    //ajaxで取得したhtmlを、divタグ（name=hokanko）に挿入する。
    function f_hxr_showData():void {
        if (xhr_request.readyState == 4 && xhr_request.status == 200) {
            //console.log(JSON.parse(xhr_request.responseText));
            console.log(xhr_request.responseType);
            console.log(xhr_request.response);
        }
    }
}

export function test3(): void {
    //テスト用のサンプルデータ
    let json_data = {
        'search_conditions': [
            '(',
            //{'field' : 'title', 'range_flg':'off', 'value1':'中国'},
            {'field' : 'article', 'range_flg':'off', 'value1':'安倍'},
            ')'
        ],
        'page_number': 1,
        'details_number': 10,
    }

    let xhr_request = new XMLHttpRequest();
    xhr_request.onreadystatechange = f_hxr_showData;    //戻り値を処理する関数
    xhr_request.open('POST','http://localhost:8000/news_clip',true);
    xhr_request.setRequestHeader('content-type','application/x-www-form-urlencoded;charset=UTF-8');
    xhr_request.responseType = 'json';
    xhr_request.send(JSON.stringify(json_data));

    //ajaxで取得したhtmlを、divタグ（name=hokanko）に挿入する。
    function f_hxr_showData():void {
        if (xhr_request.readyState == 4 && xhr_request.status == 200) {
            let get_hokanko_elem = document.getElementsByClassName("hokanko");
            for (let recode of xhr_request.response['recodes']){
                let element_title = document.createElement('p');
                element_title.innerHTML = recode['title'];
                get_hokanko_elem[0].appendChild(element_title);
            }
        }
    }
}
