// script.js

// Initialize Three.js for a dynamic hero background
let scene, camera, renderer, cube;

function initThreeJS() {
  const canvas = document.getElementById('heroCanvas');

  // Create scene and camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Create renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Create a simple rotating cube as a 3D background effect
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00aaff, wireframe: true });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    renderer.render(scene, camera);
  }
  animate();
}

// Initialize GSAP animations and scroll-triggered effects
function initGSAP() {
  // Hero text animation on page load
  gsap.from('.hero-overlay h1', { duration: 1, opacity: 0, y: -50, ease: "power2.out" });
  gsap.from('.hero-overlay .tagline', { duration: 1, opacity: 0, y: 20, delay: 0.5, ease: "power2.out" });
  gsap.from('.hero-overlay blockquote', { duration: 1, opacity: 0, y: 20, delay: 1, ease: "power2.out" });

  // Scroll-triggered animation for gallery items
  gsap.utils.toArray('.gallery-item').forEach(item => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out"
    });
  });
}

// Adjust Three.js renderer on window resize
window.addEventListener('resize', () => {
  if (renderer && camera) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
});

// On DOM content loaded, initialize Three.js and GSAP animations
document.addEventListener('DOMContentLoaded', () => {
  initThreeJS();
  initGSAP();
});
