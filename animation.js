class Animation {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        this.init();
        this.createObject();
        this.addEventListeners();
        this.animate();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.z = 5;
    }

    createObject() {
        // Création d'une forme abstraite complexe
        const geometry = new THREE.IcosahedronGeometry(2, 1);
        const material = new THREE.MeshPhongMaterial({
            color: 0xE2EDFD,
            specular: 0xDB9EE9,
            shininess: 100,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });

        this.object = new THREE.Mesh(geometry, material);
        this.scene.add(this.object);

        // Ajout de lumières
        const light1 = new THREE.DirectionalLight(0xffffff, 1);
        light1.position.set(1, 1, 1);
        this.scene.add(light1);

        const light2 = new THREE.AmbientLight(0x404040);
        this.scene.add(light2);
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        document.addEventListener('mousemove', (event) => {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

            this.object.rotation.x += mouseY * 0.01;
            this.object.rotation.y += mouseX * 0.01;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.object.rotation.x += 0.001;
        this.object.rotation.y += 0.002;

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialisation de l'animation
new Animation();
