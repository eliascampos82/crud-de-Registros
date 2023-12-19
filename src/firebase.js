/* eslint-disable no-unused-vars */
import { getFirestore, collection, getDocs, query, where, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Tus credenciales de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA58LnhKUIRsje9RjSGzwOdzyoBSeoYMc8",
  authDomain: "elias23307cac.firebaseapp.com",
  projectId: "elias23307cac",
  storageBucket: "elias23307cac.appspot.com",
  messagingSenderId: "127993492677",
  appId: "1:127993492677:web:322b765e7e387d1889ecac"
};

// Inicializar la aplicación Firebase
const app = initializeApp(firebaseConfig);

// Obtener una instancia de Firestore
const db = getFirestore(app);

// Función para obtener registros
// Función para obtener registros por DNI
// export const obtenerRegistrosPorDni = async (dni) => {
//   try {
//     // Convertir el valor de dni a número
//     const dniNumber = Number(dni);

//     // Verificar si la conversión fue exitosa
//     if (isNaN(dniNumber)) {
//       // Manejar el caso en el que el valor no sea un número válido
//       console.error('El valor de DNI no es un número válido:', dni);
//       return [];
//     }

//     // Realizar la consulta en la base de datos
//     const q = query(collection(db, 'registros'), where('dni', '==', dniNumber));
//     const querySnapshot = await getDocs(q);
//     const registros = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     return registros;
//   } catch (error) {
//     console.error('Error al obtener registros por DNI: ', error);
//     throw error;
//   }
// };
// nueva
// const obtenerRegistrosPorDni = async (dni) => {
//   try {
//     const dniBusqueda = dni.trim().toLowerCase();
//     const querySnapshot = await getDocs(query(collection(db, 'registros'), where('dni', '==', dniBusqueda)));
//     const registros = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     console.log('Registros encontrados:', registros);
//     const registroEncontrado = registros.length > 0 ? registros[0] : null;
//     console.log('Registro encontrado:', registroEncontrado);
//     return registroEncontrado;
//   } catch (error) {
//     console.error('Error al obtener registros por DNI: ', error);
//     throw error;
//   }
// };
const obtenerRegistrosPorDni = async (dni) => {
  try {
    const querySnapshot = await getDocs(query(collection(db, 'registros'), where('dni', '==', dni)));
    const registros = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return registros.length > 0 ? registros : null;
  } catch (error) {
    console.error('Error al obtener registros por DNI: ', error);
    throw error;
  }
};

export {obtenerRegistrosPorDni};
// const obtenerRegistrosPorDni = async (dni) => {
//   try {
//     const querySnapshot = await getDocs(query(collection(db, 'registros'), where('dni', '==', dni)));
//     const registros = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     return registros.length > 0 ? registros[0] : null;
//   } catch (error) {
//     console.error('Error al obtener registros por DNI: ', error);
//     throw error;
//   }
// };
// export {obtenerRegistrosPorDni};

// Función para obtener registros
// En firebase.js
// export const obtenerRegistros = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, 'registros'));
//     const registros = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     console.log('Registros obtenidos:', registros);
//     return registros;
//   } catch (error) {
//     console.error('Error al obtener registros: ', error);
//     throw error;
//   }
// };
export const obtenerRegistros = async () => {
  try {
    // Fetch records from the 'registros' collection
    const querySnapshot = await getDocs(collection(db, 'registros'));

    // Map the documents to an array of objects containing id and data
    const registros = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Log the obtained records to the console
    console.log('Registros obtenidos:', registros);

    // Return the obtained records
    return registros;
  } catch (error) {
    // Log and rethrow the error
    console.error('Error al obtener registros: ', error);
    throw error;
  }
};
// export const obtenerRegistros = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, 'registros'));
//     const registros = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     return registros;
//   } catch (error) {
//     console.error('Error al obtener registros: ', error);
//     throw error;
//   }
// };

// Función para agregar un nuevo registro
export const agregarRegistro = async (nuevoRegistro) => {
  try {
    const docRef = await addDoc(collection(db, 'registros'), nuevoRegistro);
    return docRef.id;
  } catch (error) {
    console.error('Error al agregar registro: ', error);
    throw error;
  }
};

// Función para eliminar un registro por ID
// firebase.js
// Update the eliminarRegistro function in your firebase.js file or wherever it's defined
// Update the eliminarRegistro function in your firebase.js file or wherever it's defined
// ...

// Función para eliminar un registro por ID
// Función para eliminar un registro por ID
// Función para eliminar un registro por ID
// En tu archivo firebase.js
export const eliminarRegistro = async (id) => {
  try {
    console.log(`Eliminando registro con ID: ${id}`);
    await deleteDoc(doc(db, 'registros', id));
    console.log(`Registro con ID ${id} eliminado con éxito.`);
  } catch (error) {
    console.error(`Error al eliminar registro con ID ${id}: `, error);
    throw error;
  }
};







