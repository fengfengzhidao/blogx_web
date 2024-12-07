import {createRouter, createWebHistory} from 'vue-router'
import NProgress from "nprogress";
import {userStorei} from "@/stores/user_store";
import {Message} from "@arco-design/web-vue";
import {showLogin} from "@/components/web/f_login"; // 导入 nprogress模块


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: "web",
            path: "/",
            component: () => import("@/views/web/index.vue"),
            // redirect: "/admin",
            children: [
                {
                    name: "web_home",
                    path: "",
                    component: () => import("@/views/web/web_home.vue"),
                },
                {
                    name: "userCenter",
                    path: "center",
                    component: () => import("@/views/web/user_center/index.vue"),
                    children: [
                        {
                            name: "userCenterInfo",
                            path: "info",
                            component: () => import("@/views/web/user_center/info.vue"),
                        },
                        {
                            name: "userCenterAccount",
                            path: "account",
                            component: () => import("@/views/web/user_center/account.vue"),
                        },
                        {
                            name: "userCenterLoginRecord",
                            path: "login_record",
                            component: () => import("@/views/web/user_center/login_record.vue"),
                        },
                        {
                            name: "userCenterPrivacy",
                            path: "privacy",
                            component: () => import("@/views/web/user_center/privacy.vue"),
                        },
                        {
                            name: "userCenterHome",
                            path: "home",
                            component: () => import("@/views/web/user_center/home.vue"),
                        },
                        {
                            name: "userCenterHistory",
                            path: "history",
                            component: () => import("@/views/web/user_center/history.vue"),
                        }
                    ]
                },
                {
                    name: "platform",
                    path: "platform",
                    component: () => import("@/views/web/platform/index.vue"),
                    children: [
                        {
                            name: "platformArticle",
                            path: "article",
                            component: () => import("@/views/web/platform/platform_article.vue"),
                        },
                        {
                            name: "platformArticleAdd",
                            path: "article_add",
                            component: () => import("@/views/web/platform/platform_article_add.vue"),
                        },
                        {
                            name: "platformArticleEdit",
                            path: "article/:id",
                            component: () => import("@/views/web/platform/platform_article_edit.vue"),
                        },
                        {
                            name: "platformComment",
                            path: "comment",
                            component: () => import("@/views/web/platform/comment/index.vue"),
                            redirect: "/platform/comment/article",
                            children: [
                                {
                                    name: "platformCommentArticle",
                                    path: "article",
                                    component: () => import("@/views/web/platform/comment/article_comment.vue"),
                                },
                                {
                                    name: "platformCommentMy",
                                    path: "me",
                                    component: () => import("@/views/web/platform/comment/my_comment.vue"),
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: "login",
            path: "/login",
            component: () => import("@/views/login/index.vue")
        },
        {
            name: "admin",
            path: "/admin",
            component: () => import("@/views/admin/index.vue"),
            meta: {
                title: "首页",
                role: [1, 3]
            },
            children: [
                {
                    name: "home",
                    path: "",
                    component: () => import("@/views/admin/home/index.vue"),
                    meta: {
                        title: "数据统计",
                    }
                },
                {
                    name: "userManage",
                    path: "user_manage",
                    meta: {
                        title: "用户管理",
                        role: [1]
                    },
                    children: [
                        {
                            name: "userList",
                            path: "user_list",
                            meta: {
                                title: "用户列表"
                            },
                            component: () => import("@/views/admin/user_manage/user_list.vue"),
                        }
                    ]
                },
                {
                    name: "articleManage",
                    path: "article",
                    meta: {
                        title: "文章管理"
                    },
                    children: [
                        {
                            name: "articleList",
                            path: "article_list",
                            meta: {
                                title: "文章列表"
                            },
                            component: () => import("@/views/admin/article_manage/article_list.vue"),
                        }
                    ]
                },
                {
                    name: "settingsManage",
                    path: "settings",
                    meta: {
                        title: "系统管理",
                        role: [1]
                    },
                    children: [
                        {
                            name: "siteManage",
                            path: "site",
                            meta: {
                                title: "站点配置"
                            },
                            children: [
                                {
                                    name: "siteManageSite",
                                    path: "site",
                                    meta: {
                                        title: "网站设置"
                                    },
                                    component: () => import("@/views/admin/settings_manage/site_manage/site.vue"),
                                },
                                {
                                    name: "siteManageEmail",
                                    path: "email",
                                    meta: {
                                        title: "邮箱设置"
                                    },
                                    component: () => import("@/views/admin/settings_manage/site_manage/email.vue"),
                                },
                                {
                                    name: "siteManageQQ",
                                    path: "qq",
                                    meta: {
                                        title: "QQ设置"
                                    },
                                    component: () => import("@/views/admin/settings_manage/site_manage/qq.vue"),
                                },
                                {
                                    name: "siteManageAi",
                                    path: "ai",
                                    meta: {
                                        title: "AI设置"
                                    },
                                    component: () => import("@/views/admin/settings_manage/site_manage/ai.vue"),
                                },
                                {
                                    name: "siteManageQiNiu",
                                    path: "qiniu",
                                    meta: {
                                        title: "对象存储设置"
                                    },
                                    component: () => import("@/views/admin/settings_manage/site_manage/qiniu.vue"),
                                }
                            ]
                        },
                        {
                            name: "bannerList",
                            path: "banner",
                            meta: {
                                title: "banner管理"
                            },
                            component: () => import("@/views/admin/settings_manage/banner_list.vue"),
                        },
                        {
                            name: "logList",
                            path: "logs",
                            meta: {
                                title: "系统信息"
                            },
                            component: () => import("@/views/admin/settings_manage/log_list.vue"),
                        }
                    ]
                }
            ]
        },
        {
            name: "test",
            path: "/test",
            component: () => import("@/test/img_cutter.vue"),
        },
        {
            name: "notfound",
            path: "/:match(.*)",
            component: () => import("@/views/web/404.vue"),
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.role) {
        // 判断当前用户的角色，在不在列表里面
        const store = userStorei()
        if (!store.isLogin) {
            // 没有登陆
            Message.warning("需要登陆")
            showLogin({to: to.path, reload: true})
            return
        }

        if (!to.meta.role.includes(store.userInfo.role)) {
            // 不在
            Message.warning("鉴权失败")
            router.push(from.path)
            return
        }
    }
    NProgress.start();//开启进度条
    next()
})
//当路由进入后：关闭进度条
router.afterEach(() => {
    // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()//完成进度条
})

export default router
