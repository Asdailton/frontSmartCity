import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from './Cart';
import { Modal } from './Modals';

const API_KEY = '257dc8734ba758c9d7df634651f8d89e';
const API_URL = 'https://api.themoviedb.org/3/';

export function List() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null)

    useEffect(() => {
        axios.get(`${API_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`)
            .then(response => {
                console.log(response.data.results);
                setMovies(response.data.results);
            })
            .catch(error => {
                console.error('Erro ao retornar Filmes!', error);
            });
    }, []);

    const handleOpenModal = (movie)=>{
        setSelectedMovie(movie);
        console.log('Filme selecionado')
    }
    const handleCloseModal = () =>{
        setSelectedMovie(null);
    }

    return (
        <div>
           
            <figure style={{display: 'flex', flexWrap: 'wrap'}}>
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <Card key={movie.id} movie={movie} onOpenModal={handleOpenModal}/>
                       
                    ))
                ) : (
                    <p>Carregando...</p>
                )}
            </figure>
            {selectedMovie && (
                <Modal movie={selectedMovie} onClose={handleCloseModal} />
            )}
        </div>
    );
}
