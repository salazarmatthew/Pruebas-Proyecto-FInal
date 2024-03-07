Feature: Función para eliminar un producto

Scenario: Eliminar un producto existente 
Given que el usuario desea eliminar un producto 
When el usuario selecciona el producto "Producto1" para eliminar 
Then el sistema debería eliminar el producto "Producto1" 
And el sistema debería retornar que el producto fue "eliminado exitosamente"


Scenario: Confirmar eliminación de un producto 
Given que el usuario desea eliminar un producto 
When el usuario selecciona el producto "Producto1" para eliminar 
And el usuario confirma la eliminación del producto 
Then el sistema debería eliminar el producto "Producto1" 
And el sistema debería retornar que el producto fue "eliminado exitosamente"

Scenario: Cancelar eliminación de un producto 
Given que el usuario desea eliminar un producto 
When el usuario selecciona el producto "Producto1" para eliminar 
And el usuario cancela la eliminación del producto 
Then el sistema no debería eliminar el producto "Producto1" 
And el sistema debería retornar que la eliminación del producto fue "cancelada"