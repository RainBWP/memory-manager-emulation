import { TraductorProps } from './interfaces';
import { useState, useEffect } from 'react';

interface LecturaDeDatosProps extends TraductorProps {
    updateMemoriaFisica: (newMemoryValues: number[]) => void;
}

const LecturaDeDatos = (props: LecturaDeDatosProps) => {
    const [proceso, setProceso] = useState<number>(0);
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
    const [virtualAddress, setVirtualAddress] = useState<number>(0);
    const [physicalAddress, setPhysicalAddress] = useState<number>(0);
    const [memoryValues, setMemoryValues] = useState<number[]>(props.MemoriaVirtual);
    const [frameTable, setFrameTable] = useState<number[]>(new Array(props.EstructuraDeMemoria.numero_de_paginas).fill(-1)); // -1 indicates empty frame
    const [lruQueue, setLruQueue] = useState<number[]>([]); // LRU queue to track page usage

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
    }, [currentPageIndex, frameTable]);

    const LRU = (pageIndex: number) => {
        const emptyFrameIndex = frameTable.indexOf(-1);

        if (emptyFrameIndex !== -1) {
            // Place the page in the empty frame
            const updatedFrameTable = [...frameTable];
            updatedFrameTable[emptyFrameIndex] = pageIndex;
            setFrameTable(updatedFrameTable);

            // Update LRU queue
            setLruQueue([...lruQueue, pageIndex]);
        } else {
            // LRU page replacement
            const lruPageIndex = lruQueue.shift()!;
            const frameIndex = frameTable.indexOf(lruPageIndex);

            // Place the new page in the frame
            const updatedFrameTable = [...frameTable];
            updatedFrameTable[frameIndex] = pageIndex;
            setFrameTable(updatedFrameTable);

            // Update LRU queue
            setLruQueue([...lruQueue, pageIndex]);
        }
    };

    const emulateMemoryUsage = (virtualAddress: number) => { 
        const pageSize = props.EstructuraDeMemoria.tamano_de_pagina;
        const virtualPageNumber = Math.floor(virtualAddress / pageSize);
        const offset = virtualAddress % pageSize;

        console.log('Virtual Page Number:', virtualPageNumber);
        console.log('Offset:', offset);

        // Check if the page is in memory
        if (frameTable[virtualPageNumber] === -1) {
            // Page fault
            console.log('Page fault');
            LRU(virtualPageNumber);
        } else {
            // Page hit
            console.log('Page hit');
        }

        // Calculate the physical address
        const physicalAddress = frameTable[virtualPageNumber] * pageSize + offset;
        console.log('Physical Address:', physicalAddress);

        setVirtualAddress(virtualAddress);
        setPhysicalAddress(physicalAddress);

        // Update the memory in App
        props.updateMemoriaFisica(memoryValues);

        // Display the values
        console.log('Page Table Values:');
        frameTable.forEach((frame, index) => {
            console.log(`Page ${index}: Decimal: ${frame}, Hexadecimal: ${frame.toString(16).toUpperCase()}, Binario: ${frame.toString(2).padStart(8, '0')}`);
        });
        console.log(`Virtual Address: Decimal: ${virtualAddress}, Hexadecimal: ${virtualAddress.toString(16).toUpperCase()}, Binario: ${virtualAddress.toString(2).padStart(8, '0')}`);
        console.log(`Physical Address: Decimal: ${physicalAddress}, Hexadecimal: ${physicalAddress.toString(16).toUpperCase()}, Binario: ${physicalAddress.toString(2).padStart(8, '0')}`);
    };

    const onSubmit = () => {
        console.log('Proceso:', proceso);
        // Example of translating an address
        emulateMemoryUsage(virtualAddress);


        setProceso(0);
        (document.getElementById('proceso_input') as HTMLInputElement).value = '';
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
                id="proceso_input"
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