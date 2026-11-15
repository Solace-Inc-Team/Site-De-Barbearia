<?php

namespace App\Http\Controllers;

use App\Mail\ContatoRecebido;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Throwable;

class ContactController extends Controller
{
    private const LIMITE_ENVIOS = 3;

    private const JANELA_SEGUNDOS = 600;

    private const SUCESSO = 'Mensagem enviada. Vamos responder pelo telefone que você informou.';

    public function store(Request $request): RedirectResponse
    {
        // Armadilha anti-spam: pessoas não veem o campo "website". Robô que preenche recebe "sucesso" e nada é enviado.
        if (filled($request->input('website'))) {
            return back()->with('contato', self::SUCESSO);
        }

        $chave = 'contato:'.$request->ip();
        if (RateLimiter::tooManyAttempts($chave, self::LIMITE_ENVIOS)) {
            $minutos = (int) ceil(RateLimiter::availableIn($chave) / 60);
            throw ValidationException::withMessages([
                'envio' => "Muitas mensagens em pouco tempo. Tente de novo em {$minutos} min ou chame no WhatsApp.",
            ]);
        }

        $dados = $request->validate([
            'nome' => ['required', 'string', 'min:2', 'max:80'],
            'telefone' => ['required', 'string', 'max:20', function (string $campo, mixed $valor, \Closure $falha) {
                $digitos = strlen(preg_replace('/\D/', '', (string) $valor));
                if ($digitos < 10 || $digitos > 13) {
                    $falha('Informe um telefone com DDD, por exemplo (11) 91234-5678.');
                }
            }],
            'mensagem' => ['required', 'string', 'min:10', 'max:1000'],
            'consentimento' => ['accepted'],
        ], [
            'nome.required' => 'Informe seu nome.',
            'nome.min' => 'O nome precisa ter pelo menos 2 letras.',
            'nome.max' => 'Use no máximo 80 caracteres no nome.',
            'telefone.required' => 'Informe um telefone com DDD, por exemplo (11) 91234-5678.',
            'telefone.max' => 'Informe um telefone com DDD, por exemplo (11) 91234-5678.',
            'mensagem.required' => 'Escreva sua mensagem.',
            'mensagem.min' => 'A mensagem precisa ter pelo menos 10 caracteres.',
            'mensagem.max' => 'Use no máximo 1000 caracteres na mensagem.',
            'consentimento.accepted' => 'Marque a autorização para podermos responder.',
            '*.string' => 'Valor inválido.',
        ]);

        RateLimiter::hit($chave, self::JANELA_SEGUNDOS);

        try {
            Mail::to(config('mail.contact_to'))->send(new ContatoRecebido(
                nome: Str::squish($dados['nome']),
                telefone: Str::squish($dados['telefone']),
                mensagem: trim($dados['mensagem']),
            ));
        } catch (Throwable $e) {
            // Sem dados do visitante no log (LGPD): só o motivo técnico
            Log::error('Falha ao enviar e-mail de contato: '.$e->getMessage());

            throw ValidationException::withMessages([
                'envio' => 'Não foi possível enviar agora. Tente de novo em alguns minutos ou chame no WhatsApp.',
            ]);
        }

        return back()->with('contato', self::SUCESSO);
    }
}
