// App.tsx
import './MemoryManager.tsx';
import './App.css';
import './interfaces.tsx';
import ImportFile from './ImportFile.tsx';
import { useState } from 'react';
import { EstructuraDeMemoria, MemoriaFisica } from './interfaces.tsx';

const defaultMemory: EstructuraDeMemoria = {
  tamano_de_pagina: 0,
  cantidad_de_marcos: 0,
  cantidad_de_paginas: 0,
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

      <div>
        <h2>Memoria Estructura</h2>
        <p><b>Tamano De Pagina: </b>{EstructuraDeMemoriaLocal.tamano_de_pagina}</p>
        <p><b>Cantidad De Marcos: </b>{EstructuraDeMemoriaLocal.cantidad_de_marcos}</p>
        <p><b>Cantidad De Paginas: </b>{EstructuraDeMemoriaLocal.cantidad_de_paginas}</p>
        <h2>Memoria Fisica</h2>
      </div>
    </>
  );
}

export default App;