<x-layout>
    <div id="votpatienttable"></div>
    @viteReactRefresh
    @vite(['resources/js/components/votpatienttable.jsx'])

</x-layout>
<x-script>
    window.myVotpatients = {!! json_encode($votpatients) !!};
    window.myPatients = {!! json_encode($patients) !!};
    window.myVolunteers = {!! json_encode($volunteers) !!};
</x-script>
