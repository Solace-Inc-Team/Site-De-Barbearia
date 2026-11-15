import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { PiListLight, PiXLight } from 'react-icons/pi';
import { menu, site, whatsappUrl } from '../data/site';

export default function Header() {
    const [aberto, setAberto] = useState(false);
    const [rolou, setRolou] = useState(false);

    useEffect(() => {
        const aoRolar = () => setRolou(window.scrollY > 24);
        aoRolar();
        window.addEventListener('scroll', aoRolar, { passive: true });
        return () => window.removeEventListener('scroll', aoRolar);
    }, []);

    useEffect(() => {
        if (!aberto) return;
        const aoTeclar = (e) => e.key === 'Escape' && setAberto(false);
        window.addEventListener('keydown', aoTeclar);
        return () => window.removeEventListener('keydown', aoTeclar);
    }, [aberto]);

    const fechar = () => setAberto(false);

    return (
        <header className={`site-header${rolou || aberto ? ' is-solid' : ''}`}>
            <div className="container site-header__bar">
                <a className="brand" href="#inicio" onClick={fechar}>
                    {site.nome}
                </a>

                <nav className="site-nav d-none d-lg-flex" aria-label="Principal">
                    {menu.map((item) => (
                        <a key={item.id} href={`#${item.id}`}>
                            {item.rotulo}
                        </a>
                    ))}
                </nav>

                <a className="btn-whatsapp btn-sm-header d-none d-lg-inline-flex" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp size={18} aria-hidden="true" /> WhatsApp
                </a>

                <button
                    type="button"
                    className="menu-toggle d-lg-none"
                    aria-expanded={aberto}
                    aria-controls="menu-celular"
                    aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
                    onClick={() => setAberto(!aberto)}
                >
                    {aberto ? <PiXLight size={26} aria-hidden="true" /> : <PiListLight size={26} aria-hidden="true" />}
                </button>
            </div>

            <nav id="menu-celular" className={`mobile-nav d-lg-none${aberto ? ' is-open' : ''}`} aria-label="Principal no celular" hidden={!aberto}>
                <div className="container">
                    {menu.map((item) => (
                        <a key={item.id} href={`#${item.id}`} onClick={fechar}>
                            {item.rotulo}
                        </a>
                    ))}
                    <a className="btn-whatsapp w-100 mt-3" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" onClick={fechar}>
                        <FaWhatsapp size={20} aria-hidden="true" /> Chamar no WhatsApp
                    </a>
                </div>
            </nav>
        </header>
    );
}
