import IResponseObj from '../contracts/IResponseObj';

class ResponseObj implements IResponseObj{
  Code: number;
  Data: object | string;

	constructor(code:number=0, data:any){
    this.Code = code;
    this.Data = code===200?data:{ message: data };
	}
}

export default ResponseObj
