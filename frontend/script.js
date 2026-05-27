const sections = document.querySelectorAll("section");

window.addEventListener("scroll", revealSections);

function revealSections() {
    const triggerBottom = window.innerHeight * 0.85;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerBottom) {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }
    });
}

// Initial hidden style
sections.forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "all 0.8s ease";
});

// Run once
revealSections();


// ===== Skill card mouse rotate effect =====
const cards = document.querySelectorAll(".skill-card");

cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const x = e.offsetX;
        const y = e.offsetY;

        const rotateX = -(y / 20);
        const rotateY = x / 20;

        card.style.transform =
            `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform =
            "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
});


// ===== Project card hover effect =====
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const x = e.offsetX;
        const y = e.offsetY;

        const rotateX = -(y / 25);
        const rotateY = x / 25;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
});


// ===== Navbar darker on scroll =====
window.addEventListener("scroll", () => {
    const nav = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        nav.style.background = "rgba(15, 8, 8, 0.98)";
        nav.style.boxShadow = "0 0 20px rgba(128,0,0,0.5)";
    } else {
        nav.style.background = "rgba(20, 10, 10, 0.9)";
    }
});


// ===== Active nav click =====
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelectorAll('.nav-links a')
            .forEach(nav => nav.classList.remove('active'));

        this.classList.add('active');
    });
});
// ===== Fetch Projects From Backend =====
fetch("http://localhost:5000/api/projects")
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("projects-container");

    container.innerHTML = "";

    data.forEach(project => {

      container.innerHTML += `
        <div class="project-card">

  <h3>${project.title}</h3>

  <p>${project.description}</p>

  <h4>${project.technology}</h4>

  <div class="project-buttons">

  <button onclick="editProject(${project.id})" class="edit-btn">
    Edit
  </button>

  <button onclick="deleteProject(${project.id})" class="delete-btn">
    Delete
  </button>

</div>

</div>
      `;

    });

    // Re-enable hover effect for dynamic cards
    const newProjectCards = document.querySelectorAll(".project-card");

    newProjectCards.forEach(card => {

      card.addEventListener("mousemove", (e) => {

        const x = e.offsetX;
        const y = e.offsetY;

        const rotateX = -(y / 25);
        const rotateY = x / 25;

        card.style.transform =
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;

      });

      card.addEventListener("mouseleave", () => {

        card.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";

      });

    });

  });


// ===== Add New Project =====
function addProject() {

  const title = document.getElementById("title").value;
  const technology = document.getElementById("technology").value;
  const description = document.getElementById("description").value;

  // Validation
  if (!title || !technology || !description) {
    alert("Please fill all fields");
    return;
  }

  const newProject = {
    id: Date.now(),
    title,
    technology,
    description
  };

  fetch("http://localhost:5000/api/projects", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(newProject)

  })

  .then(res => res.json())

  .then(data => {

    alert("Project Added 🚀");

    // Clear inputs
    document.getElementById("title").value = "";
    document.getElementById("technology").value = "";
    document.getElementById("description").value = "";

    // Reload projects dynamically
    location.reload();

  })

  .catch(err => {
    console.log(err);
    alert("Error adding project");
  });

}function deleteProject(id) {

  fetch(`http://localhost:5000/api/projects/${id}`, {

    method: "DELETE"

  })

  .then(res => res.json())

  .then(data => {

    alert("Project Deleted ❌");

    location.reload();

  })

  .catch(err => {

    console.log(err);

    alert("Delete failed");

  });

}

function editProject(id) {

  const title = prompt("Enter new project title:");
  const technology = prompt("Enter new technology:");
  const description = prompt("Enter new description:");

  const updatedProject = {
    id,
    title,
    technology,
    description
  };

  fetch(`http://localhost:5000/api/projects/${id}`, {

    method: "PUT",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(updatedProject)

  })

  .then(res => res.json())

  .then(data => {

    alert("Project Updated ✏️");

    location.reload();

  })

  .catch(err => {

    console.log(err);

    alert("Update failed");

  });

}

// ===== Dark / Light Mode =====

const themeToggle =
  document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {

    themeToggle.innerHTML = "☀️";

  } else {

    themeToggle.innerHTML = "🌙";

  }

});

// ===== Typing Animation =====

const typingText =
  document.getElementById("typing-text");

const words = [

  "Full Stack Developer",
  "UI/UX Designer",
  "IoT Developer",
  "Creative Coder"

];

let wordIndex = 0;
let charIndex = 0;

function typeEffect() {

  if (charIndex < words[wordIndex].length) {

    typingText.innerHTML +=
      words[wordIndex].charAt(charIndex);

    charIndex++;

    setTimeout(typeEffect, 100);

  }

  else {

    setTimeout(eraseEffect, 1500);

  }

}

function eraseEffect() {

  if (charIndex > 0) {

    typingText.innerHTML =
      words[wordIndex].substring(0, charIndex - 1);

    charIndex--;

    setTimeout(eraseEffect, 50);

  }

  else {

    wordIndex++;

    if (wordIndex >= words.length) {

      wordIndex = 0;

    }

    setTimeout(typeEffect, 300);

  }

}

typeEffect();

// ===== Scroll Progress Bar =====

window.addEventListener("scroll", () => {

  const scrollTop =
    document.documentElement.scrollTop;

  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrollPercent =
    (scrollTop / scrollHeight) * 100;

  document.getElementById("progress-bar")
    .style.width = scrollPercent + "%";

});

// ===== Custom Cursor =====

const cursor =
  document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

  cursor.style.left = e.clientX + "px";

  cursor.style.top = e.clientY + "px";

});