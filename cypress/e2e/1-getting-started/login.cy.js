/// <reference types="cypress" />

describe('Login Component Testing', () => {
  beforeEach(() => {
    // Visita localhost:5173 antes de cada prueba
    cy.visit('http://localhost:5173/login');
  });

  it('Display error for invalid email format', () => {
    cy.get('[data-testid=email]').type('test');
    cy.get('[data-testid=password]').type('password123');
    cy.get('[data-testid=submit]').click();
    cy.contains('Por favor, ingresa un correo electrónico válido.').should('be.visible');
  });

  it('Display error for password less than 6 characters', () => {
    cy.get('[data-testid=email]').type('user@example.com');
    cy.get('[data-testid=password]').type('pass');
    cy.get('[data-testid=submit]').click();
    cy.contains('La contraseña debe tener al menos 6 caracteres.').should('be.visible');
  });

});
