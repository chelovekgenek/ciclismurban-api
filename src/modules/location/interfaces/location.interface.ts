export interface IPoint {
  lat: number
  lng: number
}

export interface ILocation {
  title: string
  description: string
  image: string
  point: IPoint
}
