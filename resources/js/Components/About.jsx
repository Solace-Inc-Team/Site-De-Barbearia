import { fotosSite } from '../data/gallery';
import Photo from './Photo';
import SectionHeader from './SectionHeader';

// ILUSTRATIVO: história e diferenciais de exemplo.
const diferenciais = [
    { titulo: 'Um cliente por vez', texto: 'A cadeira é sua do começo ao fim. Sem atender dois ao mesmo tempo.' },
    { titulo: 'Conversa antes do corte', texto: 'Entendemos o que você quer e o que combina com seu cabelo antes de pegar a tesoura.' },
    { titulo: 'Material limpo a cada atendimento', texto: 'Lâminas descartáveis e ferramentas esterilizadas para cada cliente.' },
];

export default function About() {
    return (
        <section id="sobre" className="section" aria-labelledby="sobre-titulo">
            <div className="container">
                <SectionHeader id="sobre-titulo" title="Sobre a barbearia">
                    Um espaço pensado para quem quer sair bem cortado sem perder a tarde.
                </SectionHeader>

                <div className="row g-5 align-items-center">
                    <div className="col-12 col-lg-6 order-lg-2">
                        <div className="about-photos" data-aos="fade" data-aos-duration="900">
                            <Photo {...fotosSite.sobre[0]} className="about-photos__main" sizes="(min-width: 992px) 45vw, 90vw" />
                            <Photo {...fotosSite.sobre[1]} className="about-photos__detail" sizes="(min-width: 992px) 22vw, 45vw" />
                        </div>
                    </div>

                    <div className="col-12 col-lg-6 order-lg-1">
                        <h3>Nossa história</h3>
                        <p>
                            Começamos com uma cadeira e a ideia de que cortar o cabelo pode ser um momento tranquilo do dia.
                            Hoje somos uma equipe pequena, com o mesmo cuidado do primeiro cliente.
                        </p>
                        <h3 className="mt-4">Como atendemos</h3>
                        <p>
                            Horário respeitado, ambiente silencioso e atenção ao detalhe. Você sai sabendo como manter o corte em casa.
                        </p>

                        <ul className="feature-list">
                            {diferenciais.map((d) => (
                                <li key={d.titulo}>
                                    <strong>{d.titulo}</strong>
                                    <span>{d.texto}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
