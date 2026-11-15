// ILUSTRATIVO: preços e durações de exemplo. Edite aqui para mudar no site inteiro.
// icone: nome de um ícone de resources/js/Components/Services.jsx

export const services = [
    {
        nome: 'Corte masculino',
        descricao: 'Tesoura e máquina no formato do seu rosto, com lavagem e finalização.',
        preco: 60,
        duracao: '45 min',
        icone: 'tesoura',
    },
    {
        nome: 'Barba',
        descricao: 'Desenho com navalha, toalha quente e hidratação no fim.',
        preco: 45,
        duracao: '30 min',
        icone: 'barba',
    },
    {
        nome: 'Corte e barba',
        descricao: 'Os dois serviços na mesma visita, com o mesmo cuidado em cada etapa.',
        preco: 95,
        duracao: '1h15',
        icone: 'navalha',
    },
    {
        nome: 'Acabamento',
        descricao: 'Pezinho, contorno e sobrancelha entre um corte e outro.',
        preco: 25,
        duracao: '15 min',
        icone: 'pente',
    },
    {
        nome: 'Bigode',
        descricao: 'Aparo e desenho do bigode, com cera para fixar o formato.',
        preco: 20,
        duracao: '15 min',
        icone: 'bigode',
    },
];

export const formatarPreco = (valor) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
