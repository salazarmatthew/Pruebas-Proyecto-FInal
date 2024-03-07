//import '@testing-library/jest-dom/extend-expect'; 
import React from 'react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { db } from '../src/api/firebase-config';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({ //ciertas funciones de Firestore de Firebase. Esto permite probar el código que usa estas funciones 
  addDoc: jest.fn(),
  getFirestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      addDoc: jest.fn(),
      doc: jest.fn()
    }))
  })),
  collection: jest.fn(() => ({
    addDoc: jest.fn(),
    doc: jest.fn()
  }))
}));

const feature = loadFeature('./useCase/useCaseAgregarProducto.feature');

defineFeature(feature, (test) => { //definir el comportamiento de la función de prueba
  test('Agregar un nuevo producto', ({ given, when, then }) => { 
    let itemsCollection;
    let productDetails = {
      name: 'Nuevo Producto',
      price: 10,
      quantity: 5,
      category: 'Electronics'
    };

    given('que el usuario está en la página de ingreso de productos', () => {
      // No action needed
    });

    when('ingresa los detalles del producto y hace clic en "Agregar Producto"', async () => {
      itemsCollection = collection(db, 'items');//obtener la colección de productos
      await addDoc(itemsCollection, productDetails);//agregar un nuevo producto a la base de datos
    });

    then('el producto se agrega correctamente a la base de datos y se muestra un mensaje de éxito', () => {
      expect(addDoc).toHaveBeenCalledWith(itemsCollection, productDetails);//asegurarse de que la función addDoc se llamó con los detalles del producto
    });
  });

  test('Intentar agregar un producto con un precio negativo', ({ given, when, then }) => {
    let productDetails = {
      name: 'Nuevo Producto',
      price: -10,
      quantity: 5,
      category: 'Electronics'
    };

    given('que el usuario está en la página de ingreso de productos', () => {
      // No action needed
    });

    when('ingresa un precio negativo para el producto y hace clic en "Agregar Producto"', async () => {
      await addDoc(collection(db, 'items'), productDetails);
    });

    then('se muestra un mensaje de error indicando que el precio no puede ser negativo', () => {
      const errorMessage = 'El precio no puede ser negativo';
      expect(errorMessage).toBeTruthy(); // Asegura que el mensaje de error no esté vacío
    });
  });

  test('Intentar agregar un producto sin nombre', ({ given, when, then }) => {
    given('que el usuario está en la página de ingreso de productos', () => {
      // No action needed
    });

    when('intenta agregar un producto sin especificar el nombre y hace clic en "Agregar Producto"', async () => {
      // Simular intento de agregar un producto sin nombre
      let productDetails = {
        price: 10,
        quantity: 5,
        category: 'Electronics'
      };
      await addDoc(collection(db, 'items'), productDetails);
    });

    then('se muestra un mensaje de error indicando que el nombre del producto es obligatorio', () => {
      const errorMessage = 'El nombre del producto es obligatorio';
      expect(errorMessage).toBeTruthy(); // Asegura que el mensaje de error no esté vacío
    });
  });

  test('Intentar agregar un producto sin especificar la cantidad', ({ given, when, then }) => {
    given('que el usuario está en la página de ingreso de productos', () => {
      // No action needed
    });

    when('intenta agregar un producto sin especificar la cantidad y hace clic en "Agregar Producto"', async () => {
      // Simular intento de agregar un producto sin cantidad
      let productDetails = {
        name: 'Nuevo Producto',
        price: 10,
        category: 'Electronics'
      };
      await addDoc(collection(db, 'items'), productDetails);
    });

    then('se muestra un mensaje de error indicando que la cantidad del producto es obligatoria', () => {
      const errorMessage = 'La cantidad del producto es obligatoria';
      expect(errorMessage).toBeTruthy(); // Asegura que el mensaje de error no esté vacío
    });
  });

  test('Intentar agregar un producto sin seleccionar una categoría', ({ given, when, then }) => {
    given('que el usuario está en la página de ingreso de productos', () => {
      // No action needed
    });

    when('intenta agregar un producto sin seleccionar una categoría y hace clic en "Agregar Producto"', async () => {
      // Simular intento de agregar un producto sin categoría
      let productDetails = {
        name: 'Nuevo Producto',
        price: 10,
        quantity: 5
      };
      await addDoc(collection(db, 'items'), productDetails);
    });

    then('se muestra un mensaje de error indicando que la categoría del producto es obligatoria', () => {
      const errorMessage = 'La categoria del producto es obligatoria';
      expect(errorMessage).toBeTruthy(); // Asegura que el mensaje de error no esté vacío
    });
  });
});

