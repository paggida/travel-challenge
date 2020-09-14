import IRoute from '../contracts/IRoute'

class Route implements IRoute {
  Destinations: string[];
  Price: number;

	constructor(destinations:string[]=[], price:number=0){
    this.Destinations = destinations;
    this.Price        = price;
  }

  ToScvString(){
    const destinationsString: string = this.Destinations.reduce((string, destination)=>`${string?`${string},`:''}${destination}`)
    return `${destinationsString},${this.Price}`
  }

  GetBestRouteString(){
    const destinationsString: string = this.Destinations.reduce((string, destination)=>`${string?`${string} - `:''}${destination}`)
    return `${destinationsString} > $${this.Price}`
  }
}

export default Route
