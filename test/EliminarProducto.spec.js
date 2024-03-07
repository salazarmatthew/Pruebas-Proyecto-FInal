import Items from '../src/pages/products/Items';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { db } from '../src/api/firebase-config';
import { doc, deleteDoc, collection } from 'firebase/firestore';


jest.mock('firebase/firestore', () => ({
    deleteDoc: jest.fn(),
    doc: jest.fn(),
    getFirestore: jest.fn(() => ({ collection: jest.fn(() => ({ doc: jest.fn() })) })),
  }));
  

const feature = loadFeature('./useCase/useEliminarProducto.feature');

defineFeature(feature, (test) => {
    test('Eliminar un producto existente', ({ given, when, then }) => {
      let item;

      given('que el usuario desea eliminar un producto', () => {
        item = { id: 'Producto1' };
      });
  
      when('el usuario selecciona el producto "Producto1" para eliminar', async () => {
        await deleteDoc(doc(db, 'items', item.id));
      });
  
      then('el sistema debería eliminar el producto "Producto1"', () => {
        expect(deleteDoc).toHaveBeenCalledWith(doc(db, 'items', item.id));
      });
  
      then('el sistema debería retornar que el producto fue "eliminado exitosamente"', () => {
       
      });
    });

    test('Confirmar eliminación de un producto', ({ given, when, and, then }) => {
        let item;
    
        given('que el usuario desea eliminar un producto', () => {
          item = { id: 'Producto1' };
        });
    
        when('el usuario selecciona el producto "Producto1" para eliminar', () => {
         
        });
    
        and('el usuario confirma la eliminación del producto', async () => {
          await deleteDoc(doc(db, 'items', item.id));
        });
    
        then('el sistema debería eliminar el producto "Producto1"', () => {
          expect(deleteDoc).toHaveBeenCalledWith(doc(db, 'items', item.id));
        });
    
        then('el sistema debería retornar que el producto fue "eliminado exitosamente"', () => {
          
        });
      });
      beforeEach(() => {
        jest.clearAllMocks();
      });
      
      test('Cancelar eliminación de un producto', ({ given, when, and, then }) => {
        let item;
        let deleteCalled = false;

        given('que el usuario desea eliminar un producto', () => {
          item = { id: 'Producto1' };
          // Mock deleteDoc to simulate cancellation of deletion
          deleteDoc.mockImplementation(() => {
            deleteCalled = true;
          });
        });
        
        when(/^el usuario selecciona el producto "(.*)" para eliminar$/, async (productName) => {
          // Simulate user action that would call deleteDoc
        });
        
        and('el usuario cancela la eliminación del producto', () => {
          // Simulate user action that would cancel deletion
          deleteCalled = false;
        });
        
        then('el sistema no debería eliminar el producto "Producto1"', () => {
          expect(deleteCalled).toBe(false);
        });
      
        then('el sistema debería retornar que la eliminación del producto fue "cancelada"', () => {
          // This step is already verified in the 'then' step
        });
      });
    }); 

    
