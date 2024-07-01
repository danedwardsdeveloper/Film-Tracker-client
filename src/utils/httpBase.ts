type ServerEnvironment = 'local' | 'netlify';

export function getHttpBase(): string {
    const server: ServerEnvironment = import.meta.env.VITE_SERVER;
    let httpBase: string;

    switch (server) {
        case 'local':
            httpBase = 'https://localhost:8080/api/';
            console.log('Using local server');
            break;
        case 'netlify':
            httpBase = `https://metacritic-top-100-api.netlify.app/api/`;
            console.log('Using Netlify server');
            break;
        default:
            throw new Error('VITE_SERVER variable in .env must be either local or netlify');
    }

    return httpBase;
}