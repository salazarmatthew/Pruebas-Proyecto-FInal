Feature: Login Component Testing

  Scenario: Display error for invalid email format
    Given I am on the login page
    When I enter "test" as the email
    And I enter "password123" as the password
    And I click the submit button
    Then I should see "Por favor, ingresa un correo electrónico válido."

  Scenario: Display error for password less than 6 characters
    Given I am on the login page
    When I enter "user@example.com" as the email
    And I enter "pass" as the password
    And I click the submit button
    Then I should see "La contraseña debe tener al menos 6 caracteres."

  Scenario: Successful login with email and password
    Given I am on the login page
    And the user exists in the system
    When I enter the user's email and password
    And I click the submit button
    Then I should be navigated to the home page
    And the user token should be stored in local storage

  Scenario: Failed login with incorrect email and password
    Given I am on the login page
    When I enter an incorrect email or password
    And I click the submit button
    Then I should see "Usuario o contraseña incorrectos."
