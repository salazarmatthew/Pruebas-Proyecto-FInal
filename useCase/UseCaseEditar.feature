Feature: Editar producto

  Scenario: El usuario edita un producto existente
    Given que el usuario desea editar un producto
    When el usuario selecciona el producto "Producto1" para editar
    Then el sistema debería editar el producto "Producto1"
    And el sistema debería retornar que el producto fue "editado exitosamente"

  Scenario: El usuario intenta editar un producto con un nombre que ya está en uso
      Given que el usuario ha iniciado sesión en la aplicación
      And el producto "Producto1" existe en la lista de productos
      And el producto "Producto2" también existe en la lista de productos
      When el usuario hace clic en el botón de edición del producto "Producto1"
      When el usuario cambia el nombre del producto a "Producto2"
      And el usuario hace clic en el botón de guardar
      Then el sistema debería mostrar un mensaje de error que diga "Ya existe un producto con ese nombre"