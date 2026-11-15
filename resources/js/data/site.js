// Dados da barbearia num lugar só.
// ILUSTRATIVO: nome, telefone, endereço, horários e redes são exemplos. Troque pelos dados reais.

export const site = {
    nome: 'Barbearia Exemplo',
    slogan: 'Corte no tempo certo, acabamento no detalhe.',
    descricao:
        'Cortes masculinos, barba e acabamento num espaço calmo, com atendimento sem pressa e conversa direta pelo WhatsApp.',

    whatsapp: {
        numero: '5511900000000', // só dígitos: 55 + DDD + número
        mensagem: 'Olá! Vim pelo site e gostaria de saber os horários disponíveis.',
    },

    telefone: '(11) 90000-0000',
    email: 'contato@barbearia-exemplo.com',

    endereco: {
        rua: 'Rua Exemplo, 123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        uf: 'SP',
        cep: '01000-000',
        mapa: 'Centro, São Paulo - SP', // o que o Google Maps procura; troque pelo endereço real
    },

    horarios: [
        { dias: 'Terça a sexta', horas: '9h às 20h' },
        { dias: 'Sábado', horas: '8h às 18h' },
        { dias: 'Domingo e segunda', horas: 'Fechado' },
    ],

    redes: [
        { nome: 'Instagram', url: 'https://www.instagram.com/' },
        { nome: 'Facebook', url: 'https://www.facebook.com/' },
        { nome: 'TikTok', url: 'https://www.tiktok.com/' },
    ],
};

export const menu = [
    { id: 'inicio', rotulo: 'Início' },
    { id: 'sobre', rotulo: 'Sobre' },
    { id: 'servicos', rotulo: 'Serviços' },
    { id: 'galeria', rotulo: 'Galeria' },
    { id: 'contato', rotulo: 'Contato' },
];

export const enderecoCompleto = () => {
    const e = site.endereco;
    return `${e.rua} – ${e.bairro}, ${e.cidade} – ${e.uf}, ${e.cep}`;
};

export const whatsappUrl = (mensagem = site.whatsapp.mensagem) =>
    `https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(mensagem)}`;

export const telefoneUrl = () => `tel:+55${site.telefone.replace(/\D/g, '')}`;

export const mapaUrl = () => `https://www.google.com/maps?q=${encodeURIComponent(site.endereco.mapa)}&z=15&output=embed`;

// Fotos do Unsplash (licença livre). Para usar fotos próprias, troque por caminhos em /public/images.
export const foto = (id, largura = 1200) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${largura}&q=70`;

export const fotoSrcSet = (id) => [480, 800, 1200, 1600].map((w) => `${foto(id, w)} ${w}w`).join(', ');
