export interface UserData {
  email: string;
  photoURL: string;
  uid: string;
  userName: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  rating: number;
  userData: UserData;
}
