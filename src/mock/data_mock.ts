import {mock, type MockjsRequestOptions} from "mockjs";

export function dataMock() {
    mock(/.*?\/api\/data\/statistic/, function (options: MockjsRequestOptions) {
        return mock({
            code: 0,
            data: [
                {
                    label: "在线流量",
                    "value|10001-30000": 1,
                },
                {
                    label: "用户总数",
                    "value|201-400": 1,
                },
                {
                    label: "文章总数",
                    "value|121-220": 1,
                },
                {
                    label: "今日登陆",
                    "value|21-40": 1,
                },
                {
                    label: "今日注册",
                    "value|8-20": 1,
                }
            ],
            msg: "成功"
        })
    })


    mock(/.*?\/api\/data\/weather/, function (){
        return mock({
                "code": 0,
                "data": {
                    "province": "湖南",
                    "city": "长沙市",
                    "adcode": "430100",
                    "weather": "晴",
                    "temperature": "34",
                    "winddirection": "西南",
                    "windpower": "≤3",
                    "humidity": "55",
                    "reporttime": "2024-05-26 14:01:47",
                    "temperature_float": "34.0",
                    "humidity_float": "55.0"
                },
                "msg": "成功"
            })
    })

}