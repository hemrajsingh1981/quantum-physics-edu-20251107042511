import p5 from 'p5';

// Placeholder functions for quantum physics concepts
function waveParticleDuality(p) {
  // p5.js sketch for wave-particle duality
  p.setup = () => {
    p.createCanvas(600, 400);
    p.background(220);
    p.noLoop();
    console.log('Wave-Particle Duality sketch initialized');
  };

  p.draw = () => {
    p.background(220);
    p.fill(0, 102, 153);
    p.ellipse(p.width / 2, p.height / 2, 50, 50);
    p.text('Wave-Particle Duality', p.width / 2 - 50, p.height / 2 - 70);
  };
}

function superposition(p) {
  // p5.js sketch for superposition
  p.setup = () => {
    p.createCanvas(600, 400);
    p.background(200, 150, 100);
    p.noLoop();
    console.log('Superposition sketch initialized');
  };

  p.draw = () => {
    p.background(200, 150, 100);
    p.fill(255, 0, 0);
    p.rect(p.width / 2 - 25, p.height / 2 - 25, 50, 50);
    p.text('Superposition', p.width / 2 - 50, p.height / 2 - 70);
  };
}

function quantumTunneling(p) {
  // p5.js sketch for quantum tunneling
  p.setup = () => {
    p.createCanvas(600, 400);
    p.background(100, 200, 150);
    p.noLoop();
    console.log('Quantum Tunneling sketch initialized');
  };

  p.draw = () => {
    p.background(100, 200, 150);
    p.fill(0, 255, 0);
    p.triangle(p.width / 2, p.height / 2 - 25, p.width / 2 - 25, p.height / 2 + 25, p.width / 2 + 25, p.height / 2 + 25);
    p.text('Quantum Tunneling', p.width / 2 - 50, p.height / 2 - 70);
  };
}

// Main application logic
// Ensure the DOM is fully loaded before initializing p5.js
// The 'main' element is expected to be present in index.html
// We only create one p5 instance and manage its sketch content for navigation.

const sketchContainerId = 'main';
let currentSketchInstance = null;
let currentSection = 'wave-particle-duality'; // Default section

// Function to render a specific sketch
function renderSketch(sketchFunction) {
  // If an instance already exists, remove it before creating a new one
  if (currentSketchInstance) {
    currentSketchInstance.remove();
  }
  // Create a new p5 instance and attach it to the 'main' element
  currentSketchInstance = new p5(sketchFunction, sketchContainerId);
}

// Function to switch between sections
function navigateTo(section) {
  currentSection = section;
  switch (section) {
    case 'wave-particle-duality':
      renderSketch(waveParticleDuality);
      break;
    case 'superposition':
      renderSketch(superposition);
      break;
    case 'quantum-tunneling':
      renderSketch(quantumTunneling);
      break;
    default:
      console.error('Unknown section:', section);
      // Optionally, render a default or error sketch
      break;
  }
}

// Basic quiz functionality
function checkQuizAnswer(selectedAnswer, correctAnswer) {
  return selectedAnswer === correctAnswer;
}

// Initialize the application when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the first sketch
  navigateTo(currentSection);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        // Update current section based on the target ID
        const sectionId = targetId.substring(1); // Remove '#' from ID
        if (['wave-particle-duality', 'superposition', 'quantum-tunneling'].includes(sectionId)) {
          navigateTo(sectionId);
        }
      }
    });
  });

  // Quiz setup
  const quizForm = document.getElementById('quiz-form');
  const feedback = document.getElementById('quiz-feedback');
  const questionElement = document.getElementById('quiz-question');
  const optionsElement = document.getElementById('quiz-options');

  if (quizForm && questionElement && optionsElement) {
    // Example quiz data (replace with actual data)
    const quizData = {
      question: "Which concept describes particles behaving as waves and vice versa?",
      options: ["Superposition", "Wave-Particle Duality", "Quantum Tunneling"],
      correctAnswer: "Wave-Particle Duality"
    };

    // Display quiz question and options
    questionElement.textContent = quizData.question;
    optionsElement.innerHTML = ''; // Clear previous options
    quizData.options.forEach(option => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'quiz-answer';
      input.value = option;
      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      optionsElement.appendChild(label);
      optionsElement.appendChild(document.createElement('br'));
    });

    quizForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const selectedAnswer = document.querySelector('input[name="quiz-answer"]:checked');
      if (selectedAnswer) {
        const isCorrect = checkQuizAnswer(selectedAnswer.value, quizData.correctAnswer);
        if (feedback) {
          feedback.textContent = isCorrect ? 'Correct!' : 'Incorrect!';
          feedback.style.color = isCorrect ? 'green' : 'red';
        }
      } else {
        if (feedback) {
          feedback.textContent = 'Please select an answer.';
          feedback.style.color = 'orange';
        }
      }
    });
  }
});
