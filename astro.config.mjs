import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless"; // ⬅️ esta línea es la que faltaba
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon"; // https://www.astroicon.dev/guides/upgrade/v1/
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";
import AutoImport from "astro-auto-import";

// https://astro.build/config
export default defineConfig({
	site: "https://www.glamvestidospereira.com",
	output: "server", // <-- Agrega esta línea
    adapter: vercel({
        analytics: true,
        serverless: true,
    }),
	integrations: [
		// example auto import component into blog post mdx files
		AutoImport({
			imports: [
				// https://github.com/delucis/astro-auto-import
				"@components/Admonition/Admonition.astro",
			],
		}),
		mdx(),
		icon({
			// I include only the icons I use. This is because if you use SSR, ALL icons will be included (no bueno)
			// https://www.astroicon.dev/reference/configuration#include
			include: {
				tabler: [
					"bulb",
					"alert-triangle",
					"flame",
					"info-circle",
					"arrow-narrow-left",
					"arrow-narrow-right",
					"menu-2",
					"x",
					"chevron-down",
					"category",
					"calendar-event",
				],
			},
		}),
		sitemap(),
		compress({
			HTML: true,
			JavaScript: true,
			CSS: true,
			Image: false, // astro:assets handles this. Enabling this can dramatically increase build times
			SVG: false, // astro-icon handles this
		}),
	],
	vite: {
        resolve: {
            alias: {
                '@assets': '/src/assets'
            }
        },
        plugins: [tailwindcss()],
        build: {
            assetsInlineLimit: 0,
        },
    },
});
