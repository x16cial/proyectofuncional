document.addEventListener('DOMContentLoaded', function () {
  var taskForm = document.getElementById('task-form');
  var taskInput = document.getElementById('task-input');
  var colorPicker = document.getElementById('color-picker');
  var taskList = document.getElementById('task-list');
  var downloadLink = document.getElementById('download-link');

  let tareas = []; // Array para almacenar las tareas

  taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    const taskColor = colorPicker.jscolor.toHEXString();
    if (taskText) {
      addTask(taskText, taskColor);
      taskInput.value = '';
    }
  });

  function addTask(taskText, color) {
    const li = document.createElement('li');
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-text';
    taskDiv.textContent = taskText;
    taskDiv.style.backgroundColor = color;

    const colorRgb = hexToRgb(color);
    const textColor = getTextColor(colorRgb);
    taskDiv.style.color = textColor;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function () {
      li.remove();

      // Elimina la tarea del array
      tareas = tareas.filter(tarea => tarea.tarea !== taskText || tarea.color !== color);
    });

    li.appendChild(taskDiv);
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    // Agrega la tarea al array
    tareas.push({ tarea: taskText, color: color });
  }

  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  }

  function getTextColor(rgb) {
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? 'black' : 'white';
  }

  downloadLink.addEventListener('click', function () {
    let contenidoTxt = tareas.map(tarea => `${tarea.tarea} - ${tarea.color}`).join('\n');
    const blob = new Blob([contenidoTxt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lista_tareas.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); 
});})