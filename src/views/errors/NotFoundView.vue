<script setup>
import ButtonComponent from "@/components/ButtonComponent.vue";
</script>

<template>
	<v-container
		fluid
		class="py-12 h-100 d-flex align-center"
	>
		<v-row class="">
			<v-col class="d-flex flex-column ga-4 mx-auto">
				<h1 class="mx-md-auto">Page introuvable</h1>
				<p class="mx-md-auto">La page que vous recherchez n'existe pas.</p>
				<button-component
					label="Retour à l'accueil"
					route="Home"
					class="mx-md-auto"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>