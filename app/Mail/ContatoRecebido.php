<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class ContatoRecebido extends Mailable
{
    public function __construct(
        public string $nome,
        public string $telefone,
        public string $mensagem,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Contato pelo site: '.$this->nome);
    }

    public function content(): Content
    {
        return new Content(text: 'mail.contato');
    }
}
