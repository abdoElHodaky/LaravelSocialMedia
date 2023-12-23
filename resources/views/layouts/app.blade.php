<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="flex flex-col min-h-screen">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">
        @vite(["resources/css/app.css","resources/js/dashboard.js"])
        <!-- Scripts -->
        <script src="https://cdn.tailwindcss.com"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

        @stack('head')
    </head>
    <body class="font-sans antialiased grow flex flex-col">
        <div class="bg-gray-200 grow">
            @include('layouts.navigation')

            <!-- Page Content -->
            <main>
                @yield('container')
            </main>
        </div>
    </body>
    
    <footer class="bg-gray-400 p-6">
            <p class="text-center text-gray-600 font-semibold">&copy; Copyright {{ date('Y') }}</p>
    </footer>
</html>
