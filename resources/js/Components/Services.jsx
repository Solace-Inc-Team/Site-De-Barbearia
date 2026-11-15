import { FaWhatsapp } from 'react-icons/fa';
import { GiBeard, GiComb, GiMustache, GiRazor } from 'react-icons/gi';
import { PiScissorsLight } from 'react-icons/pi';
import { formatarPreco, services } from '../data/services';
import { whatsappUrl } from '../data/site';
import SectionHeader from './SectionHeader';

const icones = { tesoura: PiScissorsLight, barba: GiBeard, navalha: GiRazor, pente: GiComb, bigode: GiMustache };

export default function Services() {
    return (
        <section id="servicos" className="section section--raised" aria-labelledby="servicos-titulo">
            <div className="container">
                <SectionHeader id="servicos-titulo" title="Serviços">
                    Preços de referência. O valor final pode variar com o comprimento do cabelo.
                </SectionHeader>

                <div className="row g-4">
                    {services.map((s) => {
                        const Icone = icones[s.icone] ?? PiScissorsLight;
                        return (
                            <div className="col-12 col-md-6 col-lg-4" key={s.nome}>
                                <article className="card-arctic service-card">
                                    <Icone className="service-card__icon" size={30} aria-hidden="true" />
                                    <h3>{s.nome}</h3>
                                    <p className="meta">{s.descricao}</p>
                                    <div className="service-card__footer">
                                        <span className="figure-price">{formatarPreco(s.preco)}</span>
                                        {s.duracao && <span className="meta">{s.duracao}</span>}
                                    </div>
                                </article>
                            </div>
                        );
                    })}

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="service-cta">
                            <p className="text-white-arctic mb-3">Ficou com dúvida sobre algum serviço?</p>
                            <a
                                className="btn-whatsapp"
                                href={whatsappUrl('Olá! Gostaria de tirar uma dúvida sobre os serviços.')}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaWhatsapp size={20} aria-hidden="true" /> Perguntar no WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
