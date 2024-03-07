/// <reference types="cypress" />
// cypress/integration/login.spec.js

describe('Iniciar Sesión con Google', () => {
  it('debería iniciar sesión con autenticación de Google', () => {
    cy.visit('http://localhost:5173/login')

    // Haz clic en el botón de inicio de sesión con Google
    cy.contains('Iniciar sesión con Google').click()

    // Espera 3 segundos para que se abra la ventana de inicio de sesión de Google
    cy.wait(300000)

    // Verifica que se abrió la ventana de inicio de sesión de Google
    cy.url().should('include', 'accounts.google.com')

    // Suponiendo que aquí hay interacciones adicionales con el flujo de autenticación de Google, puedes agregar más comandos aquí

    // Espera 5 segundos para que se complete la autenticación con Google
    cy.wait(500000)

    // Verifica que el usuario haya iniciado sesión correctamente redirigiéndose a la página de inicio
    cy.url().should('include', '/Home')
    cy.contains('Bienvenido a Super Bodega')
  })
})
