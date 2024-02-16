<x-layout>
    <div id="usertable"></div>
    {{-- <div id="root"></div> --}}
    @viteReactRefresh
    @vite(['resources/js/components/usertable.jsx'])

</x-layout>
<x-script>
    window.myData = {!! json_encode($accounts) !!};
</x-script>
