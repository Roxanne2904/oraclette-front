<script setup>
import { ref, watchEffect } from "vue";
import { useUserStore } from "@/store/UserStore.js";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { RouterLink } from "vue-router";

const userStore = useUserStore();

const firstName = ref(""),
	lastName = ref(""),
	gender = ref(""),
	dateOfBirth = ref(""),
	email = ref(""),
	password = ref(""),
	confirmPassword = ref(""),
	formError = ref(""),
	checkbox = ref(false);

const genderOptions = [
	{
		title: "Homme",
		value: "male"
	},
	{
		title: "Femme",
		value: "female"
	},
	{
		title: "Autre",
		value: "nonbinary"
	},
];

const genders = ["male", "female", "nonbinary"];

const currentDate = new Date();

const minDate = new Date(currentDate.getFullYear() - 100, currentDate.getMonth(), currentDate.getDate()).toISOString().split("T")[0];

// Rules

const firstNameRules = [
	(value) => {
		if (value?.length >= 2) return true;
		return "Le prénom doit comporter au moins 2 caractères.";
	},
];

const lastNameRules = [
	(value) => {
		if (value?.length >= 2) return true;
		return "Le nom doit comporter au moins 2 caractères.";
	},
];

const genderRules = [
	({ value }) => {
		if (genders.includes(value)) return true;
		return "Veuillez sélectionner un genre valide.";
	},
];

const dateOfBirthRules = [
	(value) => {
		if (value) return true;
		return "Veuillez sélectionner une date de naissance.";
	},
];

const emailRules = [
	(value) => {
		const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (pattern.test(value)) return true;
		return "Adresse e-mail invalide.";
	},
];

const passwordRules = [
	(value) => {
		if (value?.length >= 8) return true;
		return "Le mot de passe doit comporter au moins 8 caractères.";
	},
	(value) => {
		const pattern = /[A-Z]/;
		if (pattern.test(value)) return true;
		return "Le mot de passe doit contenir au moins une lettre majuscule.";
	},
	(value) => {
		const pattern = /[!@#$%^&*(),.?":{}|<>]/;
		if (pattern.test(value)) return true;
		return "Le mot de passe doit contenir au moins un caractère spécial.";
	},
];

const confirmPasswordRules = [
	(value) => {
		if (value === password.value) return true;
		return "Les mots de passe ne correspondent pas.";
	},
];

const checkboxRules = [
	(value) => {
		if (value) return true;
		return "Veuillez accepter les CGU.";
	},
];

// Functions

const handleSubmit = () => {
	if (!lastName.value || !firstName.value || !gender.value.value || !dateOfBirth.value || !email.value || !password.value || !confirmPassword.value || !checkbox.value) {
		formError.value = "Veuillez remplir tous les champs.";
	} else {
		formError.value = "";

		userStore.register(
			lastName.value,
			firstName.value,
			gender.value.value,
			dateOfBirth.value,
			email.value,
			password.value
		);
	}
};

const handleGoogleRegister = () => location.href = `${import.meta.env.VITE_API_URL}/auth/google`;

watchEffect(() => {
	const errorMessage = userStore.getErrorMessages;

	formError.value = errorMessage ? errorMessage : null;

	const searchParams = new URLSearchParams(location.search);

	if (searchParams.get("access_token")) {
		userStore.authWithGoogle(searchParams.get("access_token"));
	}
});
</script>

<template>
	<v-container
		fluid
		class="py-12"
	>
		<v-row>
			<v-col
				cols="12"
				md="8"
				lg="6"
				xl="4"
				class="d-flex flex-column ga-5 mx-auto"
			>
				<h1 class="text-center">Bienvenue sur O'Raclette !</h1>
				<v-form
					@submit.prevent="handleSubmit"
					class="d-flex flex-column ga-3"
				>
					<v-text-field
						v-model="lastName"
						:rules="lastNameRules"
						name="lastName"
						label="Nom"
						variant="outlined"
					/>
					<v-text-field
						v-model="firstName"
						:rules="firstNameRules"
						name="firstName"
						label="Prénom"
						variant="outlined"
					/>
					<v-select
						v-model="gender"
						:rules="genderRules"
						name="gender"
						label="Genre"
						:items="genderOptions"
						item-title="title"
						item-value="value"
						return-object
						variant="outlined"
					/>
					<v-text-field
						v-model="dateOfBirth"
						:rules="dateOfBirthRules"
						:min="minDate"
						name="dateOfBirth"
						label="Date de naissance"
						type="date"
						variant="outlined"
					/>
					<v-text-field
						v-model="email"
						:rules="emailRules"
						name="email"
						label="Adresse e-mail"
						type="email"
						variant="outlined"
					/>
					<v-text-field
						v-model="password"
						:rules="passwordRules"
						name="password"
						label="Mot de passe"
						type="password"
						variant="outlined"
					/>
					<v-text-field
						v-model="confirmPassword"
						:rules="confirmPasswordRules"
						name="confirmPassword"
						label="Confirmer le mot de passe"
						type="password"
						variant="outlined"
					/>
					<v-checkbox
						v-model="checkbox"
						:rules="checkboxRules"
					>
						<template v-slot:label>
							<div>
								En cochant cette case, vous acceptez les
								<v-tooltip location="bottom">
									<template v-slot:activator="{ props }">
										<router-link to="/legal-notices">CGU</router-link>
									</template>
								</v-tooltip>
							</div>
						</template>
					</v-checkbox>
					<div class="d-flex flex-column align-center ga-3">
						<button-component
							label="S'inscrire"
							route="Register"
							type="submit"
							:isPrimary="true"
							class="d-flex mx-auto"
						/>
						<p
							v-if="formError"
							class="text-red-darken-4"
						>{{ formError }}</p>
						<p class="text-body-2">Déjà un compte ? <router-link
								class="text-secondary"
								to="/login"
							>Connectez-vous</router-link></p>
					</div>
				</v-form>
				<v-divider></v-divider>
				<v-btn
					:elevation=0
					prepend-icon="mdi-google"
					class="or-google-button"
					@click="handleGoogleRegister"
				>S'inscrire avec Google</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped>
.or-google-button {
	margin: auto;
	background-color: rgb(var(--v-theme-grey-100)) !important;
	outline: 1px solid rgb(var(--v-theme-grey-400));
}
</style>