export interface IUserProfile {
  id: number
  name: string
  username: string
  avatar: string
  email: string
  dob: Date
  phone: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  website: string
  company: {
    bs: string
    catchPhrase: string
    name: string
  }
}

export interface IStoryProps {
  key: number
  img: string
  username: string
}
