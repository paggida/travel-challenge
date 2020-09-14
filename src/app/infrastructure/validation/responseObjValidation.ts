import IResponseObj from '../../domain/contracts/IResponseObj'

export const isSuccessResponse = (responseObj:IResponseObj):boolean => responseObj.Code === 200;
