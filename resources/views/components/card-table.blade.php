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
                        <h5 class="card-title">{{ $item->title }}</h5>
                        <button type="button"
                                class="btn btn-secondary"
                                data-bs-container="body"
                                data-bs-toggle="popover"
                                data-bs-placement="bottom"
                                data-bs-content="{{ $item->description }}">
                            Подробнее
                        </button>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>
