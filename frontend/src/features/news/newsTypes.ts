export interface News {
    id: number;
    title: string;
    rating: number;
    author: string;
    date: Date;
}

export interface NewsResponse {
    news: News[];
}

export interface CommentsResponse {
    comments: Comment[];
}

export interface Comment {
    id: number;
    author: string;
    content: string;
    date: Date;
    parentId?: number;
}
