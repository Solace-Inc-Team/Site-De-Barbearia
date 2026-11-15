import { Head } from '@inertiajs/react';
import { FaWhatsapp } from 'react-icons/fa';
import SectionHeader from '../Components/SectionHeader';

// Provisório (Etapa 3): mostra as peças do Arctic Graphite. As seções reais entram na Etapa 4.
const cores = [
    ['Graphite Black', '#15191F'],
    ['Slate Gray', '#343E4A'],
    ['Steel Blue', '#657787'],
    ['Ice Gray', '#B5C3CB'],
    ['Arctic White', '#EAF0F1'],
];

export default function Home() {
    return (
        <>
            <Head title="Identidade visual" />
            <main>
                <section className="section">
                    <div className="container">
                        <h1 className="display mb-4">Barbearia Exemplo</h1>
                        <p className="lead-text mb-5">
                            Corte preciso, atendimento sem pressa. Texto ilustrativo até os dados reais chegarem.
                        </p>
                        <div className="d-flex flex-wrap gap-3">
                            <a className="btn-whatsapp" href="#">
                                <FaWhatsapp size={20} aria-hidden="true" /> Chamar no WhatsApp
                            </a>
                            <a className="btn-ice" href="#">Ver serviços</a>
                            <a className="btn-line" href="#">Como chegar</a>
                        </div>
                    </div>
                </section>

                <hr className="blade-line" />

                <section className="section section--raised" aria-labelledby="t-servicos">
                    <div className="container">
                        <SectionHeader id="t-servicos" title="Serviços">
                            Cabeçalho de seção: título à esquerda, apoio à direita no desktop, empilhado no celular.
                        </SectionHeader>
                        <div className="row g-4">
                            {['Corte masculino', 'Barba', 'Corte e barba'].map((nome) => (
                                <div className="col-12 col-md-6 col-lg-4" key={nome}>
                                    <article className="card-arctic">
                                        <h3>{nome}</h3>
                                        <p className="meta mb-4">Descrição curta do serviço.</p>
                                        <div className="d-flex align-items-baseline justify-content-between">
                                            <span className="figure-price">R$ 00</span>
                                            <span className="meta">40 min</span>
                                        </div>
                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section" aria-labelledby="t-paleta">
                    <div className="container">
                        <SectionHeader id="t-paleta" title="Paleta e formulário" />
                        <div className="row g-3 mb-5">
                            {cores.map(([nome, hex]) => (
                                <div className="col-6 col-md" key={hex}>
                                    <div style={{ background: hex, height: 96, border: '1px solid var(--line)', borderRadius: 6 }} />
                                    <p className="text-small text-white-arctic mt-2 mb-0">{nome}</p>
                                    <p className="meta mb-0">{hex}</p>
                                </div>
                            ))}
                        </div>
                        <form className="row g-3" style={{ maxWidth: 560 }} onSubmit={(e) => e.preventDefault()}>
                            <div className="col-12">
                                <label className="form-label" htmlFor="demo-nome">Nome</label>
                                <input className="form-control" id="demo-nome" placeholder="Seu nome" />
                            </div>
                            <div className="col-12">
                                <label className="form-label" htmlFor="demo-tel">Telefone</label>
                                <input className="form-control is-invalid" id="demo-tel" aria-describedby="demo-tel-erro" />
                                <div className="invalid-feedback" id="demo-tel-erro">Informe um telefone com DDD, por exemplo (11) 91234-5678.</div>
                            </div>
                            <div className="col-12">
                                <button className="btn-ice" type="submit">Enviar mensagem</button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}
