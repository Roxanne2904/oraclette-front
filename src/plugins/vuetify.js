import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { md3 } from "vuetify/blueprints";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";

export default createVuetify({
	blueprint: md3,
	theme: {
		themes: {
			light: {
				colors: {
					background: "hsl(0, 0%, 98%)",
					primary: "#FDD85C",
					secondary: "#0C2732",
					delete: "#932929",
					accent: "#00C8AA",
					"on-background": "#000000",
					"grey-100": "hsl(0, 0%, 98%)",
					"grey-200": "hsl(0, 0%, 93%)",
					"grey-300": "hsl(0, 0%, 89%)",
					"grey-400": "hsl(0, 0%, 83%)",
					"grey-500": "hsl(0, 0%, 71%)",
					"grey-600": "hsl(0, 0%, 46%)",
					"grey-700": "hsl(0, 0%, 31%)",
					"grey-800": "hsl(0, 0%, 23%)",
					"grey-900": "hsl(0, 0%, 15%)",
				},
			},
			dark: {
				colors: {
					primary: "#FDD85C",
				},
			},
		},
	},
	icons: {
		defaultSet: "mdi",
		aliases,
		sets: {
			mdi,
		},
	},
});
