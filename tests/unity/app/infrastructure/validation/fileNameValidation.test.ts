import * as fileNameValidation from '../../../../../src/app/infrastructure/validation/fileNameValidation';

describe('Validation of the format file name.', () => {
  it('Should be able to validate a valid format file name.', () => {
    const fileName = 'input-file-test.txt'
    const isValid = fileNameValidation.isValidFileNameFormat(fileName);

    expect(isValid).toBeTruthy();
  });
  it('Should not be able to validate a file name with incorrect format.', () => {
    const fileName = 'input-file-test|txt'
    const isValid = fileNameValidation.isValidFileNameFormat(fileName);

    expect(isValid).toBeFalsy();
  });
});

describe('Validation of the name in a file name.', () => {
  it('Should be able to validate a valid name.', () => {
    const fileName = 'input-file-test.txt'
    const isValid = fileNameValidation.isValidNameFile(fileName);

    expect(isValid).toBeTruthy();
  });
  it('Should not be able to validate a invalid name.', () => {
    const fileName = '.txt'
    const isValid = fileNameValidation.isValidNameFile(fileName);

    expect(isValid).toBeFalsy();
  });
});

describe('Validation of the format file name.', () => {
  it('Should be able to validate a valid extension in a file name.', () => {
    const fileName = 'input-file-test.txt'
    const isValid = fileNameValidation.isWithExtension(fileName, 'txt');

    expect(isValid).toBeTruthy();
  });
  it('Should not be able to validate a file name without the correct extension.', () => {
    const fileName = 'input-file-test.csv'
    const isValid = fileNameValidation.isWithExtension(fileName, 'txt');

    expect(isValid).toBeFalsy();
  });
  it('Should not be able to validate a file name without extension.', () => {
    const fileName = 'input-file-test'
    const isValid = fileNameValidation.isWithExtension(fileName, 'txt');

    expect(isValid).toBeFalsy();
  });
});

describe('Validation of a CSV file name.', () => {
  it('Should be able to validate a valid CSV file name.', () => {
    const fileName = 'input-file-test.csv'
    const isValid = fileNameValidation.isValidCSVFileName(fileName);

    expect(isValid).toBeTruthy();
  });
  it('Should not be able to validate a CSV file name with incorrect format.', () => {
    const fileName = 'input-file-test|csv'
    const isValid = fileNameValidation.isValidCSVFileName(fileName);

    expect(isValid).toBeFalsy();
  });
  it('Should not be able to validate a CSV file name without a name.', () => {
    const fileName = '.csv'
    const isValid = fileNameValidation.isValidCSVFileName(fileName);

    expect(isValid).toBeFalsy();
  });
  it('Should not be able to validate a CSV file name without extension.', () => {
    const fileName = 'input-file-test'
    const isValid = fileNameValidation.isValidCSVFileName(fileName);

    expect(isValid).toBeFalsy();
  });
});
