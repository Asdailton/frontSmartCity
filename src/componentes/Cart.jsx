
import styles from './Cart.module.css'

import {Link } from 'react-router-dom';


export function Card({ movie, onOpenModal }) {

 
   // Verifica se movie está definido
   if (!movie) {
     return <p>Carregando...</p>; // Mensagem de carregamento enquanto os dados estão sendo carregados
   }
 
   return (
     <div className={styles.conteiner}>
      
      
        <img
          className={styles.poster}
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
          alt={movie.title}
          onClick={() =>onOpenModal(movie)}
        />
     
       
     </div>
   );
 }