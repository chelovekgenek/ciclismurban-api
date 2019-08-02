export interface IPoint {
  lat: number
  lng: number
}

export interface ILocation {
  uuid: string
  title: string
  description: string
  image: string
  point: IPoint
}
