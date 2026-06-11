var scene;
var camera;
var renderer;
var modeloEstatua; 
function init()
{
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
    camera.position.x=0;
    camera.position.y=8;
    camera.position.z=15;
    camera.lookAt(0, 0, 0);
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    // Luces (Opción 2: Iluminación uniforme estilo luz de día)
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
    directionalLight.position.set(0, 30, 5);
    scene.add(directionalLight);
    // Piso
    var textura = new THREE.TextureLoader().load("PISO.png");
    textura.colorSpace = THREE.SRGBColorSpace; 
    textura.wrapS = THREE.RepeatWrapping;
    textura.wrapT = THREE.RepeatWrapping;
    textura.repeat.set(2, 2);
    var piso = new THREE.Mesh(
        new THREE.PlaneGeometry(16, 20),
        new THREE.MeshStandardMaterial({ map: textura, side: THREE.DoubleSide })
    );
    piso.rotation.x = -Math.PI / 2;
    piso.position.y = -1;
    scene.add(piso);
    // Estatua
    var loader = new THREE.GLTFLoader();
    loader.load(
        "modelos3d/estatua.glb",
        function(gltf)
        {
            modeloEstatua = gltf.scene;
            modeloEstatua.position.set(-9,1, 0);
            modeloEstatua.scale.set(2, 2, 2);
            // CORRECCIÓN: Quitamos el signo menos para que rote hacia el lado contrario (positivo)
            modeloEstatua.rotation.y = Math.PI / 2; 
            scene.add(modeloEstatua);
        },
        undefined,
        function(error) { console.log(error); }
    );
}

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
init();
animate();