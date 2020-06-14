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
<div>

    <div class='my-4 text-justify'>
        <div class="row w-75 mx-auto">
            <div class="col-md-4 p-3" data-aos="fade-right" data-aos-duration="1000" data-aos-offset="400">
                <div class="text-center" style="font-size: 55px"><i class="fas fa-globe-europe" style="color: #2EA435;"></i><i class="fas fa-temperature-high" style="color: #E94646;"></i></div>

                <h3 class="text-center">Global warming</h3>
                <hr>
                <p style='font-size: 20px'>Global warming is the ongoing rise of the average temperature of the Earth. It is a major aspect of climate change which,
                    in addition to rising global surface temperatures, affects climate
                    behavior such as bigger heatwaves and changes in precipitation.
                    More heat means that more ice is melting from the ice caps. This leads to an increase in the global ocean levels. Coastline cities are in jeopardy if we do not take measures in limitting our carbon emissions.</p>
                
                </div>
            <div class="col-md-4 p-3" data-aos="fade-down" data-aos-duration="1000" data-aos-offset="400">
                <div class="text-center" style="font-size: 55px"><i class="fas fa-smog" style="color: #333333;"></i></div>
                <h3 class="text-center">What is is PPM</h3>
                <hr>
                <p style='font-size: 20px'>PPM stands for <b>P</b>arts <b>P</b>er <b>M</b>illion and it is a measure of concentration. In our case this represents the amount of carbon dioxide (CO₂) molecules in a million parts of air.
                The current global value of CO₂ PPM is ~418. The more the concentration in the atmosphere, the higher the average global temperature becomes. 
                The increase will result in more frequent wildfires, expansion of deserts, extreme climate and more catastrophic consequences. 
            </p>
            </div>
            <div class="col-md-4 p-3" data-aos="fade-left" data-aos-duration="1000" data-aos-offset="400">
                <div class="text-center" style="font-size: 55px"><i class="fas fa-laptop-code" style="color: #10B5F3;"></i></div>
                <h3 class="text-center">Our contribution</h3>
                <hr>
                <p style='font-size: 20px'>Through this app, we want to demonstrate the devastating effect of global warming and what could be the consequences if no measures are taken in time.
                Our algorithm calculates how the PPM, produced by six of the most polluting sectors, affects the global temperature. You can see the results in a live simulation visualized by graphs and a terrain map.
            </p>
            </div>
        </div>
    </div>
    <div class="text-center m-5" style='font-size: 40px' data-aos="fade-up" data-aos-duration="1000" data-aos-offset="400">Want to try it out? We have made a quick tutorial for you! Just keep scrolling.</div>
</div>
<div class="m-4 " role="alert" data-aos="fade-up" data-aos-duration="1000" data-aos-offset="500">

    <div class="w-75 mx-auto">
        <div class="m-2 p-2 row">
            <div class="col-md-9 text-right" data-aos="fade-right" data-aos-duration="1000"  data-aos-offset="520">
                <div class="border border-primary">

                    <img class="w-100" src="images/main/OpenControls.gif" alt="opening controls">
                </div>
            </div>
            <div class="col-md-3 text-justify" data-aos="fade-left" data-aos-duration="1000" data-aos-offset="520">
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