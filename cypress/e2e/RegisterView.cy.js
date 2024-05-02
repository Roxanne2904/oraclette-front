import { user } from "../fixtures/user";

describe("Login page tests", () => {
	beforeEach(() => {
		cy.visit("http://localhost:8080/register");
	});

	it("Fill and submit form", () => {
		cy.get("input[name=lastName]").type(user.lastname);
		cy.get("input[name=firstName]").type(user.firstname);

		cy.get(".v-select--selected .v-input__control").click();
		cy.contains(".v-list-item", user.gender).click();

		cy.get("input[name=dateOfBirth]").type(user.birthdate);
		cy.get("input[name=email]").type(user.email);
		cy.get("input[name=password]").type(user.password);
		cy.get("input[name=confirmPassword]").type(user.password);
		cy.get("input[type=checkbox]").check();

		cy.get("form").submit();

		cy.url().should("include", "/profil");
		cy.get(".v-snackbar__content").should("contain", "Connexion réussie");
	});

	it("Fill and submit form with existing email", () => {
		cy.get("input[name=lastName]").type(user.lastname);
		cy.get("input[name=firstName]").type(user.firstname);

		cy.get(".v-select--selected .v-input__control").click();
		cy.contains(".v-list-item", user.gender).click();

		cy.get("input[name=dateOfBirth]").type(user.birthdate);
		cy.get("input[name=email]").type(user.email);
		cy.get("input[name=password]").type(user.password);
		cy.get("input[name=confirmPassword]").type(user.password);
		cy.get("input[type=checkbox]").check();

		cy.get("form").submit();

		cy.get(".form-error").should("contain", "Email already in use.");
	});

	it("Try to submit empty form", () => {
		cy.get("form").submit();

		cy.get(".v-messages__message").should("exist");
	});
});
