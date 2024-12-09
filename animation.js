class Animation {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.clock = new THREE.Clock();
        
        this.init();
        this.createObject();
        this.addEventListeners();
        this.animate();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.z = 20;
    }

    createObject() {
        // Création d'une forme complexe avec plusieurs composants
        this.group = new THREE.Group();

        // Tore principal
        const torusGeometry = new THREE.TorusKnotGeometry(8, 2, 256, 32, 2, 3);
        const torusMaterial = new THREE.MeshPhongMaterial({
            color: 0xE2EDFD,
            specular: 0xDB9EE9,
            shininess: 100,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });
        this.mainTorus = new THREE.Mesh(torusGeometry, torusMaterial);
        this.group.add(this.mainTorus);

        // Particules environnantes
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

            colors[i * 3] = Math.random();
            colors[i * 3 + 1] = Math.random();
            colors[i * 3 + 2] = Math.random();
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.group.add(this.particles);

        // Sphères orbitales
        this.orbitals = [];
        for(let i = 0; i < 3; i++) {
            const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
            const sphereMaterial = new THREE.MeshPhongMaterial({
                color: new THREE.Color().setHSL(i * 0.3, 1, 0.5),
                specular: 0xffffff,
                shininess: 100
            });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.userData.offset = i * Math.PI * 2 / 3;
            this.orbitals.push(sphere);
            this.group.add(sphere);
        }

        this.scene.add(this.group);

        // Éclairage
        const light1 = new THREE.DirectionalLight(0xffffff, 1);
        light1.position.set(1, 1, 1);
        this.scene.add(light1);

        const light2 = new THREE.PointLight(0xE2EDFD, 2, 50);
        light2.position.set(-10, 10, 10);
        this.scene.add(light2);

        const light3 = new THREE.PointLight(0xDB9EE9, 2, 50);
        light3.position.set(10, -10, -10);
        this.scene.add(light3);

        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        let mouseX = 0, mouseY = 0;
        let targetRotationX = 0, targetRotationY = 0;
        
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            
            targetRotationX = mouseY * 0.5;
            targetRotationY = mouseX * 0.5;
        });

        document.addEventListener('scroll', () => {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            this.camera.position.z = 20 + scrollPercent * 10;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const elapsedTime = this.clock.getElapsedTime();

        // Animation du tore principal
        this.mainTorus.rotation.x += 0.001;
        this.mainTorus.rotation.y += 0.002;
        
        // Animation des particules
        this.particles.rotation.y = elapsedTime * 0.05;
        this.particles.rotation.x = elapsedTime * 0.03;

        // Animation des sphères orbitales
        this.orbitals.forEach((sphere, index) => {
            const radius = 12;
            sphere.position.x = Math.cos(elapsedTime + sphere.userData.offset) * radius;
            sphere.position.y = Math.sin(elapsedTime + sphere.userData.offset) * radius;
            sphere.position.z = Math.sin(elapsedTime * 0.5 + sphere.userData.offset) * radius;
            
            // Change la couleur progressivement
            sphere.material.color.setHSL(
                (index * 0.3 + elapsedTime * 0.1) % 1,
                1,
                0.5
            );
        });

        // Animation des lumières
        const light2 = this.scene.children.find(child => child.type === "PointLight");
        if (light2) {
            light2.position.x = Math.cos(elapsedTime) * 15;
            light2.position.z = Math.sin(elapsedTime) * 15;
        }

        // Effet de pulsation sur le matériau principal
        this.mainTorus.material.opacity = 0.5 + Math.sin(elapsedTime * 2) * 0.2;

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialisation de l'animation
new Animation();
