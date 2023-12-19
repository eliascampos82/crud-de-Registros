// validaciones.js
// export const validarDNI = (dni) => /^\d{8}$/.test(dni);
// export const validarDNI = (dni) => {
//     // Convert the input to a number
//     const dniNumber = Number(dni);
  
//     // Check if the conversion was successful and it's a valid number
//     return !isNaN(dniNumber) && Number.isInteger(dniNumber) && dniNumber.toString().length === 8;
//   };
  
// export const validarDNI = (dni) => /^\d{8}$/.test(dni);
export const validarDNI = (dni) => {
  // Verificar que el DNI sea una cadena de 8 dígitos numéricos
  return /^[0-9]{8}$/.test(dni);
};

export const validarNombreApellido = (nombreApellido) => /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombreApellido);

export const validarNombreApellidoConValor = (valor) => /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(valor);
