Feature: Casos de uso para agregar un producto

  Scenario: Agregar un nuevo producto
    Given que el usuario está en la página de ingreso de productos
    When ingresa los detalles del producto y hace clic en "Agregar Producto"
    Then el producto se agrega correctamente a la base de datos y se muestra un mensaje de éxito

  Scenario: Intentar agregar un producto con un precio negativo
    Given que el usuario está en la página de ingreso de productos
    When ingresa un precio negativo para el producto y hace clic en "Agregar Producto"
    Then se muestra un mensaje de error indicando que el precio no puede ser negativo

  Scenario: Intentar agregar un producto sin nombre
    Given que el usuario está en la página de ingreso de productos
    When intenta agregar un producto sin especificar el nombre y hace clic en "Agregar Producto"
    Then se muestra un mensaje de error indicando que el nombre del producto es obligatorio

  Scenario: Intentar agregar un producto sin especificar la cantidad
    Given que el usuario está en la página de ingreso de productos
    When intenta agregar un producto sin especificar la cantidad y hace clic en "Agregar Producto"
    Then se muestra un mensaje de error indicando que la cantidad del producto es obligatoria

  Scenario: Intentar agregar un producto sin seleccionar una categoría
    Given que el usuario está en la página de ingreso de productos
    When intenta agregar un producto sin seleccionar una categoría y hace clic en "Agregar Producto"
    Then se muestra un mensaje de error indicando que la categoría del producto es obligatoria