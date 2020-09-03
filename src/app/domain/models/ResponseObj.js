class ResponseObj{
	constructor(code=0, data){
    this.Code = code;
    this.Data = code===200?data:{ message: data};
	}
}

module.exports = ResponseObj
