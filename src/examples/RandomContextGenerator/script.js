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
const roadwidth_slider = document.getElementById( 'Road Width' )
roadwidth_slider.addEventListener( 'mouseup', onSliderChange, false )
roadwidth_slider.addEventListener( 'touchend', onSliderChange, false )
const siteradius_slider = document.getElementById( 'Site Radius' )
siteradius_slider.addEventListener( 'mouseup', onSliderChange, false )
siteradius_slider.addEventListener( 'touchend', onSliderChange, false )
const minfloorheight_slider = document.getElementById( 'Min Floor Height' )
minfloorheight_slider.addEventListener( 'mouseup', onSliderChange, false )
minfloorheight_slider.addEventListener( 'touchend', onSliderChange, false )
const maxfloorheight_slider = document.getElementById( 'Site Radius' )
maxfloorheight_slider.addEventListener( 'mouseup', onSliderChange, false )
maxfloorheight_slider.addEventListener( 'touchend', onSliderChange, false )
const areaofplot_slider = document.getElementById( 'Area of Plot' )
areaofplot_slider.addEventListener( 'mouseup', onSliderChange, false )
areaofplot_slider.addEventListener( 'touchend', onSliderChange, false )
const areaofblock_slider = document.getElementById( 'Area of Block' )
areaofblock_slider.addEventListener( 'mouseup', onSliderChange, false )
areaofblock_slider.addEventListener( 'touchend', onSliderChange, false )


const d_checkbox = document.querySelector('input[id="3d"]');
d_checkbox.addEventListener( 'change', onSliderChange, false )
const roadpolyline_checkbox = document.querySelector('input[id="Road Polyline"]');
roadpolyline_checkbox.addEventListener( 'change', onSliderChange, false )
const displaytrees_checkbox = document.querySelector('input[id="Display Trees"]');
displaytrees_checkbox.addEventListener( 'change', onSliderChange, false )
const carveoutsite_checkbox = document.querySelector('input[id="Carve Out Site"]');
carveoutsite_checkbox.addEventListener( 'change', onSliderChange, false )
const displaydesign_checkbox = document.querySelector('input[id="Display Design"]');
displaydesign_checkbox.addEventListener( 'change', onSliderChange, false )

let points = []
let sitepoint = []

let rhino, doc

rhino3dm().then(async m => {
  console.log('Loaded rhino3dm.')
  rhino = m // global

  init()
  rndPts()
  sitePoint()
  compute()
})

function sitePoint() {
  // generate random points
  const xf = 4
  const yf = -12
  const zf = 0
  const ptf = "{\"X\":" + xf + ",\"Y\":" + yf + ",\"Z\":" + zf + "}"
  console.log( `x ${xf} y ${yf}` )
  points.push(ptf)
  const icoGeo = new THREE.IcosahedronGeometry(25)
  const icoMat = new THREE.MeshNormalMaterial()
  const ico = new THREE.Mesh( icoGeo, icoMat )
  ico.name = 'icof'
  ico.position.set( xf, yf, zf)
  scene.add( icof )
  let tcontrolsf = new TransformControls( camera, renderer.domElement )
  tcontrolsf.enabled = true
  tcontrolsf.attach( icof )
  tcontrolsf.showZ = false
  tcontrolsf.addEventListener( 'dragging-changed', onChange )
  scene.add(tcontrolsf)
}


