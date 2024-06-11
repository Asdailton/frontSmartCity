import styles from './Modals.module.css';

export function Modal({ movie, onClose }) {
    return (
      <div className={styles.modalBackdrop} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e)=> e.stopPropagation()}>
          <h2>{movie.title}</h2>
          <img className={styles.imgModal} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title || "Imagem não disponível"} />
          <div className={styles.textContainer}>
            <p>{movie.overview}</p>
            <p>Popularidade do Filme: {movie.popularity}</p>
            <p>Data de Lançamento: {movie.release_date}</p>            
            <p>Quantidade de votos: {movie.vote_count}</p> 
          </div>
          <button className={styles.closeButton} onClick={onClose}>Fechar</button>     
        </div>
      </div>
    );
}
