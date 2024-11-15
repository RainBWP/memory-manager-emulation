import React from 'react';
import { MemoryFormProps } from './interfaces';

const MemoryForm: React.FC<MemoryFormProps> = ({ memoryValue, memoryEstructure }) => {

  // Número de marcos en la memoria física
  //const numeroDeMarcos =  Math.log2(memoryEstructure.tamano_de_virtual*1024) - Math.log2(memoryEstructure.tamano_de_fisica*1024);

  // Bits necesarios para representar los marcos de página
  //const bitsToShift = numeroDeMarcos;

  // console.log("Bits que mueve", bitsToShift);
  // console.log("Valor de Memoria 2: ", memoryValue.toString(2));

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
      <td>{stringOfBits(memoryValue)}</td>
      <td>{memoryValue}</td>
      <td>{stringOfHexa(memoryValue)}</td>
    </>
  );
};

export default MemoryForm;