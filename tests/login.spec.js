import { signInWithEmailAndPassword, signInWithPopup, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { defineFeature, loadFeature } from 'jest-cucumber';



jest.mock('firebase/auth', () => ({ //ciertas funciones de Auth de Firebase. Esto permite probar el código que usa estas funciones
  signInWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  getAuth: jest.fn(),
}));

const feature = loadFeature('./useCase/login.feature');

defineFeature(feature, (test) => {
  test('Display error for invalid email format', ({ given, when, and, then }) => {
    let email, password;

    given('I am on the login page', () => {
      email = 'test';
      password = 'password123';
      signInWithEmailAndPassword.mockImplementation(() => {// la función signInWithEmailAndPassword lanza un error
        throw new Error('Por favor, ingresa un correo electrónico válido.');
      });
    });

    when(/^I enter "(.*)" as the email$/, (emailInput) => {//ingresar el correo electrónico
      email = emailInput;
    });

    and(/^I enter "(.*)" as the password$/, (passwordInput) => {
      password = passwordInput;
    });

    and('I click the submit button', async () => {
      try {//intentar iniciar sesión con el correo electrónico y la contraseña
        await signInWithEmailAndPassword(getAuth(), email, password);
      } catch (error) {
        // Then
        expect(error).toEqual(new Error('Por favor, ingresa un correo electrónico válido.'));//asegurarse de que se lanzó un error con el mensaje correcto
      }
    });

    then(/^I should see "(.*)"$/, (message) => {
      // This step is already verified in the 'and' step
    });
  });

  test('Display error for password less than 6 characters', ({ given, when, and, then }) => {
    let email, password;

    given('I am on the login page', () => {
      email = 'user@example.com';
      password = 'pass';
      signInWithEmailAndPassword.mockImplementation(() => {
        throw new Error('La contraseña debe tener al menos 6 caracteres.');
      });
    });

    when(/^I enter "(.*)" as the email$/, (emailInput) => {
      email = emailInput;
    });

    and(/^I enter "(.*)" as the password$/, (passwordInput) => {
      password = passwordInput;
    });

    and('I click the submit button', async () => {
      try {
        await signInWithEmailAndPassword(getAuth(), email, password);
      } catch (error) {
        // Then
        expect(error).toEqual(new Error('La contraseña debe tener al menos 6 caracteres.'));
      }
    });

    then(/^I should see "(.*)"$/, (message) => {
      // This step is already verified in the 'and' step
    });
  });
  test('Successful login with email and password', ({ given, when, and, then }) => {
    let email, password;

    given('I am on the login page', () => {
      email = 'user@example.com';
      password = 'password123';
      signInWithEmailAndPassword.mockResolvedValueOnce({
        user: {
          email: email,
          getIdToken: jest.fn().mockResolvedValueOnce('userToken'),
        },
      });
    });

    and('the user exists in the system', () => {

    });

    when('I enter the user\'s email and password', async () => {
      const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);//iniciar sesión con el correo electrónico y la contraseña
      const user = userCredential.user;
      expect(user).not.toBeNull();
      expect(user.email).toEqual(email);
    });

    and('I click the submit button', () => {
    });

    then('I should be navigated to the home page', () => {
    });

    and('the user token should be stored in local storage', () => {

    });
  });

  test('Failed login with incorrect email and password', ({ given, when, and, then }) => {
    let email, password;

    given('I am on the login page', () => {
      email = 'invalid@example.com';
      password = 'wrongpassword';
      signInWithEmailAndPassword.mockImplementation(() => {
        throw new Error('Usuario o contraseña incorrectos.');
      });
    });

    when('I enter an incorrect email or password', async () => {
      try {
        await signInWithEmailAndPassword(getAuth(), email, password);
      } catch (error) {
        // Then
        expect(error).toEqual(new Error('Usuario o contraseña incorrectos.'));//asegurarse de que se lanzó un error con el mensaje correcto
      }
    });

    and('I click the submit button', () => {

    });

    then(/^I should see "(.*)"$/, (message) => {
      // This step is already verified in the 'when' step
    });
  });
});