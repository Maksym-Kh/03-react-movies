// import css from './App.module.css'


import SearchBar from "../SearchBar/SearchBar";

import { useEffect, useState } from 'react';
import type { Movie } from '../types/movie';
import FetchMovies from '../services/MovieService';
import {toast, Toaster} from "react-hot-toast";
import MovieGrid from '../MovieGrid/MovieGrid';

import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

import MovieModal from '../MovieModal/MovieModal'

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [query, setQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleSearch = (newQuery: string) => {
        setMovies([]);
        setQuery(newQuery);
    };

    useEffect(() => {
        if (!query) {
            return;
        };

        async function getMovies() {
            try {
                setIsLoading(true);
                setIsError(false);
                const data = await FetchMovies({ query });

                setIsLoading(false);
                
                if (!data || data.length === 0) {
                    toast.dismiss();
                    toast.error('No movies found for your request.');
                    setMovies([]);
                    return;
                }
                setMovies(data);
            }
            catch (err) {
                toast.error('Something went wrong. Please try again.');
                setIsError(true);
            }
            finally {
        setIsLoading(false);
            }
        }
        getMovies();
    }, [query]);

    
    const openModal = (movie: Movie) => setSelectedMovie(movie);
    const closeModal = () => setSelectedMovie(null);

    return ( 

        
        <>
            <Toaster position="top-right" />

            <SearchBar onSubmit={handleSearch} />
            {/* <movies.length > 0 && (<MovieGrid />) */}
            {movies.length > 0 && <MovieGrid onSelect={openModal} movies={movies} />}
            {isLoading === true && <Loader />}
            {isError === true && <ErrorMessage />}
            {selectedMovie && <MovieModal onClose={closeModal} movie={selectedMovie}/>}
</>
    )
}