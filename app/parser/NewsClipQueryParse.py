import dateutil

'''
solrのnews_clipコアへのクエリに対して、解析、エラーチェック、requestの生成を行う。
'''


class NewsClipQueryParse():

    def __init__(self):
        # エラー系はあとで実装予定、、、
        self.error_flg: bool = False
        self.error_info: list = []
        # {error_field_num: int = 0, error_reason: str = ''}

        self.parse_result: list = []
        self.field_count: int = 0

    def query_parse(self, query: list) -> None:

        for item in query:
            if type(item) is str:  # ()を想定
                self.parse_result.append(item)
                print('文字列の調査' + item)

            elif type(item) is dict:  # field_setを想定

                self.__field_set_parse(item)

            else:
                raise Exception('変なデータを受信：エラーとして止める。')

        # return ''.join(result)

    #{field_set : {field : フィールド名,range_flg:on,value1:値,value2:値}}
    def __field_set_parse(self, item: dict):

        if item['field_set']:
            field_set = item['field_set']
        else:
            raise Exception('field_set以外のデータを受信：エラーとして止める。')

        self.field_count += 1

        if field_set['value1'] == '':
            raise Exception('入力項目に空欄があるためエラー：' + field_set['field'])
        if field_set['range_flg'] == 'on':
            if field_set['value2'] == '':
                raise Exception('入力項目に空欄があるためエラー：' + field_set['field'])

        if field_set['field'] == 'title | article':
            self.parse_result.append('title' + ':' + field_set['value1'])
            self.parse_result.append(' OR ')
            self.parse_result.append('article' + ':' + field_set['value1'])

        elif field_set['field'] == 'title':
            self.parse_result.append(
                field_set['field'] + ':' + field_set['value1'])

        elif field_set['field'] == 'article':
            self.parse_result.append(
                field_set['field'] + ':' + field_set['value1'])

        elif field_set['field'] == 'publish_date':
            # solrへの日付requestの形式 publish_date :[2019-01-01T00:00:00Z TO 2019-01-31T23:59:59Z]

            self.field_count += 1

            if field_set['range_flg'] == 'on':
                value2 = field_set['value2'] + 'T23:59:59Z'
            else:
                value2 = field_set['value1'] + 'T23:59:59Z'

            self.parse_result.append(
                field_set['field'] + ':[' + field_set['value1'] +
                'T00:00:00Z TO ' + value2 + ']'
            )

        elif field_set['field'] == 'issuer':
            self.parse_result.append(
                field_set['field'] + ':' + field_set['value1'])
