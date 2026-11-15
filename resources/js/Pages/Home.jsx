import { Head } from '@inertiajs/react';
import { lazy, Suspense } from 'react';
import About from '../Components/About';
import Contact from '../Components/Contact';
import Hero from '../Components/Hero';
import Services from '../Components/Services';
import MainLayout from '../Layouts/MainLayout';

// Swiper só é usado na galeria (abaixo da dobra): vai num arquivo separado para não atrasar o primeiro carregamento
const Gallery = lazy(() => import('../Components/Gallery'));

export default function Home() {
    return (
        <MainLayout>
            <Head title="Corte masculino e barba" />
            <Hero />
            <About />
            <Services />
            <Suspense fallback={<section id="galeria" className="section gallery-placeholder" aria-label="Galeria carregando" />}>
                <Gallery />
            </Suspense>
            <Contact />
        </MainLayout>
    );
}
