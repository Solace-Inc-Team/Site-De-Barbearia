@php
    // ILUSTRATIVO: textos de SEO e compartilhamento. Mantenha alinhado com resources/js/data/site.js.
    $titulo = 'Corte masculino e barba | '.config('app.name');
    $descricao = 'Cortes masculinos, barba e acabamento num espaço calmo, com atendimento sem pressa. Veja serviços, preços, fotos, horários e fale pelo WhatsApp.';
    // Mesma foto do Hero (resources/js/data/gallery.js)
    $heroId = '1534297635766-a262cdcb8ee4';
    $foto = fn (int $w, ?int $h = null) => "https://images.unsplash.com/photo-{$heroId}?auto=format&fit=crop&w={$w}".($h ? "&h={$h}" : '').'&q=70';
@endphp
<!DOCTYPE html>
<html lang="pt-BR" data-bs-theme="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>{{ $titulo }}</title>
    <meta name="description" content="{{ $descricao }}">
    <meta name="theme-color" content="#15191f">
    <link rel="canonical" href="{{ url('/') }}">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">

    <meta property="og:type" content="website">
    <meta property="og:locale" content="pt_BR">
    <meta property="og:site_name" content="{{ config('app.name') }}">
    <meta property="og:title" content="{{ $titulo }}">
    <meta property="og:description" content="{{ $descricao }}">
    <meta property="og:url" content="{{ url('/') }}">
    <meta property="og:image" content="{{ $foto(1200, 630) }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">

    {{-- A foto do Hero é a maior da primeira tela: começa a baixar antes do React montar a página --}}
    <link rel="preload" as="image" fetchpriority="high"
          imagesrcset="{{ $foto(480) }} 480w, {{ $foto(800) }} 800w, {{ $foto(1200) }} 1200w, {{ $foto(1600) }} 1600w"
          imagesizes="100vw">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://images.unsplash.com">
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet">
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    <x-inertia::head />
</head>
<body>
    <x-inertia::app />
    <noscript><p style="padding:1rem">Ative o JavaScript para ver o site.</p></noscript>
</body>
</html>
