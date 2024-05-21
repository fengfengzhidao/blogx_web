import {mock, type MockjsRequestOptions} from "mockjs";

export function userMock(){
    mock(/.*?\/api\/email_login/, function (options: MockjsRequestOptions){
        return {
            code: 0,
            data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwibmlja19uYW1lIjoi5p6r5p6rIiwicm9sZSI6MSwidXNlcl9pZCI6MSwiZXhwIjoxNzE2Mzc4NTI1LjcyMDk4MiwiaXNzIjoiMTIzNCJ9.48zvrEbJ6KkUVIL8ivhdDQStm7d5FqhuZ7nf0xO-ydg",
            msg: "成功"
        }
    })


    mock("/.*?\/api/user_info/", function (options: MockjsRequestOptions){
        return {
            "code": 0,
            "data": {
                "id": 1,
                "created_at": "2023-02-19T17:23:04.543+08:00",
                "nick_name": "枫枫",
                "user_name": "admin",
                "avatar": "/uploads/file/枫枫/images_20231005232530.png",
                "email": "2663456523@qq.com",
                "tel": "",
                "addr": "内网地址",
                "token": "",
                "ip": "127.0.0.1",
                "role": "管理员",
                "sign_status": "邮箱",
                "integral": 0,
                "sign": "这是我的花火",
                "link": "http://www.fengfengzhidao.com"
            },
            "msg": "成功"
        }
    })
}