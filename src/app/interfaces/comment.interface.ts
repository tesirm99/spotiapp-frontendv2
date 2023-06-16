export interface Comment {
    _id?: string;
    author: string;
    commentText: string;
    date: string;
    stars: number;
    geolocation: [number, number];
    authorId: string;
}