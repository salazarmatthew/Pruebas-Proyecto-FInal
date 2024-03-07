
describe('Registro en Google', () => {
    it('debería registrarse exitosamente con Google', () => {
        cy.visit('http://localhost:5173/register')
    
        // Haz clic en el botón de registro con Google
        cy.contains('Registrar con Google').click()
    
        // Espera 3000 ms para que se complete el registro con Google (puedes ajustar este valor según sea necesario)
        cy.wait(200000)
    
        // Verifica que el usuario haya sido redirigido a la página de inicio después del registro
        cy.url().should('include', '/home')
    
        // Verifica que se muestra el mensaje de bienvenida
        cy.contains('Bienvenido a Super Bodega')
      })

    })