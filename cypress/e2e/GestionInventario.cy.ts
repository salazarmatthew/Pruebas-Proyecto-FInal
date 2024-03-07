/// <reference types="cypress" />
describe('Gestionar Inventario', () => {
    beforeEach(() => {
        // Visita la página de inicio de sesión solo una vez
        cy.visit('http://localhost:5173/login')

        // Ingresa el correo electrónico y la contraseña
        cy.get('[type="email"]').type('apmoncayo07@gmail.com') 
        cy.get('[type="password"]').type('password') 

        // Haz clic en el botón de inicio de sesión
        cy.contains('Entrar').click()

        // Espera a que la página de inicio cargue completamente
        cy.wait(3000);

        // Verifica que el usuario haya iniciado sesión redirigiendo a la página de inicio
        cy.url().should('include', '/home')

        // Verifica que se muestre el mensaje de bienvenida
        cy.contains('Bienvenido a Super Bodega').should('be.visible')

        // Visita la página de inventario antes de cada prueba
        cy.visit('http://localhost:5173/items')

        // Espera a que la página de inventario cargue completamente
        cy.wait(3000);
    });

    it('debería mostrar la lista de productos', () => {
        // Verifica que la lista de productos esté visible
        cy.contains('Listado de Productos').should('be.visible');
        
        // Espera 7 segundos después de completar la prueba
        cy.wait(7000);
    });

    it('debería editar un producto', () => {
        // Haz clic en el botón de editar del primer producto
        cy.get('.btn-info').first().click();

        // Realiza las modificaciones en los campos
        cy.get('[name="name"]').clear().type('Producto Modificado');
        cy.get('[name="quantity"]').clear().type('20');
        cy.get('[name="category"]').clear().type('Nuevo Categoria');
        cy.get('[name="price"]').clear().type('25.99');

        // Guarda los cambios sin redireccionar
        cy.contains('Guardar Cambios').click();

        // Espera 7 segundos después de completar la prueba
        cy.wait(7000);
    });

    it('debería desactivar un producto', () => {
        // Haz clic en el botón de desactivar del primer producto
        cy.get('.btn-warning').first().click();

        // Espera 7 segundos después de completar la prueba
        cy.wait(7000);
    });

    it('debería activar un producto', () => {
        // Haz clic en el botón de activar del primer producto
        cy.get('.btn-warning').first().click();

        // Espera 7 segundos después de completar la prueba
        cy.wait(7000);
    });

    it('debería eliminar un producto', () => {
        // Haz clic en el botón de eliminar del primer producto
        cy.get('.btn-danger').first().click();
        
        // Confirma la eliminación
        cy.contains('Confirmar Eliminación').should('be.visible');
        cy.contains('Borrar').click();

        // Espera 7 segundos después de completar la prueba
        cy.wait(7000);
    });
});
