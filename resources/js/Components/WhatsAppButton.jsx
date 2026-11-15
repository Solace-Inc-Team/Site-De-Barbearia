import { FaWhatsapp } from 'react-icons/fa';
import { whatsappUrl } from '../data/site';

export default function WhatsAppButton() {
    return (
        <a className="whatsapp-float" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp (abre em nova aba)">
            <FaWhatsapp size={30} aria-hidden="true" />
        </a>
    );
}
