<script setup>
import { ref, watchEffect } from "vue";
import { useUserStore } from "@/store/UserStore.js";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { RouterLink } from "vue-router";

const userStore = useUserStore();

const email = ref("");
const password = ref("");
const formError = ref("");

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
		return "Mot de passe invalide.";
	},
];

const handleSubmit = () => {
	if (!(email.value && password.value)) {
		formError.value = "Veuillez remplir tous les champs.";
	} else {
		formError.value = "";

		userStore.login(email.value, password.value);
	}
};

const handleGoogleLogin = () => location.href = `${import.meta.env.VITE_API_URL}/auth/google`;

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
				<h1 class="text-center">Bon retour sur O'Raclette !</h1>
				<v-form
					@submit.prevent="handleSubmit"
					class="d-flex flex-column ga-5"
				>
					<v-text-field
						class="input"
						v-model="email"
						:rules="emailRules"
						name="email"
						label="Adresse e-mail"
						type="email"
						variant="outlined"
					/>
					<v-text-field
						class="input"
						v-model="password"
						:rules="passwordRules"
						name="password"
						label="Mot de passe"
						type="password"
						variant="outlined"
					/>
					<v-col class="d-flex flex-column align-center ga-3">
						<button-component
							label="Se connecter"
							route="Login"
							type="submit"
							:isPrimary="true"
						/>
						<p
							v-if="formError"
							class="text-red-darken-4"
						>{{ formError }}</p>
						<p class="text-body-2">Pas encore de compte ? <router-link
								class="text-secondary"
								to="/register"
							>Inscrivez-vous</router-link></p>
					</v-col>
				</v-form>
				<v-divider></v-divider>
				<v-btn
					:elevation=0
					prepend-icon="mdi-google"
					class="or-google-button"
					@click="handleGoogleLogin"
				>Connexion avec Google</v-btn>
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