/**
 * @function formatDate
 * @description Formate une date au format français.
 * @param {string} date La date à formater.
 * @param {boolean} [withTime=false] Si l'heure doit être incluse dans la date.
 * @returns {string} La date formatée.
 */
export const formatDate = (date, withTime = false) => {
	const dateOptions = {
		day: "numeric",
		month: "long",
		year: "numeric"
	};

	if (withTime) {
		dateOptions.hour = "2-digit";
		dateOptions.minute = "2-digit";
	}

	return new Date(date).toLocaleDateString("fr-FR", dateOptions);
};