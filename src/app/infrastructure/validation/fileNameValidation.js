module.exports = {
  isValidCSVFileName(file){
    return (this.isValidFileNameFormat(file) && this.isValidNameFile(file) && this.isWithExtension(file,'CSV'));
  },
  isValidFileNameFormat(file){
    return file.split('.').length > 1;
  },
  isValidNameFile(file){
    const fileNameArray = file.split('.');
    return fileNameArray[0].length>0;
  },
  isWithExtension(file, extension){
    const fileNameArray = file.split('.');
    return fileNameArray[fileNameArray.length-1].toUpperCase() === extension.toUpperCase();
  }
}
