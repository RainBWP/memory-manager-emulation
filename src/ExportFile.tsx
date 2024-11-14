// ExportFile.tsx
import React from 'react';
import { EstructuraDeMemoria, MemoriaFisica } from './interfaces';

interface ExportFileProps {
  data: {
    EstructuraDeMemoria: EstructuraDeMemoria;
    MemoriaFisica: MemoriaFisica;
  };
}

const ExportFile: React.FC<ExportFileProps> = ({ data }) => {
  const handleExport = () => {
    const { EstructuraDeMemoria, MemoriaFisica } = data;

    const header = `${EstructuraDeMemoria.tamano_de_pagina} ${EstructuraDeMemoria.tamano_de_virtual} ${EstructuraDeMemoria.tamano_de_fisica} ${EstructuraDeMemoria.numero_de_paginas}`;
    const memoryValues = MemoriaFisica.memoryValues.join('\n');

    const content = `${header}\n${memoryValues}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_data.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='container'>
      <button onClick={handleExport}>Export Data</button>
    </div>
  );
};

export default ExportFile;