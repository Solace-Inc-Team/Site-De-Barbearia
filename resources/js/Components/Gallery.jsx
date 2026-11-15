import { PiArrowLeftLight, PiArrowRightLight } from 'react-icons/pi';
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { gallery } from '../data/gallery';
import Photo from './Photo';
import SectionHeader from './SectionHeader';

export default function Gallery() {
    return (
        <section id="galeria" className="section gallery" aria-labelledby="galeria-titulo">
            <div className="container">
                <SectionHeader id="galeria-titulo" title="Galeria">
                    Cortes, barbas e o espaço onde tudo acontece. Arraste para o lado ou use as setas.
                </SectionHeader>
            </div>

            <div className="container gallery__track">
                <Swiper
                    modules={[Navigation, Pagination, Keyboard, A11y]}
                    spaceBetween={16}
                    slidesPerView={1.15}
                    breakpoints={{ 576: { slidesPerView: 1.6 }, 768: { slidesPerView: 2.2, spaceBetween: 20 }, 1200: { slidesPerView: 3, spaceBetween: 24 } }}
                    navigation={{ prevEl: '.gallery__prev', nextEl: '.gallery__next' }}
                    pagination={{ clickable: true }}
                    keyboard={{ enabled: true, onlyInViewport: true }}
                    a11y={{
                        prevSlideMessage: 'Foto anterior',
                        nextSlideMessage: 'Próxima foto',
                        firstSlideMessage: 'Esta é a primeira foto',
                        lastSlideMessage: 'Esta é a última foto',
                        paginationBulletMessage: 'Ir para a foto {{index}}',
                        slideLabelMessage: 'Foto {{index}} de {{slidesLength}}',
                    }}
                >
                    {gallery.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="gallery__item">
                                <Photo id={item.id} alt={item.alt} sizes="(min-width: 1200px) 33vw, (min-width: 768px) 45vw, 85vw" />
                                <span className="gallery__tag">{item.categoria}</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="gallery__controls">
                    <button type="button" className="gallery__prev" aria-label="Foto anterior">
                        <PiArrowLeftLight size={22} aria-hidden="true" />
                    </button>
                    <button type="button" className="gallery__next" aria-label="Próxima foto">
                        <PiArrowRightLight size={22} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </section>
    );
}
