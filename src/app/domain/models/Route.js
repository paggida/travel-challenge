class Route{
	constructor(destinations=[], price=0){
    this.Destinations = destinations;
    this.Price        = parseFloat(price);
  }

  ToScvString(){
    const destinationsString = this.Destinations.reduce((string, destination)=>`${string?`${string},`:''}${destination}`)
    return `${destinationsString},${this.Price}`
  }

  getBestRouteString(){
    const destinationsString = this.Destinations.reduce((string, destination)=>`${string?`${string} - `:''}${destination}`)
    return `${destinationsString} > $${this.Price}`
  }
}

module.exports = Route
