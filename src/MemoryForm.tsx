import React from 'react';
import { MemoryFormProps } from './interfaces';

const MemoryForm: React.FC<MemoryFormProps> = ({ memoryValue, memoryEstructure }) => {
  // Transformation logic
const bitsToShift = Math.ceil(Math.log2(memoryEstructure.cantidad_de_marcos));
console.log(bitsToShift, Math.log2(memoryEstructure.cantidad_de_marcos), memoryEstructure.cantidad_de_marcos);
const MemoryReader = {
    bit_permiso: (memoryValue >> (bitsToShift + 5)) & 1,
    bit_referencia: (memoryValue >> (bitsToShift + 4)) & 1,
    bit_modificado: (memoryValue >> (bitsToShift + 3)) & 1,
    bit_presente_ausente: (memoryValue >> (bitsToShift + 2)) & 1,
    bit_cache: (memoryValue >> (bitsToShift + 1)) & 1,
    numero_de_frame: memoryValue & ((1 << bitsToShift) - 1),

};



  return (
    <> 
        <td>{MemoryReader.bit_permiso}</td>
        <td>{MemoryReader.bit_referencia}</td>
        <td>{MemoryReader.bit_modificado}</td>
        <td>{MemoryReader.bit_presente_ausente}</td>
        <td>{MemoryReader.bit_cache}</td>
        <td>{MemoryReader.numero_de_frame.toString(2)}</td>
        <td>{MemoryReader.numero_de_frame}</td>
        <td>{memoryValue}</td>
    </>
  );
};

export default MemoryForm;