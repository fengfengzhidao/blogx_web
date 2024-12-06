import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {loadEnv} from "vite";
import type {EnvMeta} from "./env";
// https://vitejs.dev/config/
const envDir = "./" // env文件的目录
export default defineConfig((config) => {
    const env = loadEnv(config.mode, envDir) as EnvMeta
    console.log(env.VITE_SERVER_URL)

    return {
        plugins: [vue()],
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        // 'primary-6': "red",
                    },
                    additionalData: '@import "@/assets/var.less";',
                    javascriptEnabled: true,
                }
            }
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            host: "0.0.0.0",
            port: 80,
            proxy: {
                "/api": {
                    target: env.VITE_SERVER_URL,
                    // rewrite: (path) => path.replace("/api", "")
                },
                "/uploads": {
                    target: env.VITE_SERVER_URL,
                }
            }
        },
        envDir: envDir,
        define: {
            // enable hydration mismatch details in production build
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
        }
    }
})
