const projectsData = {
    1: {
        title: "Application Mobile Eco-Responsable",
        description: "Application mobile permettant de suivre et réduire son empreinte carbone au quotidien.",
        technologies: ["React Native", "Node.js", "MongoDB"],
        year: "2023",
        images: ["/api/placeholder/800/400"]
    },
    2: {
        title: "Plateforme E-commerce",
        description: "Site e-commerce complet avec système de paiement et gestion des stocks en temps réel.",
        technologies: ["Vue.js", "Express", "PostgreSQL"],
        year: "2023",
        images: ["/api/placeholder/800/400"]
    },
    3: {
        title: "Site Web Immersif",
        description: "Portfolio interactif utilisant Three.js pour créer une expérience utilisateur unique.",
        technologies: ["Three.js", "HTML5", "CSS3"],
        year: "2024",
        images: ["/api/placeholder/800/400"]
    }
};

const travelsData = {
    1: {
        title: "Japon",
        description: "Voyage de 3 semaines à travers le Japon, découverte de la culture et de la gastronomie locale.",
        date: "Avril 2023",
        images: ["/api/placeholder/800/400"]
    },
    2: {
        title: "Islande",
        description: "Road trip d'une semaine autour de l'île, observation des aurores boréales.",
        date: "Septembre 2023",
        images: ["/api/placeholder/800/400"]
    },
    3: {
        title: "Pérou",
        description: "Trek jusqu'au Machu Picchu et exploration de la vallée sacrée des Incas.",
        date: "Janvier 2024",
        images: ["/api/placeholder/800/400"]
    }
};

// Gestion des modales
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.querySelector('.close-modal');

function openModal(content) {
    modalContent.innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function createProjectContent(project) {
    return `
        <h2>${project.title}</h2>
        <img src="${project.images[0]}" alt="${project.title}" style="width: 100%; margin: 1rem 0;">
        <p>${project.description}</p>
        <div class="technologies">
            <h3>Technologies utilisées:</h3>
            <ul>${project.technologies.map(tech => `<li>${tech}</li>`).join('')}</ul>
        </div>
        <p>Année: ${project.year}</p>
    `;
}

function createTravelContent(travel) {
    return `
        <h2>${travel.title}</h2>
        <img src="${travel.images[0]}" alt="${travel.title}" style="width: 100%; margin: 1rem 0;">
        <p>${travel.description}</p>
        <p>Date: ${travel.date}</p>
    `;
}

// Event Listeners
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.dataset.project;
        const project = projectsData[projectId];
        openModal(createProjectContent(project));
    });
});

document.querySelectorAll('.travel-card').forEach(card => {
    card.addEventListener('click', () => {
        const travelId = card.dataset.travel;
        const travel = travelsData[travelId];
        openModal(createTravelContent(travel));
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
