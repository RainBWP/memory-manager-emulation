import { TraductorProps } from "./interfaces"
import { useState } from "react"
import MemoryForm from './MemoryForm.tsx';

const TraductorDVaDF: React.FC<TraductorProps> = (MemoriaVirtual, EstructuraDeMemoria) => {
    const [inputValue, setInputValue] = useState<number | undefined>(undefined);


    function changeValues() {
        if (inputValue === undefined) {
            return;
        }
        console.log(
            EstructuraDeMemoria.cantidad_de_marcos,
            EstructuraDeMemoria.tamano_de_pagina,
            EstructuraDeMemoria.cantidad_de_paginas
        )
        const inputPage = inputValue >> EstructuraDeMemoria.cantidad_de_marcos;
        const inputDesplazamiento = inputValue & ((1 << EstructuraDeMemoria.cantidad_de_marcos) - 1);
        console.log(inputPage, inputDesplazamiento);
    }
    
    return (
        <div className="container">
            <h2>Direccion Virtual a Fisica</h2>
            <p>Ingresar la memoria en base 10</p>

            <input 
                type="number" 
                min={0} 
                value={inputValue}
                onChange={(e) => {
                    setInputValue(Number(e.target.value));
                    changeValues();
                }}
            />
            
            <h2>Valor de la Memoria Fisica</h2>
            <table>
                <tr>
                    <MemoryForm 
                        memoryValue={inputValue ?? 0}
                        memoryEstructure={EstructuraDeMemoria}
                    />
                </tr>
            </table>
            
        </div>
    )
    
}

export { TraductorDVaDF }