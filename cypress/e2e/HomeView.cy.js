describe("Page d'accueil", () => {
	beforeEach(() => {
		cy.visit("localhost:8080");
	});

	it("Peut naviguer le site sur mobile", () => {
		cy.viewport(375, 667);
		cy.get("button[value=events]").click();
		cy.url().should("contain", "events");
		cy.get("button[value=login]").click();
		cy.url().should("contain", "login");
		cy.contains("S'inscrire").parent().click();
		cy.url().should("contain", "register");
		cy.go("back");
		cy.get("footer > div > .v-row").children().eq(0).click();
		cy.url().should("contain", "contact");
		cy.go("back");
		cy.get("footer > div > .v-row").children().eq(1).click();
		cy.url().should("contain", "legal-notices");
	});

	it("Peut naviguer le site sur PC", () => {
		cy.viewport(1920, 1080);
		cy.get(".v-app-bar-nav-icon").click();
		cy
			.get(".v-navigation-drawer")
			.children()
			.first()
			.children()
			.first()
			.children()
			.eq(1)
			.click();
		cy.url().should("contain", "events");
		cy.get(".v-app-bar-nav-icon").click();
		cy
			.get(".v-navigation-drawer")
			.children()
			.first()
			.children()
			.first()
			.children()
			.eq(2)
			.click();
		cy.url().should("contain", "register");
		cy.get(".v-app-bar-nav-icon").click();
		cy
			.get(".v-navigation-drawer")
			.children()
			.first()
			.children()
			.first()
			.children()
			.eq(3)
			.click();
		cy.url().should("contain", "login");
		cy.get(".v-app-bar-nav-icon").click();
		cy
			.get(".v-navigation-drawer")
			.children()
			.first()
			.children()
			.first()
			.children()
			.eq(4)
			.click();
		cy.url().should("contain", "contact");
		cy.get(".v-app-bar-nav-icon").click();
		cy
			.get(".v-navigation-drawer")
			.children()
			.first()
			.children()
			.first()
			.children()
			.eq(5)
			.click();
		cy.url().should("contain", "legal-notices");
		cy.get(".v-app-bar-nav-icon").click();
		cy
			.get(".v-navigation-drawer")
			.children()
			.first()
			.children()
			.first()
			.children()
			.eq(0)
			.click();
		cy.url().should("equal", "http://localhost:5173/");
	});

	it("Peut liker des photos", () => {
		cy
			.get(".v-card-actions")
			.eq(3)
			.children()
			.first()
			.children()
			.eq(2)
			.children()
			.first()
			.should("have.class", "mdi-heart-outline");
		cy.get(".v-card-actions").eq(3).children().first().click();
		cy
			.get(".v-card-actions")
			.eq(3)
			.children()
			.first()
			.children()
			.eq(2)
			.children()
			.first()
			.should("have.class", "mdi-heart");

		cy.get(".v-card-actions").eq(4).click();
		cy
			.get(".v-overlay__content")
			.find(".v-card-actions")
			.children()
			.last()
			.children()
			.eq(2)
			.children()
			.first()
			.should("have.class", "mdi-heart-outline");
		cy
			.get(".v-overlay__content")
			.find(".v-card-actions")
			.children()
			.last()
			.click();
		cy
			.get(".v-overlay__content")
			.find(".v-card-actions")
			.children()
			.last()
			.children()
			.eq(2)
			.children()
			.first()
			.should("have.class", "mdi-heart");
	});
});
