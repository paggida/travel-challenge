class Route{
	constructor(destinations=[], price=0){
    this.Destinations = destinations;
    this.Price        = parseFloat(price);
  }

  ToScvString(){
    return `${this.Destinations[0]},${this.Destinations[1]},${this.Price}`
  }
}

module.exports = Route
