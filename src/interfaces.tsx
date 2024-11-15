export interface EstructuraDeMemoria {
  tamano_de_pagina: number, // tamano en bytes
  tamano_de_virtual: number, // tamano en kilobytes
  tamano_de_fisica: number, // tamano en kilobytes
  numero_de_paginas: number, // numero de paginas
}

export interface MemoriaVirtual { // Datos de la memoria virtual
    memoryValues: number[];
}

export interface MemoriaFisica { // Datos de la memoria fisica
    memoryValues: number[];
}
  
export interface MemoryReader { // Interfaz que define la estructura de la memoria
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

export interface TraductorProps {
    onImport: (data: { EstructuraDeMemoria: EstructuraDeMemoria; MemoriaFisica: MemoriaFisica }) => void;
    MemoriaVirtual: number[];
    EstructuraDeMemoria: EstructuraDeMemoria;
  
  }

export interface MemoryFormProps {
  memoryValue: number;
  memoryEstructure: EstructuraDeMemoria;
}


