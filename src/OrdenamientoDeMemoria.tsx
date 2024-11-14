import { TraductorProps, MemoryReader } from './interfaces';
import { useState, useEffect } from 'react';

const LecturaDeDatos = (props: TraductorProps) => {
    const [proceso, setProceso] = useState<number>(0);
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
    const [pageTable, setPageTable] = useState<MemoryReader[]>([]);
    const [virtualAddress, setVirtualAddress] = useState<number>(0);
    const [physicalAddress, setPhysicalAddress] = useState<number>(0);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                onSubmit();
            }
        };

        window.addEventListener('keypress', handleKeyPress);
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, [currentPageIndex, pageTable]);

    useEffect(() => {
        const updatedPageTable = props.MemoriaVirtual.map((currentPage, index) => ({
            bit_cache: Boolean((currentPage >> 5) & 1),
            bit_modificado: Boolean((currentPage >> 4) & 1),
            bit_permiso: Boolean((currentPage >> 3) & 1),
            bit_presente_ausente: true, // Initially true when loaded into memory
            bit_referencia: Boolean((currentPage >> 1) & 1),
            numero_de_frame: index, // Assuming frame number is the index for simplicity
        }));
        setPageTable(updatedPageTable);
    }, [props.MemoriaVirtual]);

    const onSubmit = () => {
        if (currentPageIndex >= props.MemoriaVirtual.length) return;

        const currentPage = props.MemoriaVirtual[currentPageIndex];
        setVirtualAddress(currentPage);
        setPhysicalAddress(currentPageIndex * props.EstructuraDeMemoria.tamano_de_pagina);

        setCurrentPageIndex(currentPageIndex + 1);
    };

    const formatAddress = (address: number) => ({
        decimal: address,
        hexadecimal: address.toString(16).toUpperCase(),
        binary: address.toString(2).padStart(8, '0'),
    });

    return (
        <div className='container'>
            <h2>Ingrese un proceso a la lista</h2>
            <input
                type="number"
                onChange={(e) => setProceso(Number(e.target.value))}
                min={0}
                value={proceso}
            />
            <button onClick={onSubmit}>Submit</button>
            

            <h3>Dirección Virtual</h3>
            <p>Decimal: {formatAddress(virtualAddress).decimal}</p>
            <p>Hexadecimal: {formatAddress(virtualAddress).hexadecimal}</p>
            <p>Binario: {formatAddress(virtualAddress).binary}</p>

            <h3>Dirección Física</h3>
            <p>Decimal: {formatAddress(physicalAddress).decimal}</p>
            <p>Hexadecimal: {formatAddress(physicalAddress).hexadecimal}</p>
            <p>Binario: {formatAddress(physicalAddress).binary}</p>
        </div>
    );
};

export default LecturaDeDatos;