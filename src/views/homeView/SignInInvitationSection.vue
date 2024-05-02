<script setup>
import ButtonComponent from "@/components/ButtonComponent.vue";
</script>

<template>
	<v-container fluid class="py-16 bg-grey-200">
		<v-row>
			<v-col
				cols="12"
				md="8"
				lg="6"
				class="d-flex flex-column ga-3 ga-lg-6 mx-auto align-center"
			>
				<h2 class="pb-6 text-center">
					Pas encore inscris 😱 ?
					<p>On attend plus que toi !</p>
				</h2>

				<p>
					<strong>Inscris-toi</strong> et rejoins notre communauté en participant à
					de superbe Raclette party.
					<br />
					<br />
					Chaque mois il te sera possible de
					<strong>voter pour la photo de raclette</strong>
					la plus original 😋 !
				</p>
				<v-container class="pa-0">
					<v-row>
						<v-col
							cols="12"
							md="8"
							lg="6"
							class="d-flex flex-column ga-3 ga-lg-6 pt-8 mx-auto align-center"
						>
							<button-component label="S'inscrire" route="Register" class="mx-auto" />
							<button-component label="Se connecter" route="Login" class="mx-auto" />
						</v-col>
					</v-row>
				</v-container>
			</v-col>
		</v-row>
	</v-container>
</template>
