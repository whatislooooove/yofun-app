<div>
    <div class="mt-4 text-light">
        <h1>
            Ближайшие события
        </h1>
    </div>
    <div id="carouselExampleCaptions" class="carousel slide mb-4 mt-2" data-bs-ride="carousel" data-bs-interval="10000">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner rounded-5">
            @foreach($sliderItems as $sliderItem)
                <div class="carousel-item {{ $loop->first ? 'active' : '' }}"> <!-- TODO: вынести в компонент-->
                    <img src="{{ $sliderItem->img ?? asset('/storage/img/default.jpg') }}" class="d-block w-100 slide-image" alt="...">
                    <div class="carousel-caption rounded-4 mb-3">
                        <a href="{{$sliderItem->detail_url}}" target="_blank">
                            <h5>{{$sliderItem->title}}</h5>
                        </a>
                        <p class="d-none d-md-block ">{{$sliderItem->description}}</p>
                    </div>
                </div>
            @endforeach
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Предыдущий</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Следующий</span>
        </button>
    </div>
</div>
