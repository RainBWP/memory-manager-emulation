// ImportFile.tsx
import React, { useState } from 'react';
import { ImportFileProps } from './interfaces';

const ImportFile: React.FC<ImportFileProps> = ({ onImport }) => {
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleFileRead = (event: ProgressEvent<FileReader>) => {
    const content = event.target?.result as string;
    setFileContent(content);

    const lines = content.split('\n');

    const [header, ...data] = lines;

    const tam_pag = parseInt(header.split(':')[1], 10);
    const num_pag = parseInt(header.split(':')[2], 10);
    const num_marcos = parseInt(header.split(':')[3], 10);


    const importedData = {
      EstructuraDeMemoria: {
        tamano_de_pagina: tam_pag,
        cantidad_de_marcos: num_marcos,
        cantidad_de_paginas: num_pag,
      },
      MemoriaFisica: {
        memoryValues: data.map(item => parseInt(item, 10)),
      },
    };
    onImport(importedData);
  };

  const handleFileChosen = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <div className='container'>
      <label htmlFor="textfile">Ingrese en Formato <i>.txt</i> La Memoria</label>
      <input
      name='textfile'
        type="file"
        accept=".txt"
        onChange={e => {
          if (e.target.files && e.target.files.length > 0) {
            handleFileChosen(e.target.files[0]);
          }
        }}
      />
    </div>
  );
};

export default ImportFile;