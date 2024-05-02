describe("Page de contact", () => {
	beforeEach(() => {
		cy.visit("localhost:8080/contact");
	});

	it("Remplir et envoyer le formulaire de contact", () => {
		cy.get("input[type=email]").type("durandarthur09@outlook.fr");
		cy.get("input[type=text]").type("objet du mail");
		cy.get("textarea").type("aled\naled");
		cy.get("form").submit();
	});
});
