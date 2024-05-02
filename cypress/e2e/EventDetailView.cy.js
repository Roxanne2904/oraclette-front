describe("page détail d'événement", () => {
	beforeEach(() => {
		cy.visit("localhost:8080/events/1");
	});

	it("peut rejoindre et quitter un groupe", () => {
		cy
			.get(".joinLeaveButton")
			.filter("button:visible")
			.click()
			.should("contain.text", "Quitter");

		cy
			.get(".joinLeaveButton")
			.filter("button:visible")
			.click()
			.should("contain.text", "Rejoindre !");
	});

	it("peut écrire dans le chat", () => {
		cy.get(".joinLeaveButton").filter("button:visible").click();

		cy.get(".messageInput").type("test{enter}");

		cy
			.get(".chatLogs")
			.children()
			.filter(".flex-row-reverse")
			.last()
			.should("contain.text", "test ");

		cy.get(".messageInput").type("test2{enter}");

		cy.get(".v-input__append").click();

		cy
			.get(".chatLogs")
			.children()
			.filter(".flex-row-reverse")
			.last()
			.should("contain.text", "test2 ");
	});
});
