import router from "@/router";


export function goArticle(id: number) {
    router.push({
        name: "articleDetail",
        params: {id}
    })
}


export function goUser(id: number) {
    router.push({
        name: "userArticle",
        params: {id}
    })
}