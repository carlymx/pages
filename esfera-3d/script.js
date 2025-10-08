// Variables globales
let scene, camera, renderer, sphere;
let isMouseDown = false;
let previousMousePosition = { x: 0, y: 0 };
let earthTexture;

// Variables para controles táctiles
let isTouchDown = false;
let previousTouchPosition = { x: 0, y: 0 };
let initialPinchDistance = 0;
let initialCameraZ = 0;

// Inicializar la aplicación
function init() {
    // Crear escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0c29);
    
    // Crear cámara
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 7;
    camera.position.y = -0.45;
    camera.position.x = 0;
    
    // Crear renderizador
    renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    const canvasContainer = document.getElementById('canvas-container');
    canvasContainer.appendChild(renderer.domElement);
    
    // Crear luces
    createLights();
    
    // Cargar textura de la Tierra y luego crear la esfera
    loadEarthTexture();
    
    // Event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('wheel', onMouseWheel);
    
    // Event listeners para controles táctiles
    document.addEventListener('touchstart', onTouchStart, { passive: false });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
    
    // Iniciar animación
    animate();
}

// Crear sistema de iluminación mejorado
function createLights() {
    // Luz ambiental más brillante
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    // Luz direccional principal
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    // Luz puntual para efectos de brillo
    const pointLight = new THREE.PointLight(0x4ecdc4, 1.5, 50);
    pointLight.position.set(8, 8, 8);
    scene.add(pointLight);
    
    // Luz puntual adicional
    const pointLight2 = new THREE.PointLight(0xff6b6b, 1, 50);
    pointLight2.position.set(-8, -8, -8);
    scene.add(pointLight2);
    
    // Luz hemisférica para mejor iluminación
    const hemisphereLight = new THREE.HemisphereLight(0x4433ff, 0x00ff88, 0.4);
    scene.add(hemisphereLight);
}

// Cargar textura de la Tierra
function loadEarthTexture() {
    const textureLoader = new THREE.TextureLoader();
    
    // Usar una textura de la Tierra de alta calidad
    earthTexture = textureLoader.load(
        'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
        function() {
            // Textura cargada, crear la esfera
            createSphere();
        },
        undefined,
        function(error) {
            console.error('Error cargando la textura de la Tierra:', error);
            // Crear esfera sin textura como fallback
            createSphere();
        }
    );
}

// Crear esfera con textura de la Tierra
function createSphere() {
    // Geometría de la esfera más pequeña para ocupar el 50% del espacio vertical
    const geometry = new THREE.SphereGeometry(2, 128, 128);
    
    // Material con textura de la Tierra
    const material = new THREE.MeshStandardMaterial({
        map: earthTexture,
        roughness: 0.8,
        metalness: 0.2,
        emissive: 0x000000,
        emissiveIntensity: 0
    });
    
    // Crear malla de la esfera
    sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.position.set(0, 0, 0); // Centrar explícitamente
    scene.add(sphere);
    
    // Añadir atmósfera sutil
    const atmosphereGeometry = new THREE.SphereGeometry(2.05, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x87CEEB,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    sphere.add(atmosphere);
}

// Animación principal mejorada
function animate() {
    requestAnimationFrame(animate);
    
    // Rotación automática suave (solo si no hay interacción con el ratón o táctil)
    if (!isMouseDown && !isTouchDown) {
        sphere.rotation.y += 0.002;
    }
    
    // Renderizar escena
    renderer.render(scene, camera);
}

// Manejar redimensionado de ventana
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Manejar eventos del ratón
function onMouseDown(event) {
    isMouseDown = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

function onMouseUp() {
    isMouseDown = false;
}

function onMouseMove(event) {
    if (!isMouseDown) return;
    
    const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
    };
    
    // Rotación basada en el movimiento del ratón
    sphere.rotation.y += deltaMove.x * 0.01;
    sphere.rotation.x += deltaMove.y * 0.01;
    
    // Efecto de brillo basado en la velocidad del movimiento
    const speed = Math.sqrt(deltaMove.x * deltaMove.x + deltaMove.y * deltaMove.y);
    sphere.material.emissiveIntensity = 0.2 + (speed / 100) * 0.5;
    
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

// Zoom con la rueda del ratón
function onMouseWheel(event) {
    event.preventDefault();
    camera.position.z += event.deltaY * 0.01;
    camera.position.z = Math.max(3, Math.min(20, camera.position.z));
}

// Funciones para controles táctiles
function onTouchStart(event) {
    event.preventDefault();
    
    if (event.touches.length === 1) {
        // Un dedo - rotación
        isTouchDown = true;
        previousTouchPosition = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        };
    } else if (event.touches.length === 2) {
        // Dos dedos - zoom (pinch)
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        initialPinchDistance = Math.sqrt(
            Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        initialCameraZ = camera.position.z;
    }
}

function onTouchMove(event) {
    event.preventDefault();
    
    if (event.touches.length === 1 && isTouchDown) {
        // Rotación con un dedo
        const currentTouch = event.touches[0];
        const deltaMove = {
            x: currentTouch.clientX - previousTouchPosition.x,
            y: currentTouch.clientY - previousTouchPosition.y
        };
        
        // Rotación más suave para pantallas táctiles
        sphere.rotation.y += deltaMove.x * 0.008;
        sphere.rotation.x += deltaMove.y * 0.008;
        
        // Efecto de brillo basado en la velocidad del movimiento
        const speed = Math.sqrt(deltaMove.x * deltaMove.x + deltaMove.y * deltaMove.y);
        sphere.material.emissiveIntensity = 0.2 + (speed / 100) * 0.5;
        
        previousTouchPosition = {
            x: currentTouch.clientX,
            y: currentTouch.clientY
        };
    } else if (event.touches.length === 2) {
        // Zoom con dos dedos (pinch)
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const currentPinchDistance = Math.sqrt(
            Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        
        if (initialPinchDistance > 0) {
            const pinchRatio = initialPinchDistance / currentPinchDistance;
            camera.position.z = initialCameraZ * pinchRatio;
            camera.position.z = Math.max(3, Math.min(20, camera.position.z));
        }
    }
}

function onTouchEnd(event) {
    isTouchDown = false;
    initialPinchDistance = 0;
}

// Actualizar título y descripción cuando se cargue
function updateText() {
    const title = document.querySelector('h1');
    const description = document.querySelector('p');
    if (title) title.textContent = 'Planeta Tierra 3D';
    
    // Detectar si es dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (description) {
        if (isMobile) {
            description.textContent = 'Desliza para rotar • Pellizca para hacer zoom';
        } else {
            description.textContent = 'Mueve el ratón para explorar el planeta';
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    updateText();
    init();
});

// Manejar errores
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación 3D:', e.error);
});

// Log de inicialización
console.log('Aplicación 3D inicializada correctamente');