/* eslint no-undef: "off", no-unused-vars: "off" */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.126.0/build/three.module.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/controls/OrbitControls.js'
import { TransformControls } from 'https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/controls/TransformControls.js'
import { Rhino3dmLoader } from 'https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/loaders/3DMLoader.js'
import rhino3dm from 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/rhino3dm.module.js'

// set up loader for converting the results to threejs
const loader = new Rhino3dmLoader()
loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/' )

const definition = 'RandomContextGenerator.gh'

// setup input change events
const roadwidth_slider = document.getElementById( 'RH_IN:RoadWidth' )
roadwidth_slider.addEventListener( 'mouseup', onSliderChange, false )
roadwidth_slider.addEventListener( 'touchend', onSliderChange, false )
const siteradius_slider = document.getElementById( 'RH_IN:SiteRadius' )
siteradius_slider.addEventListener( 'mouseup', onSliderChange, false )
siteradius_slider.addEventListener( 'touchend', onSliderChange, false )
const minfloorheight_slider = document.getElementById( 'RH_IN:MinFloorHeight' )
minfloorheight_slider.addEventListener( 'mouseup', onSliderChange, false )
minfloorheight_slider.addEventListener( 'touchend', onSliderChange, false )
const maxfloorheight_slider = document.getElementById( 'RH_IN:MaxFloorHeight' )
maxfloorheight_slider.addEventListener( 'mouseup', onSliderChange, false )
maxfloorheight_slider.addEventListener( 'touchend', onSliderChange, false )
const areaofplot_slider = document.getElementById( 'RH_IN:AreaofPlot' )
areaofplot_slider.addEventListener( 'mouseup', onSliderChange, false )
areaofplot_slider.addEventListener( 'touchend', onSliderChange, false )
const areaofblock_slider = document.getElementById( 'RH_IN:AreaofBlock' )
areaofblock_slider.addEventListener( 'mouseup', onSliderChange, false )
areaofblock_slider.addEventListener( 'touchend', onSliderChange, false )


const areadisplay_checkbox = document.querySelector('input[id="RH_IN:AreaDisplay"]');
areadisplay_checkbox.addEventListener( 'change', onSliderChange, false )
const roadpolyline_checkbox = document.querySelector('input[id="RH_IN:DisplayRoadPolyline"]');
roadpolyline_checkbox.addEventListener( 'change', onSliderChange, false )
const displaytrees_checkbox = document.querySelector('input[id="RH_IN:DisplayTrees"]');
displaytrees_checkbox.addEventListener( 'change', onSliderChange, false )
const carveoutsite_checkbox = document.querySelector('input[id="RH_IN:CarveOutSite"]');
carveoutsite_checkbox.addEventListener( 'change', onSliderChange, false )
const displaydesign_checkbox = document.querySelector('input[id="RH_IN:DisplayYourDesign"]');
displaydesign_checkbox.addEventListener( 'change', onSliderChange, false )

let points = []
let sitePoint = []
let roadPoint = []

let rhino, doc

rhino3dm().then(async m => {
  console.log('Loaded rhino3dm.')
  rhino = m // global

  init()
  rndPts()
  sitepoint()
  roadpoint()
  compute()
})

const downloadButton = document.getElementById("downloadButton")
downloadButton.onclick = download

