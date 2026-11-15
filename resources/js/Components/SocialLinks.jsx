import { PiFacebookLogoLight, PiInstagramLogoLight, PiTiktokLogoLight } from 'react-icons/pi';
import { site } from '../data/site';

const icones = { Instagram: PiInstagramLogoLight, Facebook: PiFacebookLogoLight, TikTok: PiTiktokLogoLight };

export default function SocialLinks() {
    return (
        <ul className="social-links" aria-label="Redes sociais">
            {site.redes.map((rede) => {
                const Icone = icones[rede.nome];
                return (
                    <li key={rede.nome}>
                        <a href={rede.url} target="_blank" rel="noopener noreferrer" aria-label={`${rede.nome} (abre em nova aba)`}>
                            {Icone && <Icone size={22} aria-hidden="true" />}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}
