function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }
    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    listItem.textContent = taskText;
    taskList.appendChild(listItem); // Add the new task to the list
    document.getElementById('taskInput').value = ""; // Clear the input field

    const tickButton = document.createElement('button');
    tickButton.textContent = "✓";
    tickButton.onclick = function() {
        listItem.style.textDecoration = "line-through"; // Mark task as done
        tickButton.disabled = true; // Disable the tick button
    };
    listItem.appendChild(tickButton); // Add the tick button to the task item
}