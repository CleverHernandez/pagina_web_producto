const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 0.5, 390);
document.getElementById('viewer').appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(2, 2, 2);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const video = document.createElement('video');
video.src = './video/Producto.mp4'; 
video.loop = true;
video.muted = true;  
video.load();
video.playbackRate = 0.5;  

video.addEventListener('loadeddata', () => {
    console.log("Video cargado correctamente");
    video.play();
});

const texture = new THREE.VideoTexture(video);
texture.needsUpdate = true; 
const material = new THREE.MeshBasicMaterial({ map: texture });

const geometry = new THREE.PlaneGeometry(42, 22);
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

plane.position.z = -5;

camera.position.set(0, 0, 10);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
