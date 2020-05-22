import React from 'react';
import * as d3 from 'd3';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Slider from '@material-ui/core/Slider';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from './ModalCountry';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from "react-bootstrap/Tab";
import Tabs from 'react-bootstrap/Tabs';
import LinearProgress from '@material-ui/core/LinearProgress';
import Skeleton from '@material-ui/lab/Skeleton';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terrainData: null,
      countries: null,
      bordersData: null,
      waterLevel: 0,
      sliderValue: 0,
      yearIndex: 0,

      scene: null,
      renderer: null,
      camera: null,
      borders: null,
      countryFills: null,
      chosenCountry: null,
      mapValue: null,

      terrainGeometry: null,
      colorsArray: null,
      heightsArray: null,

      dataLoaded: false,
      bordersLoaded: false,
      showBorders: true,
      mapLoaded: false
    }
    this.loadData('stats.bin', 'Europe1.geo.json');
  }

  loadData(fileBin, fileJSON) {

    var xhr = new XMLHttpRequest();
    var self = this;
    var scene = new THREE.Scene();
    var svgGroup = new THREE.Group();

    xhr.responseType = 'arraybuffer';
    xhr.open('GET', fileBin, true);
    xhr.onload = function (evt) {
      if (xhr.response) {
        var terrainData = new Uint16Array(xhr.response);

        d3.json(fileJSON)
          .then(topology => {
            self.setState({
              countries: self.props.data[self.props.data.length - 1][+Object.keys(self.props.data[0]) + self.props.data.length - 1],
              bordersData: topology.features,
              terrainData: terrainData,
              scene: scene,
              borders: svgGroup,
              dataLoaded: true
            })

          })
      }

    };
    xhr.send(null);

  }

  createBorders(dataJSON) {

    var SIZE_AMPLIFIER = 20;
    var WIDTH = 2500 * SIZE_AMPLIFIER;

    var projection = d3.geoTransverseMercator().rotate([-10, 0, 0]) //center meridian
      .center([10, 52])                                             //longitude, latitude
      .scale(WIDTH * 1.5 - 505);                                    //scale

    var path = d3.geoPath().projection(projection);
    var svg = d3.select("#Map").append("svg")
      .attr("width", '100%')
      .attr("height", '100%')
      .attr("viewBox", "0 0 " + 1280 + " " + 900)
      .attr("preserveAspectRatio", "xMinYMin");

    svg.selectAll(".country")
      .data(dataJSON)
      .enter()
      .append("path")
      .attr("class", ".country")
      .attr("d", path);


    var svgMarkup = svg.node().outerHTML;
    var loader = new SVGLoader();
    var svgData = loader.parse(svgMarkup);

    svgData.paths.forEach((path, i) => {
      var shapes = path.toShapes(true);

      shapes.forEach((shape, j) => {

        var geomSVG = new THREE.ExtrudeBufferGeometry(shape, {
          depth: 50,
          bevelEnabled: false
        })

        //needed for click event!
        // var materialSVG = new THREE.MeshLambertMaterial({
        //   color: 0xFFFFFF,
        //   transparent: true,
        //   opacity: 0,
        // });

        // var meshSVG = new THREE.Mesh(geomSVG, materialSVG);
        // this.state.borders.add(meshSVG);

        //create borders
        var borderMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 3 })
        var borderGeometry = new THREE.EdgesGeometry(geomSVG, 15);
        var bordermesh = new THREE.LineSegments(borderGeometry, borderMaterial);

        this.state.borders.add(bordermesh);

      })

    })

    this.state.borders.rotateX(Math.PI / 2)
    this.state.borders.position.z = -300;
    this.state.borders.position.x = 16300;

    this.state.borders.position.y = 0;

    this.state.scene.add(this.state.borders);
    svg.remove();

    this.createPoliticalMap(dataJSON);

    this.state.bordersLoaded = true;
    this.state.mapLoaded = true;
  }

  createTerrain(dataBin, dataJSON, container) {

    if (!this.state.mapLoaded) {
      var self = this;
      const SIZE_AMPLIFIER = 20;
      const WIDTH = 2500 * SIZE_AMPLIFIER;
      var renderer, camera;

      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000000);
      camera.position.set(9191, 15000, 21000);

      var containerWidth = container.getBoundingClientRect().right - container.getBoundingClientRect().left;

      // initialize directional light (sun)
      var sun = new THREE.DirectionalLight(0xFFFFFF, 1.0);
      sun.position.set(300, 400, 300);
      sun.distance = 1000;
      this.state.scene.add(sun);

      var frame = new THREE.SpotLightHelper(sun);
      this.state.scene.add(frame);

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
      controls.maxPolarAngle = Math.PI / 2 - .05;

      //initialize plane ***** 999, 999 because file size is 1000x1000
      var terrainGeometry = new THREE.PlaneBufferGeometry(WIDTH - 3200, WIDTH + 2100, 999, 999);
      terrainGeometry.castShadow = true;
      terrainGeometry.receiveShadow = true;
      this.state.terrainGeometry = terrainGeometry;
      var heightsArray = terrainGeometry.attributes.position.array;

      // apply height map to vertices of terrainGeometry
      for (let i = 0, j = 2; i < dataBin.length; i += 1, j += 3) {
        if (dataBin[i] == 0) {
          heightsArray[j] = dataBin[i]
        } else {
          heightsArray[j] = dataBin[i] / 65535 * 480 + 10
        }
      }

      var colorsArray = new Float32Array(heightsArray.length);

      this.state.colorsArray = colorsArray;
      this.state.heightsArray = heightsArray;

      terrainGeometry.setAttribute('position', new THREE.BufferAttribute(heightsArray, 3));
      terrainGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3))

      var terrainMaterial = new THREE.MeshLambertMaterial({
        vertexColors: THREE.VertexColors, side: THREE.DoubleSide
      })

      terrainMaterial.needsUpdate = true;

      var terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
      terrainMesh.rotation.x = - Math.PI / 2;
      this.state.terrainMesh = terrainMesh;

      this.drawTerrain(heightsArray, colorsArray, terrainGeometry);

      terrainGeometry.computeFaceNormals();
      terrainGeometry.computeVertexNormals();
      this.state.scene.add(terrainMesh);

      this.createBorders(dataJSON);


      function animate() {
        requestAnimationFrame(animate)
        renderer.render(self.state.scene, camera);
      }

      animate();

      function onWindowResize() {
        let containerWidth = container.getBoundingClientRect().right - container.getBoundingClientRect().left;
        renderer.setSize(containerWidth, containerWidth / 2 + 100);
      }
      window.addEventListener('resize', onWindowResize, false);
    }

  }

  drawTerrain(heightsArray, colorsArray, terrainGeometry) {


    if (this.state.waterLevel > 11.7) {
      this.state.waterLevel = 11.7
    }

    var adjustHeight = 11.7 - this.state.waterLevel;

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

    terrainGeometry.deleteAttribute('color');
    terrainGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3))

  }

  createPoliticalMap(dataJSON) {
    var width = 1280,
      height = 750,
      projection = d3.geoMercator()
        .center([13, 52]) //longitude, latitude
        .translate([width / 2, height / 2]) // center the image
        .scale([width / 1.5]);
    var path = d3.geoPath().projection(projection);
    var svg = d3.select("#Map").append("svg")
      .attr("width", '100%')
      .attr("height", '100%')
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("preserveAspectRatio", "xMinYMin");

    svg.selectAll(".country")
      .data(dataJSON)
      .enter()
      .append("path")
      .attr("class", ".country")
      .attr("d", path)
      .attr("fill", "#cccccc")
      .attr("stroke", "#333333")
      .attr("stroke-width", "0.5")

      .on("mouseover", function (d) {
        d3.select(this).attr("fill", "darkgrey").style("cursor", "pointer");
      })
      .on("click", this.countryOnClick.bind(this))
      .on("mouseout", function (d) {
        d3.select(this).attr("fill", "#cccccc")
      })

    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', zoomed);

    var g = svg.append('svg');

    svg.call(zoom);

    function zoomed() {
      svg
        .selectAll('path') // To prevent stroke width from scaling
        .attr('transform', d3.event.transform);
    }

  }

  countryOnClick(d) {

    var chosenCountry;
    this.state.countries.forEach(c => {
      if (c.name == d.properties.name_long) {
        chosenCountry = c;
      }

    })

    if (chosenCountry) {
      this.changeChosenCountry(chosenCountry);
      document.getElementById("buttonCountryClick").click();
    } else {
      document.getElementById("countryName").innerHTML = `<b>${d.properties.name_long}`
      document.getElementById("modal-body").innerHTML = 'Not available in the simulation!';
      document.getElementById("modalButton").click();
    }

  }

  changeChosenCountry(chosenCountry) {
    this.setState({
      chosenCountry: chosenCountry
    })
  }

  showBordersHandler(evt) {
    this.state.borders.visible = evt.target.checked
  }

  moveBordersHandler(evt, value) {
    this.state.borders.position.y = value * 25
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data != this.props.data) {
      this.setState({
        countries: this.props.data[this.props.data.length - 1][+Object.keys(this.props.data[0]) + this.props.data.length - 1]
      })
    }

    if (prevProps.currentWaterLevels != this.props.currentWaterLevels) {
      this.state.yearIndex = 0;
      this.play();
    }

  }

  play() {
    var self = this;

    var interval = setInterval(function () {
      if (self.state.yearIndex < self.props.currentWaterLevels.length) {
        if (self.props.paused) {
          clearInterval(interval)
        }
        else {
          self.state.waterLevel = self.props.currentWaterLevels[self.state.yearIndex];
          self.drawTerrain(self.state.heightsArray, self.state.colorsArray, self.state.terrainGeometry);
          self.state.yearIndex++;
        }


      }
      else {
        clearInterval(interval);
      }
    }, 1300)
  }

  getValuesChosenCountry(data) {
    var yearStopped = this.props.currentYearData == null ? +Object.keys(this.props.data) : +Object.keys(this.props.currentYearData)
    var countriesReceived = this.props.currentYearData == null ? this.props.data[yearStopped] : this.props.currentYearData[yearStopped]
    for (let i = 0; i < countriesReceived.length; i++) {
      if (countriesReceived[i].name == data.name) {
        countriesReceived[i] = data
      }
    }
    this.props.updateCurrentData(this.props.currentYearData == null ? this.props.data[0] : this.props.currentYearData)
  }

  render() {
    var container = document.getElementById("main_map");
    if (this.state.dataLoaded) {

      
      this.createTerrain(this.state.terrainData, this.state.bordersData, container);

    }

    return (

      <div>

        <Tab.Container id="list-group-tabs" defaultActiveKey="#terrainMap">
          <ListGroup horizontal >
            <ListGroup.Item action href="#terrainMap" style={{borderBottomLeftRadius: 0 + '%'}}>
              Terrain map
             </ListGroup.Item>
            <ListGroup.Item action href="#politicalMap" style={{borderBottomRightRadius: 0 + '%'}}>
              Political map
                                </ListGroup.Item>

          </ListGroup>
          <Tab.Content >
           
              <Tab.Pane id="mapPane" eventKey="#terrainMap" className="show">

                <div id="main_map" style={{ width: 100 + "%", height: 100 + "%" }}></div>
                {this.state.bordersLoaded ?
                  <div>
                    <Row className="m-1 text-left">
                      <Col md="3">
                        <Form.Check
                          type="switch"
                          id="borders_switch"
                          label="Show borders"
                          defaultChecked="true"
                          onChange={this.showBordersHandler.bind(this)}
                        />
                      </Col>
                      <Col md="1">

                      </Col>
                      <Col md="8">
                        <Slider
                          step={1}
                          min={0}
                          max={100}
                          onChange={this.moveBordersHandler.bind(this)}
                        />
                      </Col>
                    </Row>
                    {this.state.chosenCountry == null ? <div style={{ display: 'none' }}></div> : <Modal country={this.state.chosenCountry} updateChosenCountry={this.getValuesChosenCountry.bind(this)}
                      handler={this.changeChosenCountry} />}
                  </div> :
                  <>
                    <LinearProgress />
                    <LinearProgress />
                    <Skeleton  animation="wave" variant="rect" width='100%' height={900} />
                  </>
                }

              </Tab.Pane>
          
            <Tab.Pane eventKey="#politicalMap">
              <div id="Map" className="border" style={{ backgroundColor: "#7fcdff"}}></div>
            </Tab.Pane>

          </Tab.Content>
        </Tab.Container>

      </div >
    );


  }
}

export default Map;