import apiClient from "./api";
import type { Movie } from "../types/movie";


interface FetchMoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}


interface FetchMoviesParams {
    query: string,
    page?: number,
}

export default async function FetchMovies(searchOptions: FetchMoviesParams):Promise<Movie[]>{
    const endPoint = '/search/movie';

    const queryParams = {
        query: searchOptions.query,
        page: searchOptions.page || 1,
    };

    const response = await apiClient.get<FetchMoviesResponse>(endPoint, {
        params: queryParams
    });
    
    return response.data.results ;
}
