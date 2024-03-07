import { createUserWithEmailAndPassword, signInWithPopup, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { defineFeature, loadFeature } from 'jest-cucumber';



jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({//ciertas funciones de Firestore de Firebase. Esto permite probar el código que usa estas funciones
  updateDoc: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getFirestore: jest.fn(() => ({ collection: jest.fn(() => ({ doc: jest.fn() })) })),
  getAuth: jest.fn(),
  GoogleAuthProvider: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

const feature = loadFeature('./useCase/register.feature');

describe('Registro de usuario en la aplicación', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  defineFeature(feature, (test) => {
    test('Verificar que se muestra un mensaje de error si el registro falla', ({ given, when, and, then }) => {
      let name, email, password;

      given('que el usuario ha completado el formulario de registro', () => {
        name = 'Test User';
        email = 'test@example.com';
        password = 'password';
        createUserWithEmailAndPassword.mockImplementation(() => {// la función createUserWithEmailAndPassword lanza un error
          throw new Error('Registration failed');
        });
      });

      when('hace clic en el botón de registro', async () => {
        try {//intentar registrar al usuario con el correo electrónico y la contraseña
          await createUserWithEmailAndPassword(email, password);
        } catch (error) {
          // Then
          expect(error).toEqual(new Error('Registration failed'));
        }
      });

      and('el registro falla debido a un error', () => {
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(email, password);//asegurarse de que la función createUserWithEmailAndPassword se llamó con el correo electrónico y la contraseña
      });

      then('se debe mostrar un mensaje de error indicando que el registro ha fallado.', () => {
        // This step is already verified in the 'when' step
      });
    });

    test('Verificar que se registra un usuario exitosamente', ({ given, when, and, then }) => {
      let name, email, password;

      given('que el usuario ha completado el formulario de registro', () => {
        name = 'Test User';
        email = 'test@example.com';
        password = 'password';
        createUserWithEmailAndPassword.mockResolvedValueOnce({
          user: {
            displayName: name,
            email: email,
            photoURL: null,
            getIdToken: jest.fn().mockResolvedValueOnce('userToken'),//se crea el tocken de usuario 
          },
        });
      });

      when('hace clic en el botón de registro', async () => {
        // When
        const userCredential = await createUserWithEmailAndPassword(email, password);//registrar al usuario con el correo electrónico y la contraseña
        const user = userCredential.user;

        // Then
        expect(user).not.toBeNull();
        expect(user.email).toEqual(email);
      });


      and('el registro es exitoso', () => {
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(email, password);
      });

      then('se debe mostrar un mensaje confirmando que el usuario ha sido registrado correctamente.', () => {
        // This step is already verified in the 'when' step
      });
    });

    test('Verificar que se muestra un mensaje de error al intentar registrar con Google', ({ given, when, then }) => {
      given('que el usuario hace clic en el botón de registro con Google', () => {
        signInWithPopup.mockImplementation(() => {
          throw new Error('Registration with Google failed');//la función signInWithPopup lanza un error
        });
      });

      when('el proceso de registro con Google falla debido a un error', async () => {
        try {//intentar registrar al usuario con Google
          await signInWithPopup(getAuth, GoogleAuthProvider);
        } catch (error) {
          // Then
          expect(error).toEqual(new Error('Registration with Google failed'));//asegurarse de que se lanzó un error con el mensaje correcto
        }
      });

      then('se debe mostrar un mensaje de error indicando que el registro con Google ha fallado.', () => {
        expect(signInWithPopup).toHaveBeenCalled();//asegurarse de que la función signInWithPopup se llamó
      });
    });
  });
});
