export interface Film {
    _id: string;
    title: string;
    year: number;
    rank: number;
    metascore: number;
    description: string;
    seen: boolean;
    notes: string;
    error: string | null;
}

