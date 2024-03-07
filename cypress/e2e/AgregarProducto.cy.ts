/// <reference types="cypress" />
describe('Agregar Producto', () => {
    it('debería iniciar sesión exitosamente con correo y contraseña y luego agregar un producto', () => {
        // Visita la página de inicio de sesión
        cy.visit('http://localhost:5173/login')

        // Ingresa el correo electrónico y la contraseña
        cy.get('[type="email"]').type('apmoncayo07@gmail.com') // Cambia 'usuario@example.com' por tu correo electrónico de prueba
        cy.wait(3000); // Espera 3 segundos

        cy.get('[type="password"]').type('password') // Cambia 'contraseña123' por tu contraseña de prueba
        cy.wait(3000); // Espera 3 segundos

        // Haz clic en el botón de inicio de sesión
        cy.contains('Entrar').click()
        cy.wait(3000); // Espera 3 segundos

        // Verifica que el usuario haya iniciado sesión redirigiendo a la página de inicio
        cy.url().should('include', '/home')
        cy.wait(3000); // Espera 3 segundos

        // Verifica que se muestre el mensaje de bienvenida
        cy.contains('Bienvenido a Super Bodega').should('be.visible')
        cy.wait(3000); // Espera 3 segundos

        // Visita la página de agregar producto
        cy.visit('http://localhost:5173/add-item')
        cy.wait(3000); // Espera 3 segundos

        // Llena el formulario con los datos del producto
        cy.get('[name="name"]').type('Producto de Prueba') // Escribe el nombre del producto
        cy.wait(3000); // Espera 3 segundos

        cy.get('[name="quantity"]').type('10') // Escribe la cantidad del producto
        cy.wait(3000); // Espera 3 segundos

        cy.get('[name="category"]').select('Bebida') // Selecciona la categoría del producto
        cy.wait(3000); // Espera 3 segundos

        cy.get('[name="price"]').type('15.99') // Escribe el precio del producto
        cy.wait(3000); // Espera 3 segundos

        cy.get('[name="description"]').type('Este es un producto de prueba') // Escribe la descripción del producto
        cy.wait(3000); // Espera 3 segundos

        // Haz clic en el botón "Agregar Producto"
        cy.contains('Agregar Producto').click()
        cy.wait(3000); // Espera 3 segundos

        // Espera a que se muestre el mensaje de éxito
        cy.contains('El artículo se ha agregado correctamente.').should('be.visible')
        cy.wait(3000); // Espera 3 segundos

        // Verifica que el producto se agregó correctamente redirigiendo a la página de inicio
        cy.url().should('include', '/Home')
        cy.wait(3000); // Espera 3 segundos
    })
})