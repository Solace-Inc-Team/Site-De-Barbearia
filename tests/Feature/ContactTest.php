<?php

namespace Tests\Feature;

use App\Mail\ContatoRecebido;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactTest extends TestCase
{
    private function dados(array $extra = []): array
    {
        return array_merge([
            'nome' => 'João Teste',
            'telefone' => '(11) 91234-5678',
            'mensagem' => 'Queria saber se tem horário no sábado.',
            'consentimento' => true,
            'website' => '',
        ], $extra);
    }

    protected function setUp(): void
    {
        parent::setUp();
        Mail::fake();
        config(['mail.contact_to' => 'dono@exemplo.test']);
    }

    public function test_envia_email_com_dados_validos(): void
    {
        $this->from('/')->post('/contato', $this->dados())
            ->assertRedirect('/')
            ->assertSessionHas('contato')
            ->assertSessionHasNoErrors();

        Mail::assertSent(ContatoRecebido::class, fn ($m) => $m->hasTo('dono@exemplo.test')
            && $m->nome === 'João Teste'
            && $m->telefone === '(11) 91234-5678');
    }

    public function test_aceita_telefone_sem_mascara(): void
    {
        $this->post('/contato', $this->dados(['telefone' => '11912345678']))->assertSessionHasNoErrors();
        Mail::assertSentCount(1);
    }

    public function test_recusa_campos_invalidos_com_mensagens_em_portugues(): void
    {
        $this->from('/')->post('/contato', [
            'nome' => '',
            'telefone' => '1234',
            'mensagem' => 'curta',
            'consentimento' => false,
        ])->assertSessionHasErrors([
            'nome' => 'Informe seu nome.',
            'telefone' => 'Informe um telefone com DDD, por exemplo (11) 91234-5678.',
            'mensagem' => 'A mensagem precisa ter pelo menos 10 caracteres.',
            'consentimento' => 'Marque a autorização para podermos responder.',
        ]);

        Mail::assertNothingSent();
    }

    public function test_armadilha_anti_spam_finge_sucesso_e_nao_envia(): void
    {
        $this->post('/contato', $this->dados(['website' => 'http://spam.test']))
            ->assertSessionHas('contato')
            ->assertSessionHasNoErrors();

        Mail::assertNothingSent();
    }

    public function test_limita_envios_por_ip(): void
    {
        for ($i = 0; $i < 3; $i++) {
            $this->post('/contato', $this->dados())->assertSessionHasNoErrors();
        }

        $this->post('/contato', $this->dados())->assertSessionHasErrors('envio');
        Mail::assertSentCount(3);
    }

    public function test_falha_no_envio_avisa_sem_quebrar(): void
    {
        Mail::shouldReceive('to')->andThrow(new \RuntimeException('SMTP fora do ar'));

        $this->post('/contato', $this->dados())->assertSessionHasErrors('envio');
    }
}
