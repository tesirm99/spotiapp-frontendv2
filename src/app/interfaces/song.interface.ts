import { Comment } from './comment.interface';
export interface Song {
    _id?: string;
    name: string;
    artist: string;
    album: string;
    releaseDate: number;
    genre: string;
    duration: number;
    image: string;
    href: string;
    popularity: number;
    geolocation: [number, number];
    comments: Comment[];
};