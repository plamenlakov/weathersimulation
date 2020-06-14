# Ecotopia - Weather Simulation

The project "Ecotopia" is about simulating how human actions affect on the Earth
by showing an animation on the map and graphs with clear statistics. The user has to
input the desired values and start the simulation. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

In order to start up the project you will need to apply a few shell commands. After cloning the directory you will be provided
with a Laravel project with React front-end and D3 dependencies. First of all, you will need to create an .env file:
1. Creat a new file and rename it to .env
2. Copy the following content for it from this git repository: https://github.com/laravel/laravel/blob/master/.env.example

Done! The .env file setup is complete. Now you will need to create your laravel key:
```
php artisan key:generate
```
Create your Database tables with:
```
php artisan migrate
```
At this point you are almost ready to execute the project. Run:
```
composer install
npm install
```

### Run

In order to start the project you will need to have these three commands running at the same time:


```
php artisan serve
```

## Starting a simulation

In order to reach the website type: http://localhost:8000
You will be greeted by the home page.
The simulation testing is in the Simulation page.

In the simulation page you will see the total PPM graph on the left, controls/inputs beneath the graph, map on the right 
and the PPM barchart per country.
Initially if you click on some countries you will see their current values.
The input values are interfering the whole simulation (i.e. deforestation percentage will 
be applied to all countries each year until the end of the simulation).

After inputting desired values and year to stop the simulation press "Create new simulation".
During the runtime you can pause the simulation and change general values which are under the "Control" menu 
or change values for individual country from the Political map
The values of the countries and PPM in the Line graph and Bar Chart will be the statistics from the stopped/paused year 
while the statistics for each country in the political map are from the last year of the simulation.