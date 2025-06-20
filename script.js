document.querySelector('.todo-list-heading').addEventListener('click', function() {
    window.location.href = 'index.html';
});
document.querySelector('.pomo-heading').addEventListener('click', function() {
    window.location.href = 'pomo.html';
});

const inputText = document.getElementById('taskInput');
console.log("Input field:", inputText.value);

function addTask() {
    const taskContent = inputText.value.trim();
    if (taskContent === '') {
        alert('Please enter a task.');
        return;
    }
    else {
        const taskList = document.getElementById('tasks');
        const task = document.createElement('li');
        const taskTextNode = document.createTextNode(taskContent);
        task.setAttribute('class', 'task-item');
        const tickButton = document.createElement('button');
        tickButton.setAttribute('class',"completeTaskButton");
        tickButton.textContent = '✓';
        const crossButton = document.createElement('button');
        tickButton.setAttribute('onclick', 'removeTask()');
        crossButton.setAttribute('onclick', 'removeTask()');
        crossButton.setAttribute('class',"removeTaskButton");

        crossButton.textContent = 'x';
        task.appendChild(tickButton);
        task.appendChild(taskTextNode);
        task.appendChild(crossButton);
        console.log("Creating task:", taskContent);
        taskList.appendChild(task);
        console.log("Task added:", taskContent);
        
        inputText.value = ''; // Clear the input field after adding the task
    }
    inputText.focus(); // Keep focus on the input field
}
function removeTask() {
    const taskList = document.getElementById('tasks');
    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('removeTaskButton')) {
            const taskItem = event.target.parentElement;
            console.log("Removing task:", taskItem.textContent);
            taskList.removeChild(taskItem);
        }
        else if (event.target.classList.contains('completeTaskButton')) {
            const taskItem = event.target.parentElement;
            console.log("Removing task:", taskItem.textContent);
            taskList.removeChild(taskItem);
        }
    });
}

let isBreak = false;
    let pomodoroTime = 25 * 60; // 25 minutes
    let breakTime = 5 * 60;     // 5 minutes
    let timeLeft = pomodoroTime;
    let timer;
    let isRunning = false;

    function updateDisplay() {
      const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
      const seconds = String(timeLeft % 60).padStart(2, '0');
      document.getElementById('timer').textContent = `${minutes}:${seconds}`;
      document.getElementById('mode').textContent = isBreak ? "Break" : "Pomodoro";
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
          startTimer();
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

    updateDisplay(); // initial display