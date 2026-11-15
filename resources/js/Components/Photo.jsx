import { foto, fotoSrcSet } from '../data/site';

// Foto com tratamento frio do Arctic Graphite e carregamento otimizado.
export default function Photo({ id, alt, sizes = '100vw', className = '', prioridade = false }) {
    return (
        <figure className={`photo ${className}`}>
            <img
                src={foto(id)}
                srcSet={fotoSrcSet(id)}
                sizes={sizes}
                alt={alt}
                loading={prioridade ? 'eager' : 'lazy'}
                fetchPriority={prioridade ? 'high' : 'auto'}
                decoding="async"
            />
        </figure>
    );
}
