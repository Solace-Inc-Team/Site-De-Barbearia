import { useForm, usePage } from '@inertiajs/react';
import { FaWhatsapp } from 'react-icons/fa';
import { PiCheckCircleLight, PiClockLight, PiMapPinLight, PiPhoneLight, PiWarningCircleLight } from 'react-icons/pi';
import { enderecoCompleto, mapaUrl, site, telefoneUrl, whatsappUrl } from '../data/site';
import SectionHeader from './SectionHeader';
import SocialLinks from './SocialLinks';

function Campo({ id, rotulo, erro, children }) {
    return (
        <div className="col-12">
            <label className="form-label" htmlFor={id}>
                {rotulo}
            </label>
            {children}
            {erro && (
                <div className="invalid-feedback d-block" id={`${id}-erro`}>
                    {erro}
                </div>
            )}
        </div>
    );
}

export default function Contact() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset, hasErrors } = useForm({
        nome: '',
        telefone: '',
        mensagem: '',
        consentimento: false,
        website: '', // armadilha anti-spam: pessoas não veem este campo
    });

    const enviar = (e) => {
        e.preventDefault();
        post('/contato', { preserveScroll: true, onSuccess: () => reset() });
    };

    const attrs = (campo) => ({
        id: campo,
        name: campo,
        value: data[campo],
        onChange: (e) => setData(campo, e.target.value),
        className: `form-control${errors[campo] ? ' is-invalid' : ''}`,
        'aria-invalid': errors[campo] ? true : undefined,
        'aria-describedby': errors[campo] ? `${campo}-erro` : undefined,
    });

    return (
        <section id="contato" className="section section--raised" aria-labelledby="contato-titulo">
            <div className="container">
                <SectionHeader id="contato-titulo" title="Contato">
                    O jeito mais rápido é o WhatsApp. Se preferir, deixe uma mensagem que retornamos no mesmo dia.
                </SectionHeader>

                <div className="row g-5">
                    <div className="col-12 col-lg-5">
                        <ul className="contact-list">
                            <li>
                                <PiPhoneLight size={22} aria-hidden="true" />
                                <div>
                                    <span className="meta">Telefone</span>
                                    <a href={telefoneUrl()}>{site.telefone}</a>
                                </div>
                            </li>
                            <li>
                                <PiMapPinLight size={22} aria-hidden="true" />
                                <div>
                                    <span className="meta">Endereço</span>
                                    <address className="mb-0">{enderecoCompleto()}</address>
                                </div>
                            </li>
                            <li>
                                <PiClockLight size={22} aria-hidden="true" />
                                <div className="flex-grow-1">
                                    <span className="meta">Horários</span>
                                    <dl className="hours">
                                        {site.horarios.map((h) => (
                                            <div key={h.dias}>
                                                <dt>{h.dias}</dt>
                                                <dd>{h.horas}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            </li>
                        </ul>

                        <a className="btn-whatsapp mt-2" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp size={20} aria-hidden="true" /> Chamar no WhatsApp
                        </a>

                        <div className="mt-4">
                            <SocialLinks />
                        </div>
                    </div>

                    <div className="col-12 col-lg-7">
                        <form className="card-arctic contact-form row g-3 mx-0" onSubmit={enviar} noValidate>
                            {flash?.contato && (
                                <div className="col-12">
                                    <div className="form-alert form-alert--ok" role="status">
                                        <PiCheckCircleLight size={22} aria-hidden="true" /> {flash.contato}
                                    </div>
                                </div>
                            )}
                            {hasErrors && (
                                <div className="col-12">
                                    <div className="form-alert form-alert--erro" role="alert">
                                        <PiWarningCircleLight size={22} aria-hidden="true" /> Mensagem não enviada. Corrija os campos marcados.
                                    </div>
                                </div>
                            )}

                            <Campo id="nome" rotulo="Nome" erro={errors.nome}>
                                <input {...attrs('nome')} type="text" autoComplete="name" maxLength={80} required />
                            </Campo>
                            <Campo id="telefone" rotulo="Telefone com DDD" erro={errors.telefone}>
                                <input {...attrs('telefone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="(11) 91234-5678" maxLength={20} required />
                            </Campo>
                            <Campo id="mensagem" rotulo="Mensagem" erro={errors.mensagem}>
                                <textarea {...attrs('mensagem')} rows={5} maxLength={1000} required />
                            </Campo>

                            <div className="hp-field" aria-hidden="true">
                                <label htmlFor="website">Não preencha este campo</label>
                                <input id="website" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => setData('website', e.target.value)} />
                            </div>

                            <div className="col-12">
                                <div className="form-check">
                                    <input
                                        className={`form-check-input${errors.consentimento ? ' is-invalid' : ''}`}
                                        type="checkbox"
                                        id="consentimento"
                                        checked={data.consentimento}
                                        onChange={(e) => setData('consentimento', e.target.checked)}
                                        aria-describedby={errors.consentimento ? 'consentimento-erro' : undefined}
                                    />
                                    <label className="form-check-label text-small" htmlFor="consentimento">
                                        Autorizo o uso do meu nome e telefone só para responder esta mensagem. Os dados não são guardados no site.
                                    </label>
                                    {errors.consentimento && (
                                        <div className="invalid-feedback d-block" id="consentimento-erro">
                                            {errors.consentimento}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-12">
                                <button className="btn-ice w-100" type="submit" disabled={processing}>
                                    {processing ? 'Enviando…' : 'Enviar mensagem'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="map-frame mt-5">
                    <iframe
                        src={mapaUrl()}
                        title={`Mapa: ${enderecoCompleto()}`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                </div>
            </div>
        </section>
    );
}
