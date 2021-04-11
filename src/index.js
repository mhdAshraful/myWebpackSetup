//  ANCHOR Imports
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
import './style.scss';

// ANCHOR Base Canvas
const canvas = document.getElementById('canvas')

// ANCHOR Scene
const scene = new THREE.Scene()

// ANCHOR Renderer
const width = window.innerWidth
const height = window.innerHeight
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas
})
renderer.setSize(width, height)
renderer.setClearColor(0xfef23a, 1)
// NOTE add encoding to both input texture and render output for best texture lighting 
// bakedTexture.encoding = THREE.sRGBEncoding
// renderer.outputEncoding = THREE.sRGBEncoding

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// ANCHOR Camera
const camera = new THREE.PerspectiveCamera(
    70,
    width / height,
    0.1,
    1000
)
// NOTE fov calculation in redme.md we dont need fov calc in every project
// if we cal fov here, we must doit again in resize() finction
const z = 5
camera.position.z = z
camera.position.set(0, 3, z)
camera.fov = 2 * Math.atan((height / 2) / z) * (180 / Math.PI)
camera.lookAt(scene)
scene.add(camera)

// ANCHOR Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// ANCHOR animation variables
// NOTE Declareing global variables here
const clock = new THREE.Clock()
let time = 0


// ANCHOR GEOMETRY
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xffab12 })
)
scene.add(cube)






// TODO add objects through functions and call them here
// ANCHOR function     const example = () =>{     } Calls



// ANCHOR func Render
const render = () => {
    controls.update()

    // TODO we will manipulate this section for animation
    let elapsedTime = clock.getElapsedTime()
    time += 0.05

    // this.material.uniforms.time.valur = this.time
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
render();


// ANCHOR func resize function and Event
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = (window.innerWidth / window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // NOTE we Must clculate camera fov in both places
    z = camera.position.z
    camera.fov = 2 * Math.atan((window.innerHeight / 2) / z) * (180 / Math.PI)
    camera.updateProjectionMatrix()


})
