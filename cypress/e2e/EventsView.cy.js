describe("Page de liste d'événements", () => {
	beforeEach(() => {
		cy.visit("localhost:8080/events");
	});

	it("Filtrer les événements", () => {
		cy.get(".search").type("rien à voir");

		cy.get(".event").should("not.exist");

		cy.get(".search").find("input[type=text]").clear().type("evenement");

		cy.get(".event").should("be.visible");

		cy.get(".search").find("input[type=text]").clear().click();

		cy.get(".v-overlay-container").children().should("exist");

		cy.get(".v-overlay-container .v-list-item").contains("ven").click();
	});

	it("Cliquer sur un événement", () => {
		cy.get("main > .v-container").children().eq(1).click({ force: true });

		cy.url().should("contain", "events/1");
	});
});
