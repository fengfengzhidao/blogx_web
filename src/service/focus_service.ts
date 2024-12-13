import {Message} from "@arco-design/web-vue";
import {showLogin} from "@/components/web/f_login";
import type {baseResponse} from "@/api";
import {focusUserApi, focusUserRemoveApi} from "@/api/focus_api";
import {userStorei} from "@/stores/user_store";

export async function focusHandler(userID: number, isFocus: boolean) {
    const store = userStorei()
    if (!store.isLogin){
        Message.warning("请登录")
        showLogin({reload: true})
        return
    }
    let res: baseResponse<string>
    if (isFocus) {
        res = await focusUserApi({focusUserID: userID})
    } else {
        res = await focusUserRemoveApi({focusUserID: userID})
    }
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
}