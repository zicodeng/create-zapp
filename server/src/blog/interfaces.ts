export interface Author {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Post {
  id: number;
  authorId: number;
  title: string;
  votes: number;
}
