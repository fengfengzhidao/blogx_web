import F_update_email from "@/components/common/f_update_email.vue";
import {createApp, defineComponent, h, ref} from "vue";

const visible = ref<boolean | undefined>(undefined)


export function showUpdateEmail() {
    if (visible.value === undefined) {
        // 生成虚拟dom
        const component = defineComponent({
            render: () => h(F_update_email, {
                visible: visible.value,
                "onUpdate:visible": () => {
                    visible.value = false
                },
                onDestruction() {
                    // 销毁组件
                    app.unmount()
                    document.getElementById("email_100")?.remove()
                    visible.value = undefined
                }
            })
        })
        // 生成app
        const app = createApp(component)

        // 挂载到真实dom上
        const div = document.createElement("div")
        div.id = "email_100"
        app.mount(div)

        document.body.append(div)
    }

    visible.value = true
}