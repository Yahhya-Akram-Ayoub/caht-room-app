@extends('layouts.app')

@section('content')
<div class="container">

    <message-component :user="{{Auth::user()}}"></message-component>
</div>
@endsection
