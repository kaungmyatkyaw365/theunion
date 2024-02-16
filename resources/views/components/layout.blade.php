<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
    </script>
    @vite(['resources/css/app.css', 'resources/js/app.js', 'resource/js/components/usertable.js'])
</head>

<body class="g-sidenav-show  bg-gray-100 overflow-scroll">
    <x-navbar />
    <div class="d-flex justify-content-center row">
        <main
            class="d-flex justify-content-center main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            <!-- Navbar -->
            {{ $slot }}
        </main>
    </div>
    <x-script />
    <script>
        @auth
        window.authUser = {!! json_encode(auth()->user()) !!};
        @else
            window.authUser = null;
        @endauth
    </script>

    <script src="{{ mix('js/app.js') }}"></script>
</body>

</html>
