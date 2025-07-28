import "./commands";

// Suppress uncaught exceptions originating from third‑party scripts.
Cypress.on("uncaught:exception", () => {
  return false;
});
