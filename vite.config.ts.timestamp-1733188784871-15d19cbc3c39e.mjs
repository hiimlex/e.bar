// vite.config.ts
import { defineConfig } from "file:///C:/Users/adale/Documents/coding/e.bar/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/adale/Documents/coding/e.bar/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/adale/Documents/coding/e.bar/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react({
      include: "**/*.tsx"
    }),
    VitePWA({
      registerType: "prompt",
      // includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "e.bar",
        short_name: "e.bar",
        description: "Drink or Restaurant E-commerce",
        icons: [
          // {
          // 	src: "/coffee.balance/android-chrome-192x192.png",
          // 	sizes: "192x192",
          // 	type: "image/png",
          // },
          // {
          // 	src: "/coffee.balance/android-chrome-512x512.png",
          // 	sizes: "512x512",
          // 	type: "image/png",
          // },
          // {
          // 	src: "/coffee.balance/apple-touch-icon.png",
          // 	sizes: "180x180",
          // 	type: "image/png",
          // 	purpose: "apple touch icon",
          // },
          // {
          // 	src: "/coffee.balance/maskable_icon.png",
          // 	sizes: "512x512",
          // 	type: "image/png",
          // 	purpose: "maskable",
          // },
        ],
        scope: "/",
        theme_color: "#fcfcfc",
        background_color: "#fcfcfc",
        display: "standalone",
        orientation: "portrait",
        start_url: "/"
      }
    })
  ],
  server: {
    watch: {
      usePolling: true
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhZGFsZVxcXFxEb2N1bWVudHNcXFxcY29kaW5nXFxcXGUuYmFyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhZGFsZVxcXFxEb2N1bWVudHNcXFxcY29kaW5nXFxcXGUuYmFyXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hZGFsZS9Eb2N1bWVudHMvY29kaW5nL2UuYmFyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuXHRwbHVnaW5zOiBbXHJcblx0XHRyZWFjdCh7XHJcblx0XHRcdGluY2x1ZGU6IFwiKiovKi50c3hcIixcclxuXHRcdH0pLFxyXG5cdFx0Vml0ZVBXQSh7XHJcblx0XHRcdHJlZ2lzdGVyVHlwZTogXCJwcm9tcHRcIixcclxuXHRcdFx0Ly8gaW5jbHVkZUFzc2V0czogW1wiZmF2aWNvbi5pY29cIiwgXCJhcHBsZS10b3VjaC1pY29uLnBuZ1wiLCBcIm1hc2tlZC1pY29uLnN2Z1wiXSxcclxuXHRcdFx0bWFuaWZlc3Q6IHtcclxuXHRcdFx0XHRuYW1lOiBcImUuYmFyXCIsXHJcblx0XHRcdFx0c2hvcnRfbmFtZTogXCJlLmJhclwiLFxyXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiBcIkRyaW5rIG9yIFJlc3RhdXJhbnQgRS1jb21tZXJjZVwiLFxyXG5cdFx0XHRcdGljb25zOiBbXHJcblx0XHRcdFx0XHQvLyB7XHJcblx0XHRcdFx0XHQvLyBcdHNyYzogXCIvY29mZmVlLmJhbGFuY2UvYW5kcm9pZC1jaHJvbWUtMTkyeDE5Mi5wbmdcIixcclxuXHRcdFx0XHRcdC8vIFx0c2l6ZXM6IFwiMTkyeDE5MlwiLFxyXG5cdFx0XHRcdFx0Ly8gXHR0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG5cdFx0XHRcdFx0Ly8gfSxcclxuXHRcdFx0XHRcdC8vIHtcclxuXHRcdFx0XHRcdC8vIFx0c3JjOiBcIi9jb2ZmZWUuYmFsYW5jZS9hbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZ1wiLFxyXG5cdFx0XHRcdFx0Ly8gXHRzaXplczogXCI1MTJ4NTEyXCIsXHJcblx0XHRcdFx0XHQvLyBcdHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcblx0XHRcdFx0XHQvLyB9LFxyXG5cdFx0XHRcdFx0Ly8ge1xyXG5cdFx0XHRcdFx0Ly8gXHRzcmM6IFwiL2NvZmZlZS5iYWxhbmNlL2FwcGxlLXRvdWNoLWljb24ucG5nXCIsXHJcblx0XHRcdFx0XHQvLyBcdHNpemVzOiBcIjE4MHgxODBcIixcclxuXHRcdFx0XHRcdC8vIFx0dHlwZTogXCJpbWFnZS9wbmdcIixcclxuXHRcdFx0XHRcdC8vIFx0cHVycG9zZTogXCJhcHBsZSB0b3VjaCBpY29uXCIsXHJcblx0XHRcdFx0XHQvLyB9LFxyXG5cdFx0XHRcdFx0Ly8ge1xyXG5cdFx0XHRcdFx0Ly8gXHRzcmM6IFwiL2NvZmZlZS5iYWxhbmNlL21hc2thYmxlX2ljb24ucG5nXCIsXHJcblx0XHRcdFx0XHQvLyBcdHNpemVzOiBcIjUxMng1MTJcIixcclxuXHRcdFx0XHRcdC8vIFx0dHlwZTogXCJpbWFnZS9wbmdcIixcclxuXHRcdFx0XHRcdC8vIFx0cHVycG9zZTogXCJtYXNrYWJsZVwiLFxyXG5cdFx0XHRcdFx0Ly8gfSxcclxuXHRcdFx0XHRdLFxyXG5cdFx0XHRcdHNjb3BlOiBcIi9cIixcclxuXHRcdFx0XHR0aGVtZV9jb2xvcjogXCIjZmNmY2ZjXCIsXHJcblx0XHRcdFx0YmFja2dyb3VuZF9jb2xvcjogXCIjZmNmY2ZjXCIsXHJcblx0XHRcdFx0ZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXHJcblx0XHRcdFx0b3JpZW50YXRpb246IFwicG9ydHJhaXRcIixcclxuXHRcdFx0XHRzdGFydF91cmw6IFwiL1wiLFxyXG5cdFx0XHR9LFxyXG5cdFx0fSksXHJcblx0XSxcclxuXHRzZXJ2ZXI6IHtcclxuXHRcdHdhdGNoOiB7XHJcblx0XHRcdHVzZVBvbGxpbmc6IHRydWUsXHJcblx0XHR9LFxyXG5cdH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZTLFNBQVMsb0JBQW9CO0FBQzFVLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFHeEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUztBQUFBLElBQ1IsTUFBTTtBQUFBLE1BQ0wsU0FBUztBQUFBLElBQ1YsQ0FBQztBQUFBLElBQ0QsUUFBUTtBQUFBLE1BQ1AsY0FBYztBQUFBO0FBQUEsTUFFZCxVQUFVO0FBQUEsUUFDVCxNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQXVCUDtBQUFBLFFBQ0EsT0FBTztBQUFBLFFBQ1AsYUFBYTtBQUFBLFFBQ2Isa0JBQWtCO0FBQUEsUUFDbEIsU0FBUztBQUFBLFFBQ1QsYUFBYTtBQUFBLFFBQ2IsV0FBVztBQUFBLE1BQ1o7QUFBQSxJQUNELENBQUM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTixZQUFZO0FBQUEsSUFDYjtBQUFBLEVBQ0Q7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