function download () {
  // write rhino doc to "blob"
  const bytes = doc.toByteArray()
  const blob = new Blob([bytes], {type: "application/octect-stream"})

  // use "hidden link" trick to get the browser to download the blob
  const filename = 'a' + '.3dm'
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

function sitepoint() 
{
  // generate random points
  const xf = 30
  const yf = 22
  const zf = 0
  const ptf = "{\"X\":" + xf + ",\"Y\":" + yf + ",\"Z\":" + zf + "}"
  console.log( `x ${xf} y ${yf}` )
  sitePoint.push(ptf)
  const icoGeo = new THREE.IcosahedronGeometry(1)
  const icoMat = new THREE.MeshNormalMaterial()
  const icof = new THREE.Mesh( icoGeo, icoMat )
  icof.name = 'icof'
  icof.position.set( xf, yf, zf)
  scene.add( icof )
  let tcontrolsf = new TransformControls( camera, renderer.domElement )
  tcontrolsf.enabled = true
  tcontrolsf.attach( icof )
  tcontrolsf.showZ = false
  tcontrolsf.addEventListener( 'dragging-changed', onChange )
  scene.add(tcontrolsf)
}

function roadpoint() 
{
  // generate random points
  const xg = 6
  const yg = 28
  const zg = 0
  const ptg = "{\"X\":" + xg + ",\"Y\":" + yg + ",\"Z\":" + zg + "}"
  console.log( `x ${xg} y ${yg}` )
  roadPoint.push(ptg)
  const icoGeo = new THREE.IcosahedronGeometry(1)
  const icoMat = new THREE.MeshNormalMaterial()
  const icog = new THREE.Mesh( icoGeo, icoMat )
  icog.name = 'icog'
  icog.position.set( xg, yg, zg)
  scene.add( icog )
  let tcontrolsg = new TransformControls( camera, renderer.domElement )
  tcontrolsg.enabled = true
  tcontrolsg.attach( icog )
  tcontrolsg.showZ = false
  tcontrolsg.addEventListener( 'dragging-changed', onChange )
  scene.add(tcontrolsg)
  //---------

  const xh = 47
  const yh = 11
  const zh = 0
  const pth = "{\"X\":" + xh + ",\"Y\":" + yh + ",\"Z\":" + zh + "}"
  console.log( `x ${xh} y ${yh}` )
  roadPoint.push(pth)
  const icoh = new THREE.Mesh( icoGeo, icoMat )
  icoh.name = 'icoh'
  icoh.position.set( xh, yh, zh)
  scene.add( icoh )
  let tcontrolsh = new TransformControls( camera, renderer.domElement )
  tcontrolsh.enabled = true
  tcontrolsh.attach( icoh )
  tcontrolsh.showZ = false
  tcontrolsh.addEventListener( 'dragging-changed', onChange )
  scene.add(tcontrolsh)
}

function rndPts() {
  // generate random points
  const x = 42
  const y = 23
  const z = 0
  const pt = "{\"X\":" + x + ",\"Y\":" + y + ",\"Z\":" + z + "}"
  console.log( `x ${x} y ${y}` )
  points.push(pt)
  const icoGeo = new THREE.IcosahedronGeometry(1)
  const icoMat = new THREE.MeshNormalMaterial()
  const ico = new THREE.Mesh( icoGeo, icoMat )
  ico.name = 'ico'
  ico.position.set( x, y, z)
  scene.add( ico )
  let tcontrols = new TransformControls( camera, renderer.domElement )
  tcontrols.enabled = true
  tcontrols.attach( ico )
  tcontrols.showZ = false
  tcontrols.addEventListener( 'dragging-changed', onChange )
  scene.add(tcontrols)
  //--------------------
  const xa = 42
  const ya = 8
  const za = 0
  const pta = "{\"X\":" + xa + ",\"Y\":" + ya + ",\"Z\":" + za + "}"
  console.log( `x ${xa} y ${ya}` )
  points.push(pta)
  const icoa = new THREE.Mesh( icoGeo, icoMat )
  icoa.name = 'icoa'
  icoa.position.set( xa, ya, za)
  scene.add( icoa )
  let tcontrolsa = new TransformControls( camera, renderer.domElement )
  tcontrolsa.enabled = true
  tcontrolsa.attach( icoa )
  tcontrolsa.showZ = false
  tcontrolsa.addEventListener( 'dragging-changed', onChange )
  scene.add(tcontrolsa)
  //--------------
  const xb = 16
  const yb = 8
  const zb = 0
  const ptb = "{\"X\":" + xb + ",\"Y\":" + yb + ",\"Z\":" + zb + "}"
  console.log( `x ${xb} y ${yb}` )
  points.push(ptb)
  const icob = new THREE.Mesh( icoGeo, icoMat )
  icob.name = 'icob'
  icob.position.set( xb, yb, zb)
  scene.add( icob )
  let tcontrolsb = new TransformControls( camera, renderer.domElement )
  tcontrolsb.enabled = true
  tcontrolsb.attach( icob )
  tcontrolsb.showZ = false
  tcontrolsb.addEventListener( 'dragging-changed', onChange )
  scene.add(tcontrolsb)
  //--------------
  const xc = 9
  const yc = 20
  const zc = 0
  const ptc = "{\"X\":" + xc + ",\"Y\":" + yc + ",\"Z\":" + zc + "}"
  console.log( `x ${xc} y ${yc}` )
  points.push(ptc)
  const icoc = new THREE.Mesh( icoGeo, icoMat )
  icoc.name = 'icoc'
  icoc.position.set( xc, yc, zc)
  scene.add( icoc )
  let tcontrolsc = new TransformControls( camera, renderer.domElement )
  tcontrolsc.enabled = true
  tcontrolsc.attach( icoc )
  tcontrolsc.showZ = false
  tcontrolsc.addEventListener( 'dragging-changed', onChange )
  scene.add(tcontrolsc)
  //--------------
  const xd = 22
  const yd = 38
  const zd = 0
  const ptd = "{\"X\":" + xd + ",\"Y\":" + yd + ",\"Z\":" + zd + "}"
  console.log( `x ${xd} y ${yd}` )
  points.push(ptd)
  const icod = new THREE.Mesh( icoGeo, icoMat )
  icod.name = 'icod'
  icod.position.set( xd, yd, zd)
  scene.add( icod )
  let tcontrolsd = new TransformControls( camera, renderer.domElement )
  tcontrolsd.enabled = true
  tcontrolsd.attach( icod )
  tcontrolsd.showZ = false
  tcontrolsd.addEventListener( 'dragging-changed', onChange )
  scene.add(tcontrolsd)
}


let dragging = false
function onChange() {
  dragging = ! dragging
  if (!dragging) {
    // update points position
    points = []
    sitepoint = []
    scene.traverse(child => {
      if ( child.name === 'ico' ) {
        const pt = "{\"X\":" + child.position.x + ",\"Y\":" + child.position.y + ",\"Z\":" + child.position.z + "}"
        points.push( pt )
        console.log('ico - ' + pt)
      }
      if (child.name === 'icoa') {
        const pta = "{\"X\":" + child.position.x + ",\"Y\":" + child.position.y + ",\"Z\":" + child.position.z + "}"
        points.push(pta)
        console.log('icoa - ' + pta)
      }
      if (child.name === 'icob') {
        const ptb = "{\"X\":" + child.position.x + ",\"Y\":" + child.position.y + ",\"Z\":" + child.position.z + "}"
        points.push(ptb)
        console.log('icob - ' + ptb)
      }
      if (child.name === 'icoc') {
        const ptc = "{\"X\":" + child.position.x + ",\"Y\":" + child.position.y + ",\"Z\":" + child.position.z + "}"
        points.push(ptc)
        console.log('icoc - ' + ptc)
      }
      if (child.name === 'icod') {
        const ptd = "{\"X\":" + child.position.x + ",\"Y\":" + child.position.y + ",\"Z\":" + child.position.z + "}"
        points.push(ptd)
        console.log('icod - ' + ptd)
      }
      if (child.name === 'icof') {
        const ptf = "{\"X\":" + child.position.x + ",\"Y\":" + child.position.y + ",\"Z\":" + child.position.z + "}"
        sitePoint.push(ptf)
        console.log('site - ' + ptf)
      }
      if (child.name === 'icog') {
        const ptg = "{\"X\":" + child.position.x + ",\"Y\":" + child.position.y + ",\"Z\":" + child.position.z + "}"
        roadPoint.push(ptg)
        console.log('site - ' + ptg)
      }
      if (child.name === 'icoh') {
        const pth = "{\"X\":" + child.position.x + ",\"Y\":" + child.position.y + ",\"Z\":" + child.position.z + "}"
        roadPoint.push(pth)
        console.log('site - ' + pth)
      }
    }, false)

    compute()
    controls.enabled = true
    return
  }
  controls.enabled = false
}
  
/**
 * Call appserver
 */
async function compute () {

  showSpinner(true)

  // initialise 'data' object that will be used by compute()
  const data = {
    definition: definition,
    inputs: {
      'RH_IN:RoadWidth': roadwidth_slider.valueAsNumber,
      'RH_IN:SiteRadius': siteradius_slider.valueAsNumber,
      'RH_IN:MinFloorHeight': minfloorheight_slider.valueAsNumber,
      'RH_IN:MaxFloorHeight': maxfloorheight_slider.valueAsNumber,
      'RH_IN:AreaofBlock': areaofblock_slider.valueAsNumber,
      'RH_IN:AreaofPlot': areaofplot_slider.valueAsNumber,

      'RH_IN:AreaDisplay': areadisplay_checkbox.checked,
      'RH_IN:DisplayRoadPolyline': roadpolyline_checkbox.checked,
      'RH_IN:DisplayTrees': displaytrees_checkbox.checked,
      'RH_IN:CarveOutSite': carveoutsite_checkbox.checked,
      'RH_IN:DisplayYourDesign': displaydesign_checkbox.checked,

      'points': points,
      'sitepoint': sitePoint,
      'roadpoint': roadPoint,
    }
  }

  console.log(data.inputs)

  const request = {
    'method':'POST',
    'body': JSON.stringify(data),
    'headers': {'Content-Type': 'application/json'}
  }

  try {
    const response = await fetch('/solve', request)

    if(!response.ok)
      throw new Error(response.statusText)

    const responseJson = await response.json()
    collectResults(responseJson)

  } catch(error){
    console.error(error)
  }
}

/**
 * Parse response
 */
 function collectResults(responseJson) {

  const values = responseJson.values

  console.log(values)

  // clear doc
  try {
    if( doc !== undefined)
        doc.delete()
  } catch {}

  //console.log(values)
  doc = new rhino.File3dm()

  // for each output (RH_OUT:*)...
  for ( let i = 0; i < values.length; i ++ ) {
    // ...iterate through data tree structure...
    for (const path in values[i].InnerTree) {
      const branch = values[i].InnerTree[path]
      // ...and for each branch...
      for( let j = 0; j < branch.length; j ++) {
        // ...load rhino geometry into doc
        const rhinoObject = decodeItem(branch[j])
        if (rhinoObject !== null) {
          // console.log(rhinoObject)
          doc.objects().add(rhinoObject, null)
        }
      }
    }
  }

  if (doc.objects().count < 1) {
    console.error('No rhino objects to load!')
    showSpinner(false)
    return
  }

  // load rhino doc into three.js scene
  const buffer = new Uint8Array(doc.toByteArray()).buffer
  loader.parse( buffer, function ( object ) 
  {

  
      // clear objects from scene
      scene.traverse(child => {
        if ( child.userData.hasOwnProperty( 'objectType' ) && child.userData.objectType === 'File3dm') {
          scene.remove( child )
        }
      })

      ///////////////////////////////////////////////////////////////////////
      
      // color crvs
      object.traverse(child => {
        if (child.isLine) {
          if (child.userData.attributes.geometry.userStringCount > 0) {
            //console.log(child.userData.attributes.geometry.userStrings[0][1])
            const col = child.userData.attributes.geometry.userStrings[0][1]
            const threeColor = new THREE.Color( "rgb(" + col + ")")
            const mat = new THREE.LineBasicMaterial({color:threeColor})
            child.material = mat
          }
        }
      })

      ///////////////////////////////////////////////////////////////////////
      // add object graph from rhino model to three.js scene
      scene.add( object )

      // hide spinner and enable download button
      showSpinner(false)
      //downloadButton.disabled = false

  })
}

/**
* Attempt to decode data tree item to rhino geometry
*/
function decodeItem(item) {
const data = JSON.parse(item.data)
if (item.type === 'System.String') {
  // hack for draco meshes
  try {
      return rhino.DracoCompression.decompressBase64String(data)
  } catch {} // ignore errors (maybe the string was just a string...)
} else if (typeof data === 'object') {
  return rhino.CommonObject.decode(data)
}
return null
}

/**
 * Called when a slider value changes in the UI. Collect all of the
 * slider values and call compute to solve for a new scene
 */
function onSliderChange () {
  // show spinner

  showSpinner(true)
  compute()
}

/**
 * Shows or hides the loading spinner
 */
 function showSpinner(enable) {
  if (enable)
    document.getElementById('loader').style.display = 'block'
  else
    document.getElementById('loader').style.display = 'none'
}

// BOILERPLATE //

var scene, camera, renderer, controls, controlss

function init() 
{
  // Rhino models are z-up, so set this as the default
  THREE.Object3D.DefaultUp = new THREE.Vector3( 0, 0, 1 );

  scene = new THREE.Scene()
  scene.background = new THREE.Color("rgb(0, 0, 0)")
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 10000 )
  camera.position.x = 100
  camera.position.y = 100
  camera.position.z = 50

  renderer = new THREE.WebGLRenderer({antialias: true})
  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth, window.innerHeight )
  document.body.appendChild(renderer.domElement)

  controls = new OrbitControls( camera, renderer.domElement  )
  controls.target.set(30, 39, -5);

  // add a directional light
  const directionalLight = new THREE.DirectionalLight( 0xffffff )
  directionalLight.intensity = 2
  scene.add( directionalLight )
 
  const ambientLight = new THREE.AmbientLight()
  scene.add( ambientLight )

  window.addEventListener( 'resize', onWindowResize, false )

  animate()
}

var animate = function () {
  requestAnimationFrame( animate )
  renderer.render( scene, camera )
}
  
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize( window.innerWidth, window.innerHeight )
  animate()
}

/**
 * Helper function that behaves like rhino's "zoom to selection", but for three.js!
 */
 function zoomCameraToSelection( camera, controls, selection, fitOffset = 1.2 ) {
  
  const box = new THREE.Box3();
  
  for( const object of selection ) {
    if (object.isLight) continue
    box.expandByObject( object );
  }
  
  const size = box.getSize( new THREE.Vector3() );
  const center = box.getCenter( new THREE.Vector3() );
  
  const maxSize = Math.max( size.x, size.y, size.z );
  const fitHeightDistance = maxSize / ( 2 * Math.atan( Math.PI * camera.fov / 360 ) );
  const fitWidthDistance = fitHeightDistance / camera.aspect;
  const distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance );
  
  const direction = controls.target.clone()
    .sub( camera.position )
    .normalize()
    .multiplyScalar( distance );
  controls.maxDistance = distance * 10;
  controls.target.copy( center );
  
  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();
  camera.position.copy( controls.target ).sub(direction);
  
  controls.update();
}