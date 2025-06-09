<div>
    <div class="mt-4 text-light">
        <h2>{{ $title }}</h2>
    </div>

    <div class="row row-cols-5 g-2 mb-3">
        @foreach($tableItems as $item)
            <div class="col">
                <div class="card d-flex flex-column h-100">
                    <img src="{{ $item->img ?? asset('/storage/img/default.jpg') }}" class="card-img-top" alt="...">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title text-white">{{ $item->title }}</h5>
                        <a href="{{ $item->detail_url }}"
                            type="button"
                            class="btn btn-secondary"
                            target="_blank">
                            Подробнее
                        </a>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>
