// Video Background Handling
const videoBackground = document.querySelector('.video-background');
if (videoBackground) {
  videoBackground.play().catch(error => {
    console.log("Video autoplay prevented:", error);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      videoBackground.pause();
    } else {
      videoBackground.play();
    }
  });
}

// Navigation
document.querySelector('.todo-list-heading').addEventListener('click', () => {
  window.location.href = 'index.html';
});

document.querySelector('.pomo-heading').addEventListener('click', () => {
  window.location.href = 'pomo.html';
});

// Todo List Functionality
const inputText = document.getElementById('taskInput');
const addButton = document.getElementById('addTaskButton');

function addTask() {
  const taskContent = inputText.value.trim();
  if (!taskContent) return;

  const taskList = document.getElementById('tasks');
  const task = document.createElement('li');
  task.className = 'task-item';

  task.innerHTML = `
    <button class="completeTaskButton">✓</button>
    <span class="task-text">${taskContent}</span>
    <button class="removeTaskButton">×</button>
  `;

  task.querySelector('.completeTaskButton').addEventListener('click', () => {
    task.classList.add('completed');
    setTimeout(() => task.remove(), 300);
  });

  task.querySelector('.removeTaskButton').addEventListener('click', () => {
    task.remove();
  });

  taskList.appendChild(task);
  inputText.value = '';
  inputText.focus();
}

if (inputText && addButton) {
  inputText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  addButton.addEventListener('click', addTask);
}

// Pomodoro Timer
let isBreak = false;
let pomodoroTime = 25 * 60;
let breakTime = 5 * 60;
let timeLeft = pomodoroTime;
let timer;
let isRunning = false;

function updateDisplay() {
  if (!document.getElementById('timer')) return;
  
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `${minutes}:${seconds}`;
  document.getElementById('mode').textContent = isBreak ? "Break" : "Focus";
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      isBreak = !isBreak;
      timeLeft = isBreak ? breakTime : pomodoroTime;
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  isBreak = false;
  timeLeft = pomodoroTime;
  updateDisplay();
}

// Ambient Sound Control
const soundToggle = document.getElementById('soundToggle');
if (soundToggle) {
  const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-rain-and-thunder-storm-2390.mp3');
  audio.loop = true;
  let soundOn = false;
  
  soundToggle.addEventListener('click', () => {
    soundOn = !soundOn;
    soundToggle.textContent = soundOn ? "🔊 Ambient Sound" : "🔇 Ambient Sound";
    soundOn ? audio.play() : audio.pause();
  });
}

// Initialize
if (document.getElementById('timer')) {
  updateDisplay();
}