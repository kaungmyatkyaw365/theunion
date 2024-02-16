<x-layout>
    <div id="patienttable"></div>
    @viteReactRefresh
    @vite(['resources/js/components/patienttable.jsx'])

</x-layout>
<x-script>
    window.myPatients = {!! json_encode($patients) !!};
    window.myVolunteers = {!! json_encode($volunteers) !!};
    window.myRegimens = {!! json_encode($regimens) !!};
    window.myVotpatients = {!! json_encode($votpatients) !!};
</x-script>
