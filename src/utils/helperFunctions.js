export function toGenderIcon(gender) {
	switch (gender) {
		case "male":
			return "mdi-gender-male";
		case "female":
			return "mdi-gender-female";
		case "male-female":
			return "mdi-gender-male-female";
		case "transgender":
			return "mdi-gender-transgender";
		case "nonbinary":
			return "mdi-gender-non-binary";
		default:
			return "mdi-help";
	}
}

export const sanitizeInput = (string) => {
	return string
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#x27;")
		.replace(/\//g, "&#x2F;");
};