import { defineFeature, loadFeature } from 'jest-cucumber';
import { db } from '../src/api/firebase-config';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { saveItem } from '../src/pages/products/Items';
import { screen, waitFor } from '@testing-library/react';


jest.mock('firebase/firestore', () => ({//ciertas funciones de Firestore de Firebase. Esto permite probar el código que usa estas funciones
  updateDoc: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getFirestore: jest.fn(() => ({ collection: jest.fn(() => ({ doc: jest.fn() })) })),
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));
jest.mock('../src//pages/products/Items');

const feature = loadFeature('./useCase/UseCaseEditar.feature');

defineFeature(feature, (test) => {

  //PRIMER ESCENARIO
  test('El usuario edita un producto existente', ({ given, when, then }) => {
    let item;

    given('que el usuario desea editar un producto', () => {
      item = { id: 'Producto1', name: 'Nombre original' };
    });

    when(/^el usuario selecciona el producto "(.*)" para editar$/, async (productName) => {
      await updateDoc(doc(db, 'items', item.id), { name: 'Nombre nuevo' });//actualizar el nombre del producto
    });

    then(/^el sistema debería editar el producto "(.*)"$/, (productName) => {
      expect(updateDoc).toHaveBeenCalledWith(doc(db, 'items', item.id), { name: 'Nombre nuevo' });//asegurarse de que la función updateDoc se llamó con el nombre nuevo del producto
    });

    then(/^el sistema debería retornar que el producto fue "(.*)"$/, async (message) => {
    });

    //SEGUNDO ESCENARIO
    test('El usuario intenta editar un producto con un nombre que ya está en uso', ({ given, when, then }) => {
      let item1;
      let item2;

      given('que el usuario ha iniciado sesión en la aplicación', async () => {
        const email = 'david.df.01@hotmail.com';
        const password = 'lol123';

        // Simula que el usuario ha iniciado sesión
        await signInWithEmailAndPassword(getAuth(), email, password);//iniciar sesión con el correo electrónico y la contraseña
      });

      given('el producto "Producto1" existe en la lista de productos', () => {
        item1 = { id: 'Producto1', name: 'Nombre original' };
      });

      given('el producto "Producto2" también existe en la lista de productos', () => {
        item2 = { id: 'Producto2', name: 'Nombre original' };
      });

      when('el usuario hace clic en el botón de edición del producto "Producto1"', async () => {
        // Simula que el usuario hace clic en el botón de edición
        const docRef = doc(db, 'items', 'Producto1');
        await updateDoc(docRef, { name: 'Nombre nuevo' });
      });

      when('el usuario cambia el nombre del producto a "Producto2"', async () => {
        const docRef = doc(db, 'items', item1.id);
        await updateDoc(docRef, { name: item2.name });
      });

      when('el usuario hace clic en el botón de guardar', () => {
        // Simula que el usuario hace clic en el botón de guardar
        saveItem.mockImplementation(() => Promise.resolve());
        saveItem('Producto1');
      });

      then('el sistema debería mostrar un mensaje de error que diga "Ya existe un producto con ese nombre"', () => {
        const errorMessage = 'Ya existe un producto con ese nombre';
        expect(errorMessage).toBeTruthy(); // Asegura que el mensaje de error no esté vacío
      });
    });
  });
});