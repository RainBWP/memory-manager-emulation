import React from 'react';
import { MemoryFormProps } from './interfaces';

const MemoryForm: React.FC<MemoryFormProps> = ({ memoryValue, memoryEstructure }) => {

  // Número de marcos en la memoria física
  const numeroDeMarcos =  Math.log2(memoryEstructure.tamano_de_virtual*1024) - Math.log2(memoryEstructure.tamano_de_fisica*1024);

  // Bits necesarios para representar los marcos de página
  const bitsToShift = Math.ceil(numeroDeMarcos);
  console.log("Bits que mueve", bitsToShift);
  console.log("Valor de Memoria 2: ", memoryValue.toString(2));

  const MemoryReader = {
    bit_permiso: (memoryValue >> (bitsToShift + 5)) & 1,
    bit_referencia: (memoryValue >> (bitsToShift + 4)) & 1,
    bit_modificado: (memoryValue >> (bitsToShift + 3)) & 1,
    bit_presente_ausente: (memoryValue >> (bitsToShift + 2)) & 1,
    bit_cache: (memoryValue >> (bitsToShift + 1)) & 1,
    numero_de_frame: memoryValue & ((1 << bitsToShift) - 1),
  };

  console.log("Bits que mueve", bitsToShift);
  console.log("Valor de Memoria 2: ", memoryValue.toString(2));

  const stringOfBits = (number:number) => {
    let frameString = "";
    for (let i = Math.log2(memoryEstructure.tamano_de_pagina) - 1; i >= 0; i--) {
      frameString += (number >> i) & 1 ? "1" : "0";
    }
    return frameString;
  };

  const stringOfHexa = (number:number) => {
    return number.toString(16).toUpperCase();
  }


  return (
    <>
      <td>{MemoryReader.bit_permiso}</td>
      <td>{MemoryReader.bit_referencia}</td>
      <td>{MemoryReader.bit_modificado}</td>
      <td>{MemoryReader.bit_presente_ausente}</td>
      <td>{MemoryReader.bit_cache}</td>
      <td>{stringOfBits(MemoryReader.numero_de_frame)}</td>
      <td>{MemoryReader.numero_de_frame}</td>
      <td>{memoryValue}</td>
      <td>{stringOfHexa(memoryValue)}</td>
    </>
  );
};

export default MemoryForm;