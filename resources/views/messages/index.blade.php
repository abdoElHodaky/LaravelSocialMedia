@extends('layouts.app')

@section('container')
    <div class="pb-12 sm:py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            
            @if ($messages->hasPages())
                <div class="py-6 px-6 sm:px-0">
                    {{ $messages->appends(request()->input())->links() }}
                </div>
            @endif

            <div>
                @foreach ($messages as $message)
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg grow flex flex-col mb-6">
                    <div class="bg-white border-b border-gray-200 grow flex flex-col">
            
                        <div class="p-6 grow flex flex-col">
                            <div class="flex">
                                <div class="bg-gray-800 rounded-full w-20 h-20 mr-6 shrink-0 self-center flex flex-col items-center justify-center">
                                    <span class="uppercase text-gray-600 font-bold text-3xl">U</span>
                                </div>
                                <div class="flex flex-col">
                                    <h2 class="text-xl font-bold">{{ $message->sender->name }}</h2>
                                    <ul>
                                        <li>{{ $message->created_at->diffForHumans() }}</li>
                                    </ul>
                                    <p>{{ $message->content }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>

            @if ($messages->hasPages())
                <div class="pt-3 px-6 sm:px-0">
                    {{ $messages->appends(request()->input())->links() }}
                </div>
            @endif
        </div>
    </div>
@endsection
