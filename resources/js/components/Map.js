import React from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import Simulation from "./classes/Simulation";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terrainData: null,
      countries: null,
      bordersData: null,
      dataLoaded: false
    }

  }

  componentDidMount() {

    const SIZE_AMPLIFIER = 20;
    const WIDTH = 2500 * SIZE_AMPLIFIER;
    var container = document.getElementById("main_map");
    var renderer, scene, camera;
    var terrainData;
    const svgGroup = new THREE.Group();
    //load map datd from bin file
    function loadTerrain(file) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'arraybuffer';
      xhr.open('GET', file, true);
      xhr.onload = function (evt) {
        if (xhr.response) {
          terrainData = new Uint16Array(xhr.response)
          init();
        }

      };
      xhr.send(null);
    }

    loadTerrain('stats.bin');

    function init() {

      // initialize camera
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000000);
      camera.position.set(9191, 15000, 21000);

      // initialize scene
      scene = new THREE.Scene();
      var containerWidth = container.getBoundingClientRect().right - container.getBoundingClientRect().left;

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
      var controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 1;
      controls.rotateSpeed = .8;
      //controls.maxPolarAngle = Math.PI / 2 - .3;

      //initialize plane ***** 999, 999 because file size is 1000x1000
      var terrainGeometry = new THREE.PlaneBufferGeometry(WIDTH - 3200, WIDTH + 2100, 999, 999);
      terrainGeometry.castShadow = true;
      terrainGeometry.receiveShadow = true;

      var heightsArray = terrainGeometry.attributes.position.array;

      // apply height map to vertices of terrainGeometry
      for (let i = 0, j = 2; i < terrainData.length; i += 1, j += 3) {
        if (terrainData[i] == 0) {
          heightsArray[j] = terrainData[i]
        } else {
          heightsArray[j] = terrainData[i] / 65535 * 480 + 10
        }
      }

      var colorsArray = new Float32Array(heightsArray.length);
      var waterLevel = 1.7;
      var adjustHeight = 10 + waterLevel// 0.1 ~ 50cm water level, starts from 1.7

      function addColors(counterJ, colorR, colorG, colorB) {
        colorsArray[counterJ] = new THREE.Color(colorR).r;
        colorsArray[counterJ + 1] = new THREE.Color(colorG).g;
        colorsArray[counterJ + 2] = new THREE.Color(colorB).b;
      }

      for (let i = 2, j = 0; i < heightsArray.length; i += 3, j += 3) {

        if (heightsArray[i] >= 0 && heightsArray[i] < 350 / adjustHeight) {
          addColors(j, 0x000000, 0x006900, 0x000094);
        }
        else if (heightsArray[i] >= 350 / adjustHeight && heightsArray[i] < 900 / adjustHeight) {
          addColors(j, 0x6e0000, 0x00dc00, 0x00006e);
        }
        else if (heightsArray[i] >= 900 / adjustHeight && heightsArray[i] < 1300 / adjustHeight) {
          addColors(j, 0xf00000, 0x00fa00, 0x0000a0);
        }
        else if (heightsArray[i] >= 1300 / adjustHeight && heightsArray[i] < 1900 / adjustHeight) {
          addColors(j, 0xe00000, 0x0bd00, 0x000077);
        }
        else if (heightsArray[i] >= 1900 / adjustHeight && heightsArray[i] < 2500 / adjustHeight) {
          addColors(j, 0xdd0000, 0x009800, 0x000056);
        }
        else if (heightsArray[i] >= 2500 / adjustHeight && heightsArray[i] < 3300 / adjustHeight) {
          addColors(j, 0xa00000, 0x005200, 0x00002d);
        }
        else {
          addColors(j, 0xd20000, 0x00d200, 0x0000d2);
        }

      }

      terrainGeometry.setAttribute('position', new THREE.BufferAttribute(heightsArray, 3));
      terrainGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3))

      var terrainMaterial = new THREE.MeshLambertMaterial({
        vertexColors: THREE.VertexColors, side: THREE.DoubleSide
      })

      var terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
      terrainMesh.rotation.x = - Math.PI / 2;
      terrainMesh.matrixAutoUpdate = false;
      terrainMesh.updateMatrix();

      terrainGeometry.computeFaceNormals();
      terrainGeometry.computeVertexNormals();

      scene.add(terrainMesh);

      const width1 = WIDTH; //2500 * SIZE_AMPLIFIER,
      const projection = d3.geoTransverseMercator().rotate([-10, 0, 0]) //center meridian

        .center([10, 52]) //longitude, latitude
        .scale(width1 * 1.5 - 505); //scale
      const path = d3.geoPath().projection(projection);
      const svg = d3.select("#Map").append("svg")

      d3.json('/Europe1.geo.json')
        .then(topology => {

          svg.selectAll(".country")
            .data(topology.features)
            .enter()
            .append("path")
            .attr("class", ".country")
            .attr("d", path)

          var svgMarkup = svg.node().outerHTML;
          var loader = new SVGLoader();
          var svgData = loader.parse(svgMarkup);


          svgData.paths.forEach((path, i) => {
            var shapes = path.toShapes(true);


            shapes.forEach((shape, j) => {

              var geomSVG = new THREE.ExtrudeBufferGeometry(shape, {
                depth: 10,
                bevelEnabled: false
              })

              //needed for click event!
              var materialSVG = new THREE.MeshLambertMaterial({
                color: 0xFFFFFF,
                transparent: true,
                opacity: 0,
              });

              var meshSVG = new THREE.Mesh(geomSVG, materialSVG);
              //meshSVG.callback = function(){console.log("clicked" + j)}
              svgGroup.add(meshSVG);


              //create borders
              var borderMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 3 })
              var borderGeometry = new THREE.EdgesGeometry(geomSVG, 15);
              var bordermesh = new THREE.LineSegments(borderGeometry, borderMaterial);

              svgGroup.add(bordermesh);

            })
          })

          svgGroup.rotateX(Math.PI / 2)
          svgGroup.position.z = -300;
          svgGroup.position.x = 16300;

          svgGroup.position.y = 0;

          scene.add(svgGroup);
          svg.remove();

        })

      animate();
    }

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    function onWindowResize() {
      let containerWidth = container.getBoundingClientRect().right - container.getBoundingClientRect().left;
      renderer.setSize(containerWidth, containerWidth / 2 + 100);
    }
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    function onClickCountry(event) {
      event.preventDefault();

      mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      var intersects = raycaster.intersectObject(svgGroup.children);

      if (intersects.length > 0) {
        intersects[0].object.callback();
      }
    }

    window.addEventListener('resize', onWindowResize, false);
    container.addEventListener('click', onClickCountry, false);

  }

  getCountryData() {
    this.setState({
      countries: this.props.data
    })

  }

  getTerrainData(fileBin, fileJSON) {
    var xhr = new XMLHttpRequest();
    var self = this;

    xhr.responseType = 'arraybuffer';
    xhr.open('GET', fileBin, true);
    xhr.onload = function (evt) {
      if (xhr.response) {
        var terrainData = new Uint16Array(xhr.response);

        d3.json(fileJSON)
          .then(topology => {
            self.setState(function (props) {
              countries: props.data;
              bordersData: topology.features;
              terrainData: terrainData;
              dataLoaded: true;
            })

          })
        //init();
      }

    };
    xhr.send(null);

  }

  getBordersData(file) {

  }

  componentWillMount() {
    this.getTerrainData('stats.bin', 'Europe1.geo.json');
  }

  render() {
    if (this.state.dataLoaded === false) {
      console.log("not loaded yet");
      return;

    }
    else {
      console.log(this.state.terrainData);
      console.log(this.state.countries);
      console.log(this.state.bordersData);
    }

    // svgData.paths.forEach((path, i) => {
    //   var shapes = path.toShapes(true);


    //   shapes.forEach((shape, j) => {

    //     var geomSVG = new THREE.ExtrudeBufferGeometry(shape, {
    //       depth: 10,
    //       bevelEnabled: false
    //     })

    //     //needed for click event!
    //     var materialSVG = new THREE.MeshLambertMaterial({
    //       color: 0xFFFFFF,
    //       transparent: true,
    //       opacity: 0,
    //     });

    //     var meshSVG = new THREE.Mesh(geomSVG, materialSVG);

    return (

      <div>
        <div id="Map" style={{ display: "none" }}></div>
        <div className="" id="main_map" style={{ width: 100 + "%", height: 100 + "%" }}></div>
      </div>
    );
  }
}

export default Map;