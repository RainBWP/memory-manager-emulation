import { TraductorProps } from "./interfaces";
import { useState } from "react";
import MemoryForm from './MemoryForm.tsx';

const TraductorDVaDF: React.FC<TraductorProps> = ({ MemoriaVirtual, EstructuraDeMemoria }) => {
    const [inputValue, setInputValue] = useState<number | undefined>(undefined);

    const [base10ParteDePagina, setBase10ParteDePagina] = useState<number | undefined>(undefined);
    const [base10Desplazamiento, setBase10Desplazamiento] = useState<number | undefined>(undefined);

    const [base10MemoriaFisica, setBase10MemoriaFisica] = useState<number | undefined>(undefined);
    function changeValues(value: number) {
        if (value === undefined) {
            return;
        }
        const temp_page = value >> EstructuraDeMemoria.cantidad_de_marcos;
        // quitar bytes de referencias
        const temp_page_special = temp_page & ((1 << (Math.log2(EstructuraDeMemoria.cantidad_de_marcos) - 5)) - 1);
        const inputDesplazamiento = value & ((1 << EstructuraDeMemoria.cantidad_de_marcos) - 1);
        console.log("Cambio de Valores", temp_page, inputDesplazamiento, value);


        setBase10ParteDePagina(temp_page_special);
        setBase10Desplazamiento(inputDesplazamiento);

        const temp_DireccionFisica = MemoriaVirtual[temp_page_special]+inputDesplazamiento;
        setBase10MemoriaFisica(temp_DireccionFisica);

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
                    const value = Number(e.target.value);
                    setInputValue(value);
                    changeValues(value);
                }}
            />

            <h3>Valores</h3>
            <p>{inputValue?.toString(2)}</p>
            <p>{Math.log2(EstructuraDeMemoria.cantidad_de_marcos)}</p>
            
            <h2>Valor de la Memoria Fisica</h2>
            <table>
                <thead>
                    <tr>
                        <th>A</th>
                        <th>R</th>
                        <th>M</th>
                        <th>P</th>
                        <th>C</th>
                        <th>Frame</th>
                        <th>F Decimal</th>
                        <th>Memoria</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <MemoryForm 
                            memoryValue={base10MemoriaFisica ?? 0}
                            memoryEstructure={EstructuraDeMemoria ?? {tamano_de_pagina: 0, cantidad_de_marcos: 0, cantidad_de_paginas: 0}}
                        />
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export { TraductorDVaDF };