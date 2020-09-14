  export const isValidCSVFileName=(file:string):boolean => (isValidFileNameFormat(file) && isValidNameFile(file) && isWithExtension(file,'CSV'));

  export const isValidFileNameFormat=(file:string):boolean => file.split('.').length > 1;

  export const isValidNameFile=(file:string):boolean =>{
    const fileNameArray:string[] = file.split('.');

    return fileNameArray[0].length>0;
  };

  export const isWithExtension=(file:string, extension:string):boolean =>{
    const fileNameArray:string[] = file.split('.');

    return fileNameArray[fileNameArray.length-1].toUpperCase() === extension.toUpperCase();
  };
