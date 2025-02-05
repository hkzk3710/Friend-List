export interface Friend {
  id: string;
  author: {
    id: string;
    username: string;
  };
  name: string;
  place: string;
  favorites: string;
  unlike: string;
}
