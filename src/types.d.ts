export interface Film {
    _id: string;
    title: string;
    year: number;
    rank: number;
    metascore: number;
    description: string;
    seen: boolean;
}

export interface ImportMetaEnv {
    VITE_MESSAGE: string;
    VITE_DEV: boolean
}

