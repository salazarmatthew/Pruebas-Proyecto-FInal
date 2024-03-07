// cypress/integration/register.spec.js

describe('Registro con formulario ', () => {
    it('debería registrarse exitosamente con correo y contraseña', () => {
      cy.visit('http://localhost:5173/register')
  
      cy.get('[name="name"]').type('Paola').wait(700) // Espera 500 ms después de escribir el nombre
      cy.get('[name="email"]').type('apmoncayo071@gmail.com').wait(700) // Espera 500 ms después de escribir el correo
      cy.get('[name="password"]').type('password').wait(700) // Espera 500 ms después de escribir la contraseña
      cy.get('button[type="submit"]').click() // Envía el formulario de registro
  
      // Espera 3000 ms para que se complete el registro (puedes ajustar este valor según sea necesario)
      cy.wait(10000)
  
      // Verifica que el usuario haya sido redirigido a la página de inicio después del registro
      cy.url().should('include', '/home')
  
      // Verifica que se muestra el mensaje de bienvenida
      cy.contains('Bienvenido a Super Bodega')
    })
  })
  