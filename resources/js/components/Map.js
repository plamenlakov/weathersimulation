import React from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import Simulation from "./classes/Simulation";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    // componentDidMount() {
    //     var self = this;
    //     console.log(this.props.data)
    //     const width = 1280,
    //         height = 900,
    //         projection = d3.geoMercator()
    //             .center([13, 52]) //longitude, latitude
    //             .translate([width / 2, height / 2]) // center the image
    //             .scale([width / 1.5]);
    //     const path = d3.geoPath().projection(projection);
    //     const svg = d3.select("#Map").append("svg")
    //         .attr("width", '100%')
    //         .attr("height", '100%')
    //         .attr("viewBox", "0 0 " + width + " " + height)
    //         .attr("preserveAspectRatio", "xMinYMin");

    //     const zoom = d3.zoom()
    //         .scaleExtent([1, 8])
    //         .on('zoom', zoomed);

    //     const g = svg.append('svg');

    //     svg.call(zoom);

    //     function zoomed() {
    //         svg
    //             .selectAll('path') // To prevent stroke width from scaling
    //             .attr('transform', d3.event.transform);
    //     }
        
    //     d3.json('/Europe.geo.json')
    //         .then(topology => {
    //             //onsole.log(topology);
    //             svg.selectAll(".country")
    //                 .data(topology.features)
    //                 .enter()
    //                 .append("path")
    //                 .attr("class", ".country")
    //                 .attr("d", path)
    //                 .attr("fill", "#cccccc")
    //                 .attr("stroke", "#333333")
    //                 .attr("stroke-width", "0.5")
    //                 .on("mouseover", function (d) {
    //                     var countryNames = self.props.data.map(d => d['name']);
    //                     var hoveredCountryName = countryNames.find(c => c == d.properties.name);
    //                     for (let i = 0; i < self.props.data.length; i++) {
    //                         if (self.props.data[i].name == hoveredCountryName) {
    //                             d3.select(this)
    //                             .attr("fill", "darkgrey")
    //                             .style("cursor", "pointer");
    //                         }
                           
    //                     }
    //                 })
    //                 .on("click", function (d) {
    //                     document.getElementById("countryName").innerHTML = `<b>${d.properties.name}</b>`;
    //                     var countryNames = self.props.data.map(d => d['name']);
    //                     var clickedCountryName = countryNames.find(c => c == d.properties.name);
    //                     var countryPopulation = NaN;
    //                     var countryForest = NaN;
    //                     var countryArea = NaN;
    //                     var countryPPM = NaN;
    //                     for (let i = 0; i < self.props.data.length; i++) {
    //                         if (self.props.data[i].name == clickedCountryName) {
    //                             countryPopulation = self.props.data[i].population;
    //                             countryForest = self.props.data[i].forests;
    //                             countryArea = self.props.data[i].area;
    //                             countryPPM = self.props.data[i].ppm;
    //                         }
    //                     }
    //                     if (clickedCountryName == null) {
    //                         document.getElementById("modal-body").innerHTML = `Not used!`;
    //                         document.getElementById("modalButton").click();
    //                     } else {
    //                         document.getElementById("modal-body").innerHTML = `<h5>Population: ${countryPopulation}</h5>
    //                                                                                 <h5>Forest: ${countryForest} %</h5>
    //                                                                                 <h5>Area: ${countryArea}km2</h5>
    //                                                                                 <h5>PPM: ${countryPPM}</h5>`;
    //                         document.getElementById("modalButton").click();
    //                     }

    //                 })
    //                 .on("mouseout", function (d) {
    //                     d3.select(this).attr("fill", "#cccccc")

    //                 })                    
    //         })

    // }

    componentDidMount() {

        const SIZE_AMPLIFIER = 20;
        var container = document.getElementById("main_map");
        var scene, camera, renderer, controls;
        var data, plane;
    
        //load map datd from bin file
        function loadTerrain(file) {
          var xhr = new XMLHttpRequest();
          xhr.responseType = 'arraybuffer';
          xhr.open('GET', file, true);
          xhr.onload = function (evt) {
            if (xhr.response) {
              data = new Uint16Array(xhr.response)
              init();
            }
    
          };
          xhr.send(null);
        }
    
        loadTerrain('stats.bin');
    
        function init() {
    
          // initialize camera

          //container.height = 900;

          camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 100000);
          camera.position.set(9191, 15000, 21000);
          
          // initialize scene
          scene = new THREE.Scene();
          var containerWidth = document.querySelector('#main_map').getBoundingClientRect().right - document.querySelector("#main_map").getBoundingClientRect().left;

          // initialize directional light (sun)
          var sun = new THREE.DirectionalLight(0xFFFFFF, 1.0);
          sun.position.set(300, 400, 300);
          sun.distance = 1000;
          scene.add(sun);
    
          var frame = new THREE.SpotLightHelper(sun);
          scene.add(frame);
    
          // initialize renderer
          renderer = new THREE.WebGLRenderer();
          renderer.setClearColor(0x006994);
          renderer.setPixelRatio(window.devicePixelRatio);
          renderer.setSize(containerWidth, containerWidth / 2 + 150);
          container.append(renderer.domElement);
          
          //initialize controls
          controls = new OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 1;
          controls.rotateSpeed = .8;
          controls.maxPolarAngle = Math.PI / 2 - .3;
    
          //initialize plane
          plane = new THREE.PlaneBufferGeometry(2500 * SIZE_AMPLIFIER, 2500 * SIZE_AMPLIFIER, 999, 999);
          plane.castShadow = true;
          plane.receiveShadow = true;
    
          var heights = plane.attributes.position.array;
          
          // apply height map to vertices of plane
          for (let i = 0, j = 2; i < data.length; i += 1, j += 3) {
            if (data[i] == 0) {
              heights[j] = data[i]
            } else {
              heights[j] = data[i] / 65535 * 480 + 10
            }
          }
    
         
          var colors = new Float32Array(heights.length);
          var adjustHeight = 10 + 1.7// 0.1 ~ 50cm water level, starts from 1.7
    
          for (let i = 2, j = 0; i < heights.length; i += 3, j += 3) {
    
           if(heights[i] >= 0 && heights[i] < 350 / adjustHeight){
              //console.log(0)
              colors[j] = new THREE.Color(0x000000).r;
              colors[j + 1] = new THREE.Color(0x006900).g;
              colors[j + 2] = new THREE.Color(0x000094).b;
           }
           else if(heights[i] >= 350 / adjustHeight && heights[i] < 900 / adjustHeight){
            colors[j] = new THREE.Color(0x6e0000).r;
            colors[j + 1] = new THREE.Color(0x00dc00).g;
            colors[j + 2] = new THREE.Color(0x00006e).b;
           }
           else if(heights[i] >= 900 / adjustHeight && heights[i] < 1300 / adjustHeight){
            colors[j] = new THREE.Color(0xf00000).r;
            colors[j + 1] = new THREE.Color(0x00fa00).g;
            colors[j + 2] = new THREE.Color(0x0000a0).b;
           }
           else if(heights[i] >= 1300 / adjustHeight && heights[i] < 1900 / adjustHeight){
            colors[j] = new THREE.Color(0xe00000).r;
            colors[j + 1] = new THREE.Color(0x0bd00).g;
            colors[j + 2] = new THREE.Color(0x000077).b;
           }
           else if(heights[i] >= 1900 / adjustHeight && heights[i] < 2500 / adjustHeight){
            colors[j] = new THREE.Color(0xdd0000).r;
            colors[j + 1] = new THREE.Color(0x009800).g;
            colors[j + 2] = new THREE.Color(0x000056).b;
           }
           else if(heights[i] >= 2500 / adjustHeight && heights[i] < 3300 / adjustHeight){
            colors[j] = new THREE.Color(0xa00000).r;
            colors[j + 1] = new THREE.Color(0x005200).g;
            colors[j + 2] = new THREE.Color(0x00002d).b;
           }
           else{
            colors[j] = new THREE.Color(0xd20000).r;
            colors[j + 1] = new THREE.Color(0x00d200).g;
            colors[j + 2] = new THREE.Color(0x0000d2).b;
           }  
    
          }
          
          plane.setAttribute('position', new THREE.BufferAttribute(heights, 3));
          plane.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    
          var material = new THREE.MeshLambertMaterial({
            vertexColors: THREE.VertexColors, side: THREE.DoubleSide
          })
    
          var mesh = new THREE.Mesh(plane, material);
          mesh.rotation.x = - Math.PI / 2;
          mesh.matrixAutoUpdate = false;
          mesh.updateMatrix();
    
          plane.computeFaceNormals();
          plane.computeVertexNormals();
    
          scene.add(mesh);
    
          animate();
        }

        function onWindowResize(){

          //camera.aspect = window.innerWidth / window.innerHeight;
          //camera.updateProjectionMatrix();
          let containerWidth = document.querySelector('#main_map').getBoundingClientRect().right - document.querySelector("#main_map").getBoundingClientRect().left;
          console.log(containerWidth)
          renderer.setSize(containerWidth, containerWidth / 2 + 100);
      
      }
    
        function animate() {
          requestAnimationFrame(animate);
    
          renderer.render(scene, camera);
          
    
          //controls.update();
        }
        window.addEventListener('resize', onWindowResize, false)
    
      }


    render() {
        const mystyle = {
            width: 500,
            height: 300,
            backgroundColor: 'white',
            borderRadius: 4,
            textAlign: 'center',
            padding: 20

        }
        return (
            <div className=""  id="main_map" style={{width: 100 + "%", height: 100 + "%"}}></div>
            // <div>
            //     <div id="Map"  className="border border-primary rounded img-thumbnail" style={{backgroundColor: "#7fcdff"}}></div>
            // </div>
        );
    }
}

export default Map;