@extends('layouts.app')

@section('content')
<div style='background-color: black'>


    <div id="carouselExampleIndicators" class="mx-auto w-75 carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="d-block w-100" src="/images/main/graph.png" alt="First slide">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Temperatures are raising.</h5>
                </div>
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="/images/main/waterLevels.png" alt="Second slide">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Ice caps are melting.</h5>
                </div>
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="/images/main/NASA.png" alt="Third slide">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Estimate what will happen during the next decades.</h5>
                </div>
            </div>
        </div>

    </div>

</div>
<div class="container">

    <div class='m-4 text-justify'>
        <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas similique quia esse quisquam non repudiandae quod distinctio molestias id atque, iusto modi perferendis iste voluptate corrupti perspiciatis iure dignissimos fuga excepturi quos quidem nobis nulla tempora? Iure repellat adipisci assumenda veritatis itaque modi totam hic, molestias architecto. Cupiditate, provident tenetur architecto corrupti perferendis expedita, praesentium minima facilis magnam est voluptatem officia error consequatur quas iusto illo exercitationem, tempore repellendus! Corporis natus labore laborum inventore rerum, facere reprehenderit voluptates repellat fugit nostrum consequatur, exercitationem dolorem? Officia esse eaque reiciendis sed nisi culpa qui aperiam voluptatem, iusto quas consequatur voluptatibus ipsum quam modi enim totam? Deserunt dolorum accusantium incidunt recusandae ipsa eum, corporis magni consequuntur corrupti nobis velit tempora consequatur aliquid! Voluptatum ratione magnam officiis molestiae ipsum sequi, explicabo minus quod nesciunt qui consequatur tenetur iste nemo mollitia adipisci laudantium ea vel ipsa perferendis in alias pariatur. Veritatis dolore dolores illum sit porro ad at labore saepe totam, possimus voluptate ex debitis nesciunt. Voluptatibus dolore dolorum vel, expedita nostrum eaque dolorem iste illum quasi labore praesentium eveniet dolores cupiditate porro veritatis laborum repellendus ullam delectus nobis eum! Dignissimos pariatur repudiandae omnis nostrum sapiente obcaecati delectus non aut sint ullam aliquam, impedit accusantium.</h3>
    </div>
</div>

<div id="stepper"></div>

<!-- <div class="m-3 alert alert-info" role="alert">
    <h2 class="alert-heading">Make your own</h2>
    <hr>
    <div class="row ">
        <div class="col-md-4 align-self-center">
            <div class="m-3 mt-5">
                <div class="card">
                    <img class="card-img-top" src="/images/main/NASA.png" alt="Card image cap">
                    <div class="card-body">
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 text-center align-self-center ">
            <img src="images/main/arrow_right.png" alt="arrow">
        </div>
        <div class="col-md-4">
            <div class="m-3 mt-5">
                <div class="card">
                    <img class="card-img-top" src="/images/main/NASA.png" alt="Card image cap">
                    <div class="card-body">
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row m-3">
        <div class="col align-self-right">
            <img class="float-right h-50" src="images/main/arrow_left.png" alt="arrow" style='transform: rotate(-90deg)'>
        </div>

    </div>
    <div class="row">
        <div class="col-md-4">
            <div class="m-3 mt-5">
                <div class="card">
                    <img class="card-img-top" src="/images/main/NASA.png" alt="Card image cap">
                    <div class="card-body">
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 text-center align-self-center">
            <img src="images/main/arrow_left.png" alt="arrow">
        </div>
        <div class="col-md-4">
            <div class="m-3 mt-5">
                <div class="card">
                    <img class="card-img-top" src="/images/main/NASA.png" alt="Card image cap">
                    <div class="card-body">
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>



</div> -->



@endsection