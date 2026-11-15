import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import WhatsAppButton from '../Components/WhatsAppButton';

export default function MainLayout({ children }) {
    useEffect(() => {
        AOS.init({
            once: true,
            duration: 800,
            easing: 'ease-out-cubic',
            disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        });
    }, []);

    return (
        <>
            <a className="skip-link" href="#conteudo">
                Pular para o conteúdo
            </a>
            <Header />
            <main id="conteudo">{children}</main>
            <Footer />
            <WhatsAppButton />
        </>
    );
}
