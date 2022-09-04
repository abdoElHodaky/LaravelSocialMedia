@extends('dashboard')

@section('content')
    @if ($errors->any())
            @foreach ($errors->all() as $error)
                <x-alert :message="$error"></x-alert>
            @endforeach
        </ul>
    @endif

    <form method="POST" action="{{ route('categories.store') }}">
        @csrf

        <div class="flex flex-col mb-3">
            <label for="name">Name:</label>
            <input type="text" name="name" id="name" required>
        </div>

        <div class="flex justify-end">
            <input type="submit" class="py-2 px-4 rounded bg-teal-500 text-white cursor-pointer" value="Publish" />
        </div>
    </form>
@endsection