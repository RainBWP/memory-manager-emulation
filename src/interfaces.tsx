interface EstructuraDeMemoria { // Interfaz que define la estructura de la memoria
    tamano_de_pagina: number;
    cantidad_de_marcos: number;
    cantidad_de_paginas: number;
}

interface MemoriaVirtual { // Datos de la memoria virtual
    memoryValues: number[];
}

interface MemoriaFisica { // Datos de la memoria fisica
    memoryValues: number[];
}
  
interface MemoryReader { // Interfaz que define la estructura de la memoria
    bit_permiso: boolean; // Bit de permiso
    bit_referencia: boolean; // Bit de referencia
    bit_modificado: boolean; // Bit de modificado
    bit_presente_ausente: boolean; // Bit de presente/ausente
    bit_cache: boolean; // Bit de cache
    numero_de_frame: number; // Numero de frame
}

export interface ImportFileProps {
    onImport: (data: { EstructuraDeMemoria: EstructuraDeMemoria; MemoriaFisica: MemoriaFisica }) => void;
  }


export type { EstructuraDeMemoria, MemoriaFisica, MemoryReader, MemoriaVirtual, ImportFileProps }; // Exporta las interfaces para que puedan ser utilizadas en otros archivos

