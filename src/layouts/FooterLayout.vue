<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
	<v-footer class="bg-secondary pa-8">
		<v-row class="flex-column align-center ga-4">
			<v-col
				cols="12"
				md="8"
				lg="6"
				class="d-flex flex-column flex-md-row justify-center align-center ga-5"
			>
				<v-btn
					variant="text"
					@click="() => router.push({ name: 'About' })"
					text="À propos"
				/>
				<v-btn
					variant="text"
					@click="() => router.push({ name: 'Contact' })"
					text="Contact"
				/>
				<v-btn
					variant="text"
					@click="() => router.push({ name: 'LegalNotices' })"
					text="Mentions légales"
				/>
			</v-col>
			<v-col>
				<p class="text-center text-grey-300">© 2024 O'Raclette - Tous droits réservés</p>
			</v-col>
		</v-row>
	</v-footer>
</template>

<style scoped>
@media only screen and (max-width: 480px) {
	.v-footer {
		margin-bottom: 56px;
	}
}
</style>