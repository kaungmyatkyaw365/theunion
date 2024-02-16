<x-layout>
    <div id="volunteertable"></div>
    {{-- <div id="root"></div> --}}
    @viteReactRefresh
    @vite(['resources/js/components/volunteertable.jsx'])

</x-layout>
<x-script>
    window.myData = {!! json_encode($volunteers) !!};
</x-script>
