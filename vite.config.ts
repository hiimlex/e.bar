import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			include: "**/*.tsx",
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
				start_url: "/",
			},
		}),
	],
	server: {
		watch: {
			usePolling: true,
		},
	},
});
