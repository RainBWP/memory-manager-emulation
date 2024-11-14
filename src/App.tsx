import './interfaces.tsx';
import ImportFile from './ImportFile.tsx';
import { useState } from 'react';
import { EstructuraDeMemoria, MemoriaFisica } from './interfaces.tsx';
import MemoryForm from './MemoryForm.tsx';
import LecturaDeDatos from './OrdenamientoDeMemoria.tsx';

const convertirAPequenos = (valor: number) => {
  return valor * 1024;
  
};

const defaultMemory: EstructuraDeMemoria = {
  tamano_de_pagina: 0,
  tamano_de_virtual: 0,
  tamano_de_fisica: 0,
  numero_de_paginas: 0,
};

const useStorage = () => {
  const [EstructuraDeMemoriaLocal, setEstructuraDeMemoria] = useState<EstructuraDeMemoria>(defaultMemory);
  const [MemoriaFisicaLocal, setMemoriaFisica] = useState<MemoriaFisica>({ memoryValues: [] });

  const set = (data: { EstructuraDeMemoria: EstructuraDeMemoria; MemoriaFisica: MemoriaFisica }) => {
    setEstructuraDeMemoria(data.EstructuraDeMemoria);
    setMemoriaFisica(data.MemoriaFisica);
  };

  return {
    EstructuraDeMemoriaLocal,
    MemoriaFisicaLocal,
    set,
  };
};

function App() {
  const { EstructuraDeMemoriaLocal, MemoriaFisicaLocal, set } = useStorage();

  return (
    <>
      <div>
        <h1>Traductor de Direccion Fisica a Direccion Virtual</h1>
        <p>Ingresar una posible Explicacion</p>
      </div>

      <ImportFile onImport={set} />

      <LecturaDeDatos 
      MemoriaVirtual={MemoriaFisicaLocal.memoryValues}
      EstructuraDeMemoria={EstructuraDeMemoriaLocal}
      />

      <div className='container'>
        <h2>Memoria Estructura</h2>
        <p><b>Tamano De Pagina: </b><code>{EstructuraDeMemoriaLocal.tamano_de_pagina} bytes</code></p>
        <p><b>Tamano de Memoria Virtual: </b><code>{EstructuraDeMemoriaLocal.tamano_de_virtual} kb = {convertirAPequenos(EstructuraDeMemoriaLocal.tamano_de_virtual)} bytes = {Math.log2(convertirAPequenos(EstructuraDeMemoriaLocal.tamano_de_virtual))} bits</code></p>
        <p><b>Tamano de Memoria Fisica: </b><code>{EstructuraDeMemoriaLocal.tamano_de_fisica} kb = {convertirAPequenos(EstructuraDeMemoriaLocal.tamano_de_fisica)} bytes = {Math.log2(convertirAPequenos(EstructuraDeMemoriaLocal.tamano_de_fisica))} bits</code></p>
        <p><b>Numero de Paginas: </b><code>{EstructuraDeMemoriaLocal.numero_de_paginas}</code></p>
        <h2>Memoria Fisica</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Binario</th>
              <th>Decimal</th>
              <th>Hexadecimal</th>
            </tr>
          </thead>
          <tbody>
            {MemoriaFisicaLocal.memoryValues.map((value, index) => (
              <tr key={index}>
                <td><b>{index}</b></td>
                <MemoryForm memoryValue={value} memoryEstructure={EstructuraDeMemoriaLocal} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;