import './interfaces.tsx';
import ImportFile from './ImportFile.tsx';
import { useState } from 'react';
import { EstructuraDeMemoria, MemoriaFisica } from './interfaces.tsx';
import MemoryForm from './MemoryForm.tsx';
import LecturaDeDatos from './OrdenamientoDeMemoria.tsx';
import ExportFile from './ExportFile.tsx';

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
        {/* <p>
        El programa deberá leer el tamaño de página, el tamaño de la memoria virtual, el tamaño de la memoria física, el número de páginas que tiene el proceso y la lista de referencias para un solo proceso. La tabla de páginas se irá construyendo conforme se vayan generando los fallos de página. El direccionamiento será por &#96;bytes&#96;.
        Una vez leídos los datos, el programa deberá esperar la lectura de cualquier carácter o enter. Cada vez que se lleve a cabo una lectura, el programa leerá el estado de los bits de control <i>(excepto el de presente/ausente)</i> y hará referencia a la siguiente página de la lista de referencias leída. Se deberá desplegar en pantalla los valores de la tabla de páginas <i>(valor en decimal, hexadecimal y binario)</i>, después el valor de la dirección virtual a la que se está haciendo referencia, en &#96;decimal&#96;, &#96;hexadecimal&#96; y &#96;binario&#96;, y el valor de la dirección física, en decimal, hexadecimal y binario.
        El desplazamiento en cada referencia siempre será <b>cero</b>.
        </p> */}
        <a href="https://github.com/RainBWP/memory-manager-emulation/tree/parcial2" target="_blank" rel="noopener noreferrer">GitHub Repositorio</a>
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
      
      <ExportFile data={{ EstructuraDeMemoria: EstructuraDeMemoriaLocal, MemoriaFisica: MemoriaFisicaLocal }} />
    </>
  );
}

export default App;