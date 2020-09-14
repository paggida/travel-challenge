import ResponseObj from '../../../../../src/app/domain/models/ResponseObj';
import { isSuccessResponse } from '../../../../../src/app/infrastructure/validation/responseObjValidation';

describe('Validation of the response code in the object.', () => {
  it('Should be able to validate if it is a success response object.', () => {
    const successObj = new ResponseObj(200, { message: 'It is a success object'})
    const isSucessObj = isSuccessResponse(successObj);

    expect(isSucessObj).toBeTruthy();
  });
  it('Should be able to validate if it is a failed response object.', () => {
    const failedObj = new ResponseObj(500, { message: 'It is a failed object'})
    const isSucessObj = isSuccessResponse(failedObj);

    expect(isSucessObj).toBeFalsy();
  });
});
