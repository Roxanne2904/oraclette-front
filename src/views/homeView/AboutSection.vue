<script setup>
import ButtonComponent from "@/components/ButtonComponent.vue";
</script>

<template>
	<v-container
		fluid
		class="py-16"
	>
		<v-row>
			<v-col
				cols="12"
				lg="8"
				class="d-flex flex-column ga-5 mx-auto pa-0"
			>
				<v-container class="d-flex flex-column ga-8">
					<v-row class="flex-column flex-md-row align-center ga-8 ga-lg-16">
						<v-col>
							<h1 class="pb-6">
								<span>O</span><em class="text-primary">'</em> Raclette ...<br />
								mais c'est quoi ?
							</h1>
							<div class="d-flex flex-column ga-4">
								<p>Bienvenue sur O'Raclette, l'application qui révolutionne la manière dont vous organisez et participez à des événements uniques : les incontournables Raclette Parties !</p>
								<p>🧀✨ Imaginez créer votre propre moment de convivialité, entouré de vos proches, autour d'une délicieuse raclette. O'Raclette donne vie à vos rêves de soirées mémorables en vous permettant de concevoir, personnaliser et partager votre propre événement de Raclette Party.</p>
								<p>Que vous soyez un maître fromager en herbe ou un amateur de bons moments, l'aventure culinaire vous attend !</p>
								<p>Mais ce n'est pas tout ! Plongez dans l'expérience O'Raclette en participant à des événements exceptionnels organisés par d'autres passionnés. Rencontrez de nouvelles personnes, découvrez des recettes créatives, et partagez des instants gourmands qui resteront gravés dans votre mémoire.</p>
								<p>Alors, prêt à transformer chaque repas en une fête de la raclette inoubliable ?</p>
								<p>Rejoignez O'Raclette dès maintenant et faites de chaque bouchée un moment de pur plaisir et de partage ! 🎉🧀</p>
							</div>
						</v-col>
						<v-col>
							<v-img
								max-width="500"
								src="/assets/images/logo.svg"
								class="mx-auto"
							/>
						</v-col>
					</v-row>
					<v-row>
						<v-col
							cols="12"
							md="6"
							class="d-flex flex-column ga-6 bg-secondary pa-6 rounded"
						>
							<p class="text-grey-100">
								Toi aussi rejoins la famille !
								<v-icon color="primary">mdi-heart</v-icon>
							</p>
							<p class="text-grey-100">...et crée ta propre raclette party !</p>
							<button-component
								label="Inscrit toi ici !"
								route="Register"
								class="ml-auto"
							/>
						</v-col>
					</v-row>
				</v-container>
			</v-col>
		</v-row>
	</v-container>
</template>