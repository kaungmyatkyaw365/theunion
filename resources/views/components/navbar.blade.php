<nav style="z-index: 100" class="navbar bg-primary navbar-expent position-sticky top-0 navbar-expand-lg bg-body-primary">
    <div class="container ">
        <div class="container-fluid align-item-center d-flex justify-content-between">
            <a class="navbar-brand" href="#"><span class=" navbar-brand mb-0 h1 "><img style="height: 12vh"
                        src="https://theunion.org/themes/custom/union-core/img/skin/logo/no-png_logo--full.gif"
                        alt="The Union logo"></span>
                <x-sidebar /></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a href="{{ route('home') }}"
                        class="nav-link {{ request()->route()->uri == 'home' ? 'active' : '' }} ">
                        <span class="nav-link-text  ms-1">Accounts</span>
                    </a>
                    <a href="{{ route('volunteer') }}"
                        class="nav-link {{ request()->route()->uri == 'volunteer' ? 'active' : '' }} ">
                        <span class="nav-link-text ms-1">Volunteer</span>
                    </a>
                    <a href="{{ route('patient') }}"
                        class="nav-link {{ request()->route()->uri == 'patient' ? 'active' : '' }} ">
                        <span class="nav-link-text ms-1">Patient</span>
                    </a>
                    <a href="{{ route('votpatient') }}"
                        class="nav-link {{ request()->route()->uri == 'patient' ? 'active' : '' }} ">
                        <span class="nav-link-text ms-1">VOT-Patient</span>
                    </a>
                </div>
            </div>
            @auth
                <div>
                    <a href="/logout"><button type="button" class="btn btn-primary">logout</button></a>
                </div>
            @endauth
        </div>
    </div>
</nav>
