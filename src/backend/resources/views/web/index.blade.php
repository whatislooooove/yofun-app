@extends('web.layout.frame')
@push('extra-styles')
    @vite('resources/sass/components/card.scss')
@endpush

@section('content')
    <x-slider :$sliderItems/>
    <x-card-table title="Все события на неделю" :$tableItems/>
@endsection
