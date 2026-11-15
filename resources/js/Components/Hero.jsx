import { FaWhatsapp } from 'react-icons/fa';
import { fotosSite } from '../data/gallery';
import { site, whatsappUrl } from '../data/site';
import Photo from './Photo';

export default function Hero() {
    return (
        <section id="inicio" className="hero" aria-labelledby="hero-titulo">
            <Photo {...fotosSite.hero} className="hero__photo" prioridade />
            <div className="container hero__content">
                <h1 id="hero-titulo" className="display hero__title">
                    {site.nome}
                </h1>
                <hr className="blade-line hero__line" />
                <div className="hero__text">
                    <p className="hero__slogan">{site.slogan}</p>
                    <p className="lead-text">{site.descricao}</p>
                    <div className="d-flex flex-wrap gap-3 mt-4">
                        <a className="btn-whatsapp" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp size={20} aria-hidden="true" /> Chamar no WhatsApp
                        </a>
                        <a className="btn-line" href="#servicos">
                            Ver serviços e preços
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
