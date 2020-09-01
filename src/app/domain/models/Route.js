class Route{
	constructor(destinations=[], price=0){
    this.Destinations = destinations;
    this.Price        = parseFloat(price);
	}
}

module.exports = Route
