import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite"; //注意后面有个/vite
import { VantResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite"; //注意后面有个/vite

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ["src/components"],
      extensions: ["vue", "tsx"],
      // 配置文件生成位置
      dts: "src/components.d.ts",
      resolvers: [VantResolver()],
    }),
    AutoImport({
      imports: ["vue", "vue-router"],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: "src/auto-import.d.ts",
    }),
  ],
});