function rndPts() {
  // generate random points
  const x = 18
  const y = 0
  const z = 0
  const pt = "{\"X\":" + x + ",\"Y\":" + y + ",\"Z\":" + z + "}"
  console.log( `x ${x} y ${y}` )
  points.push(pt)
  const icoGeo = new THREE.IcosahedronGeometry(25)
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
  const xa = 18
  const ya = -18
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
  const xb = -12
  const yb = -14
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
  const xc = -11
  const yc = 4
  const zc = 0
  const ptc = "{\"X\":" + xc + ",\"Y\":" + yc + ",\"Z\":" + zc + "}"
  console.log( `x ${xc} y ${yc}` )
  points.push(ptc)
  const icoc = new THREE.Mesh( icoGeo, icoMat )
  icoc.name = 'icoc'
  icob.position.set( xc, yc, zc)
  scene.add( icoc )
  let tcontrolsc = new TransformControls( camera, renderer.domElement )
  tcontrolsc.enabled = true
  tcontrolsc.attach( icoc )
  tcontrolsc.showZ = false
  tcontrolsc.addEventListener( 'dragging-changed', onChange )
  scene.add(tcontrolsc)
  //--------------
  const xd = -4
  const yd = 8
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
  if ( !dragging ) {
    // update points position
    points = []
    scene.traverse(child => {
      if ( child.name === 'ico' ) {
        const pt = "{\"X\":" + child.position.x + ",\"Y\":" + child.position.y + ",\"Z\":" + child.position.z + "}"
        points.push( pt )
        console.log(pt)
      }
    }, false)
  }
}

    if ( !dragging ) {
      // update points position
      points = []
      scene.traverse(child => {
        if ( child.name === 'icoa' ) {
          const pt = "{\"X\":" + child.position.xa + ",\"Y\":" + child.position.ya + ",\"Z\":" + child.position.za + "}"
          points.push( pta )
          console.log(pta)
        }
      }, false)
    }

    if ( !dragging ) {
        // update points position
        points = []
        scene.traverse(child => {
          if ( child.name === 'icob' ) {
            const pt = "{\"X\":" + child.position.xb + ",\"Y\":" + child.position.yb + ",\"Z\":" + child.position.zb + "}"
            points.push( ptb )
            console.log(ptb)
          }
        }, false)
    
    if ( !dragging ) {
          // update points position
          points = []
          scene.traverse(child => {
            if ( child.name === 'icoc' ) {
              const pt = "{\"X\":" + child.position.xc + ",\"Y\":" + child.position.yc + ",\"Z\":" + child.position.zc + "}"
              points.push( ptc )
              console.log(ptc)
            }
          }, false)

    if ( !dragging ) {
            // update points position
            points = []
            scene.traverse(child => {
              if ( child.name === 'icod' ) {
                const pt = "{\"X\":" + child.position.xd + ",\"Y\":" + child.position.yd + ",\"Z\":" + child.position.zd + "}"
                points.push( ptd )
                console.log(ptd)
              }
            }, false)

    if ( !dragging ) {
              // update points position
              points = []
              scene.traverse(child => {
                if ( child.name === 'icof' ) {
                  const pt = "{\"X\":" + child.position.xf + ",\"Y\":" + child.position.yf + ",\"Z\":" + child.position.zf + "}"
                  points.push( ptf )
                  console.log(ptf)
                }
              }, false)
  

    compute()
    controls.enabled = true
    return 
     }
     }
     }

}

  controls.enabled = false


/**
 * Call appserver
 */
async function compute () {

  showSpinner(true)

  // initialise 'data' object that will be used by compute()
  const data = {
    definition: definition,
    inputs: {
      'Road Width': roadwidth_slider.valueAsNumber,
      'Site Radius': siteradius_slider.valueAsNumber,
      'Min Floor Height': minfloorheight_slider.valueAsNumber,
      'Max Floor Height': maxfloorheight_slider.valueAsNumber,
      'Area of Block': areaofblock_slider.valueAsNumber,
      'Area of Plot': areaofblock_slider.valueAsNumber,

      '3d': d_checkbox.checked,
      'Road Polyline': roadpolyline_checkbox.checked,
      'Display Trees': displaytrees_checkbox.checked,
      'Carve Out Site': carveoutsite_checkbox.checked,
      'Display Design': displaydesign_checkbox.checked,

      'points': points,
      'sitepoint': sitepoint
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

var scene, camera, renderer, controls

function init() 
{
  // Rhino models are z-up, so set this as the default
  THREE.Object3D.DefaultUp = new THREE.Vector3( 0, 0, 1 );

  scene = new THREE.Scene()
  scene.background = new THREE.Color(1,1,1)
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 10000 )
  camera.position.x = 1000
  camera.position.y = 1000
  camera.position.z = 1000

  renderer = new THREE.WebGLRenderer({antialias: true})
  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth, window.innerHeight )
  document.body.appendChild(renderer.domElement)

  controls = new OrbitControls( camera, renderer.domElement  )

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