// ...






// Función para modificar un registro por ID
export const modificarRegistro = async (registroId, nuevosDatos) => {
  try {
    const registroRef = doc(db, 'registros', registroId);
    await updateDoc(registroRef, nuevosDatos);
    return 'Registro modificado correctamente';
  } catch (error) {
    console.error('Error al modificar registro: ', error);
    throw error;
  }
};

export { app, db };

// import { doc, deleteDoc, getFirestore } from 'firebase/firestore';
// import { collection, getDocs, query, where, addDoc,updateDoc } from 'firebase/firestore';
// import { initializeApp } from 'firebase/app';
// //import { firestore } from './firebaseConfig';
// // Tus credenciales de Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyA58LnhKUIRsje9RjSGzwOdzyoBSeoYMc8",
//   authDomain: "elias23307cac.firebaseapp.com",
//   projectId: "elias23307cac",
//   storageBucket: "elias23307cac.appspot.com",
//   messagingSenderId: "127993492677",
//   appId: "1:127993492677:web:322b765e7e387d1889ecac"
// };

// // Inicializar la aplicación Firebase
// const app = initializeApp(firebaseConfig);

// // Obtener una instancia de Firestore
// const db = getFirestore(app);

// // Función para obtener registros
// // export const obtenerRegistrosPorDni = async (dni) => {
// //   try {
// //     const q = query(collection(db, 'registros'), where(dni, '==', dni));
// //     const querySnapshot = await getDocs(q);
// //     const registros = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// //     return registros;
// //   } catch (error) {
// //     console.error('Error al obtener registros por DNI: ', error);
// //     throw error;
// //   }
// // };
// export const obtenerRegistrosPorDni = async (dni) => {
//   try {
//     // Use the 'dni' field for querying
//     const q = query(collection(db, 'registros'), where('dni', '==', dni));
//     const querySnapshot = await getDocs(q);
//     const registros = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     return registros;
//   } catch (error) {
//     console.error('Error al obtener registros por DNI: ', error);
//     throw error;
//   }
// };

// export const obtenerRegistros = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'registros'));
//       const registros = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       return registros;
//     } catch (error) {
//       console.error('Error al obtener registros: ', error);
//       throw error;
//     }
//   };
// // Función para agregar un nuevo registro
// export const agregarRegistro = async (nuevoRegistro) => {
//   try {
//     const docRef = await addDoc(collection(db, 'registros'), nuevoRegistro);
//     return docRef.id;
//   } catch (error) {
//     console.error('Error al agregar registro: ', error);
//     throw error;
//   }
// };

// // Función para eliminar un registro por ID
// // Función para eliminar un registro por ID
// // ...

// // Función para eliminar un registro por ID
// // Función para eliminar un registro por ID
// // ...

// // Función para eliminar un registro por ID
// // export const eliminarRegistro = async (id) => {
// //   try {
// //     // Obtener referencia al documento que se desea eliminar
// //     const registroRef = doc(db, 'registros', id);

// //     console.log(`Intentando eliminar el registro con ID: ${id}`);

// //     // Eliminar el documento
// //     await deleteDoc(registroRef);

// //     console.log(`Registro con ID ${id} eliminado con éxito.`);
// //   } catch (error) {
// //     console.error(`Error al eliminar el registro con ID ${id}: `, error);

// //     if (error.code === 'not-found') {
// //       console.error(`El registro con ID ${id} no fue encontrado.`);
// //     }

// //     throw error; // Propagar el error para manejarlo en el componente EliminarRegistros
// //   }
// // };
// // Update the eliminarRegistro function in your firebase.js file or wherever it's defined
// // Import necessary functions from Firebase SDK

// // Assuming 'db' is your Firestore instance
// //const db = getFirestore();

// // Function to delete a record by ID
// export const eliminarRegistro = async (id) => {
//   try {
//     const registroRef = doc(db, 'registros', id);
//     await deleteDoc(registroRef);
//     console.log(`Record with ID ${id} deleted successfully.`);
//   } catch (error) {
//     console.error(`Error deleting record with ID ${id}: `, error);
//     throw error;
//   }
// };











// // Función para modificar un registro por ID
// export const modificarRegistro = async (registroId, nuevosDatos) => {
//   try {
//     const registroRef = doc(db, 'registros', registroId);
//     await updateDoc(registroRef, nuevosDatos);
//     return 'Registro modificado correctamente';
//   } catch (error) {
//     console.error('Error al modificar registro: ', error);
//     throw error;
//   }
// };

// export { app, db };
