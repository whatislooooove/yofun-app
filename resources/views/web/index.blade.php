<!DOCTYPE html>
<html lang="ru">
<head>
    @include('web.layout.head')
</head>
<body class="d-flex flex-column h-100">
    <header>
        @include('web.layout.header')
    </header>
    <main class="flex-shrink-0 min-vh-100">
        <div class="container">
            @include('web.layout.content')
        </div>
    </main>
    <footer class="w-100 bg-dark bg-gradient rounded-top">
        @include('web.layout.footer')
    </footer>
</body>
</html>
