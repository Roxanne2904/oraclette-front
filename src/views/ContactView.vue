<script setup>
import { reactive } from "vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

const validation = reactive({
	valid: false,
	email: "",
	emailRules: [
		(value) => {
			if (value) return true;

			return "Veuillez renseigner votre e-mail.";
		},
		(value) => {
			if (/.+@.+\..+/.test(value)) return true;

			return "Cet e-mail est invalide.";
		},
		(value) => {
			if (value?.length <= 320) return true;

			return "L'email doit faire moins de 320 caractères de long.";
		},
	],
	subject: "",
	subjectRules: [
		(value) => {
			if (value) return true;

			return "Veuillez renseigner un objet.";
		},
		(value) => {
			if (value?.length <= 70) return true;

			return "L'objet doit faire moins de 70 caractères de long.";
		},
	],
	message: "",
	messageRules: [
		(value) => {
			if (value) return true;

			return "Veuillez entrer un message.";
		},
		(value) => {
			if (value?.length <= 2000) return true;

			return "Veuillez entrer un message de moins de 2000 caractères de long.";
		},
	],
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
				class="d-flex flex-column ga-5 mx-auto"
			>
				<h1 class="text-center">Contact</h1>
				<p class="text-center">Un problème ? Envoyez-nous un message !</p>
				<v-form
					v-model="validation.valid"
					class="d-flex flex-column ga-5"
				>
					<v-text-field
						label="Adresse e-mail"
						type="email"
						variant="outlined"
						:rules="validation.emailRules"
						:counter="320"
						validate-on="submit"
						required
					/>
					<v-text-field
						label="Objet"
						variant="outlined"
						:rules="validation.subjectRules"
						:counter="70"
						validate-on="submit"
						required
					/>
					<v-textarea
						label="Message"
						variant="outlined"
						:rules="validation.messageRules"
						:counter="2000"
						validate-on="submit"
						required
						no-resize
						rows="7"
					/>
					<button-component
						label="Envoyer"
						type="submit"
						class="mx-auto"
					/>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>