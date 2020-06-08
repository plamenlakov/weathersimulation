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
<div class="">

    <div class='m-4 text-justify'>
        <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas similique quia esse quisquam non repudiandae quod distinctio molestias id atque, iusto modi perferendis iste voluptate corrupti perspiciatis iure dignissimos fuga excepturi quos quidem nobis nulla tempora? Iure repellat adipisci assumenda veritatis itaque modi totam hic, molestias architecto. Cupiditate, provident tenetur architecto corrupti perferendis expedita, praesentium minima facilis magnam est voluptatem officia error consequatur quas iusto illo exercitationem, tempore repellendus! Corporis natus labore laborum inventore rerum, facere reprehenderit voluptates repellat fugit nostrum consequatur, exercitationem dolorem? Officia esse eaque reiciendis sed nisi culpa qui aperiam voluptatem, iusto quas consequatur voluptatibus ipsum quam modi enim totam? Deserunt dolorum accusantium incidunt recusandae ipsa eum, corporis magni consequuntur corrupti nobis velit tempora consequatur aliquid! Voluptatum ratione magnam officiis molestiae ipsum sequi, explicabo minus quod nesciunt qui consequatur tenetur iste nemo mollitia adipisci laudantium ea vel ipsa perferendis in alias pariatur. Veritatis dolore dolores illum sit porro ad at labore saepe totam, possimus voluptate ex debitis nesciunt. Voluptatibus dolore dolorum vel, expedita nostrum eaque dolorem iste illum quasi labore praesentium eveniet dolores cupiditate porro veritatis laborum repellendus ullam delectus nobis eum! Dignissimos pariatur repudiandae omnis nostrum sapiente obcaecati delectus non aut sint ullam aliquam, impedit accusantium.</h3>
    </div>
</div>
<div class="m-4 alert alert-primary" role="alert">
    <h2 class="alert-heading">Create your own</h2>
    <hr>
    <div class="w-75 mx-auto">
        <div class="m-2 p-2 row">
            <div class="col-md-9 text-right" data-aos="fade-right" data-aos-duration="1000">
                <div class="border border-primary">

                    <img class="w-100" src="images/main/OpenControls.gif" alt="opening controls">
                </div>
            </div>
            <div class="col-md-3 text-justify" data-aos="fade-left" data-aos-duration="1000">
                <h1>1.</h1>
                <h3>Changing main inputs</h3>
                <p> Each value represents a percentage in the increase of a chosen sector. These percentages will take affect for each and every year for all the countries. This means that the same percentage will be added again and again each year. To avoid huge values consider inputting smaller numbers as shown in the example above.
                </p>
            </div>
        </div>
        <hr class="my-5">
        <div class="m-2 p-2 row">
            <div class="col-md-3 text-justify" data-aos="fade-right" data-aos-duration="1000" data-aos-offset="320">
                <h1>2.</h1>
                <h3>Changing a single country input</h3>
                <p> Each value represents a percentage in the increase of a chosen sector but for one country. Under the 'Political map' tab, you can find a 2D political map of Europe. You can change the values of all countries in the EU + UK. Again, the percentage is applied for each year of the simulation.
                </p>
            </div>
            <div class="col-md-9 text-left" data-aos="fade-left" data-aos-duration="1000" data-aos-offset="320">
                <div class="border border-primary">

                    <img class="w-100" src="images/main/OpenOneCountry.gif" alt="opening controls">
                </div>

            </div>
        </div>
        <hr class="my-5">
        <div class="m-2 p-2 row">
            <div class="col-md-9 text-right" data-aos="fade-right" data-aos-duration="1000" data-aos-offset="320">
                <div class="border border-primary">

                    <img class="w-100" src="images/main/StartSimulation.gif" alt="opening controls">
                </div>
            </div>
            <div class="col-md-3 text-justify" data-aos="fade-left" data-aos-duration="1000" data-aos-offset="320">
                <h1>3.</h1>
                <h3>Starting your simulation</h3>
                <p> When you have the desired inputs, the only thing left is to open the controls again and click on 'Create new simulation'.
                </p>

            </div>
        </div>
        <hr class="my-5">
        <div class="m-2 p-2 row">
            <div class="col-md-3 text-justify" data-aos="fade-right" data-aos-duration="1000" data-aos-offset="320">
                <h1>4.</h1>
                <h3>Changing values on run time</h3>
                <p> In order to change anything while the simulation is running you must pause it. Then, you are able to open the contols or any country you desire, and change the values. The changes will then be applied for the years ahead.
                </p>

            </div>
            <div class="col-md-9 text-left" data-aos="fade-left" data-aos-duration="1000" data-aos-offset="320">
                <div class="border border-primary">
                    <img class="w-100" src="images/main/ChangeValuesOnRuntime.gif" alt="opening controls">

                </div>

            </div>
        </div>
    </div>


    <div class="text-center my-5 py-5">
        <h2 class="">Congratulations, you are ready to start!</h2>
        <a href="/simulation" class="btn btn-primary btn-lg">Create you own</a>

    </div>

</div>





@endsection