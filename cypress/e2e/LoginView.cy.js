import { user } from "../fixtures/user";

describe("Login page tests", () => {
	beforeEach(() => {
		cy.visit("http://localhost:8080/login");
	});

	it("Fill and submit login form", () => {
		cy.get("input[name=email]").type(user.email);
		cy.get("input[name=password]").type(user.password);
		cy.get("form").submit();
	});
});
