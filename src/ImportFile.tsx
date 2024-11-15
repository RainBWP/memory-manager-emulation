// ImportFile.tsx
import React, { useState } from 'react';
import { ImportFileProps } from './interfaces';

const ImportFile: React.FC<ImportFileProps> = ({ onImport }) => {
  const [, setFileContent] = useState<string | null>(null);

  const handleFileRead = (event: ProgressEvent<FileReader>) => {
    const content = event.target?.result as string;
    setFileContent(content);

    const lines = content.split('\n');

    const [header, ...data] = lines;

    const [tamano_de_pagina_kb, tamano_de_virtual_kb, tamano_de_fisica_kb, numero_de_paginas] = header.split(' ').map(item => parseInt(item, 10));


    const importedData = {
      EstructuraDeMemoria: {
        tamano_de_pagina: tamano_de_pagina_kb,
        tamano_de_virtual: tamano_de_virtual_kb,
        tamano_de_fisica: tamano_de_fisica_kb,
        numero_de_paginas: numero_de_paginas,
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