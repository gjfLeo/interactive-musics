import { URL, fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import VueRouter from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Markdown from "unplugin-vue-markdown/vite";
import UnoCSS from "unocss/vite";
import UnheadVite from "@unhead/addons/vite";
import postcssAutoprefixer from "autoprefixer";
import postcssUnoCss from "@unocss/postcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [

    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      exclude: ["**/components/**/*"],
      extensions: [".vue", ".md"],
      dts: "types/router.d.ts",
    }),

    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    VueJsx(),

    // https://github.com/unplugin/unplugin-vue-markdown
    Markdown({

    }),

    // https://github.com/unplugin/unplugin-auto-import
    AutoImport({
      imports: [
        "vue",
        "@vueuse/core",
        "vitest",
        VueRouterAutoImports,
        {
          "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"],
          "@unhead/vue": ["useHead"],
        },
      ],
      dts: "types/imports.d.ts",
    }),

    // https://github.com/unplugin/unplugin-vue-components
    Components({
      dirs: ["src/components", "./components"],
      extensions: ["vue", "md"],
      resolvers: [NaiveUiResolver()],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "types/components.d.ts",
    }),

    UnoCSS(),

    // https://unhead.unjs.io/
    UnheadVite(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  css: {
    postcss: {
      plugins: [
        postcssAutoprefixer(),
        postcssUnoCss(),
      ],
    },
  },
});
