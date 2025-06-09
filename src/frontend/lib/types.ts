export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  price: number
  category: string
  image: string
}

export interface Quiz {
  id: string
  title: string
  date: string
  time: string
  location: string
  price: number
  teamSize: number
  image: string
}
