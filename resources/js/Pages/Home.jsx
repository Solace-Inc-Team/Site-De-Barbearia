import { Head } from '@inertiajs/react';
import About from '../Components/About';
import Contact from '../Components/Contact';
import Gallery from '../Components/Gallery';
import Hero from '../Components/Hero';
import Services from '../Components/Services';
import MainLayout from '../Layouts/MainLayout';

export default function Home() {
    return (
        <MainLayout>
            <Head title="Início" />
            <Hero />
            <About />
            <Services />
            <Gallery />
            <Contact />
        </MainLayout>
    );
}
