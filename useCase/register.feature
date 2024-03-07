Feature: Registro de usuario en la aplicación

  Scenario: Verificar que se muestra un mensaje de error si el registro falla
    Given que el usuario ha completado el formulario de registro
    When hace clic en el botón de registro
    And el registro falla debido a un error
    Then se debe mostrar un mensaje de error indicando que el registro ha fallado.

  Scenario: Verificar que se registra un usuario exitosamente
    Given que el usuario ha completado el formulario de registro
    When hace clic en el botón de registro
    And el registro es exitoso
    Then se debe mostrar un mensaje confirmando que el usuario ha sido registrado correctamente.

  Scenario: Verificar que se muestra un mensaje de error al intentar registrar con Google
    Given que el usuario hace clic en el botón de registro con Google
    When el proceso de registro con Google falla debido a un error
    Then se debe mostrar un mensaje de error indicando que el registro con Google ha fallado.