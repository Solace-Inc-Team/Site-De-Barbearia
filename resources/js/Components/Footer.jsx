import { enderecoCompleto, menu, site, telefoneUrl, whatsappUrl } from '../data/site';
import SocialLinks from './SocialLinks';

export default function Footer() {
    return (
        <footer className="site-footer">
            <hr className="blade-line" />
            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-12 col-lg-4">
                        <p className="brand mb-3">{site.nome}</p>
                        <p className="text-small">{site.descricao}</p>
                        <SocialLinks />
                    </div>

                    <div className="col-6 col-lg-2">
                        <h2 className="footer-title">Navegação</h2>
                        <ul className="footer-links">
                            {menu.map((item) => (
                                <li key={item.id}>
                                    <a href={`#${item.id}`}>{item.rotulo}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-6 col-lg-3">
                        <h2 className="footer-title">Contato</h2>
                        <ul className="footer-links">
                            <li>
                                <a href={telefoneUrl()}>{site.telefone}</a>
                            </li>
                            <li>
                                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                                    WhatsApp
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${site.email}`}>{site.email}</a>
                            </li>
                        </ul>
                        <address className="text-small mt-3 mb-0">{enderecoCompleto()}</address>
                    </div>

                    <div className="col-12 col-lg-3">
                        <h2 className="footer-title">Horários</h2>
                        <dl className="hours hours--compact">
                            {site.horarios.map((h) => (
                                <div key={h.dias}>
                                    <dt>{h.dias}</dt>
                                    <dd>{h.horas}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="mb-0">
                        © {new Date().getFullYear()} {site.nome}. Todos os direitos reservados.
                    </p>
                    <p className="mb-0">Dados e fotos ilustrativos. Fotos: Unsplash.</p>
                </div>
            </div>
        </footer>
    );
}
