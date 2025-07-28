// Accepts the cookie consent banner if it appears on the page.

Cypress.Commands.add("acceptCookies", () => {
  cy.get("body").then(($body) => {
    const consentButton = $body
      .find("button")
      .filter((i, btn) => /accept/i.test(btn.innerText));
    if (consentButton.length) {
      cy.wrap(consentButton.first()).click({ force: true });
      cy.log("Cookie banner accepted");
    }
  });
});

//Navigates from the home page to the Politics section using the global navigation.

Cypress.Commands.add("navigateToPolitics", () => {
  cy.visit("/");
  cy.acceptCookies();
  cy.contains("a", /read/i).click();
  cy.contains(/politics/i).click({ force: true });
  cy.url().should("match", /politics/);
  cy.title().should("match", /politics/i);
  cy.log("Navigated to Politics page");
});
