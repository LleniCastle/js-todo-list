let form = document.querySelector("#form");
let agregarTarea = document.querySelector("#agregarTarea");
let listTareas = document.querySelector("#listTareas");
let contadorCheck = document.querySelector("#contador2");
let contadorTotal = document.querySelector("#contador1");
let arrayTareas = [
  {
    id: 1,
    name: 'Hacer ejercicio',
},
{
    id: 2,
    name: 'Revisar pendientes',
},
{
    id: 3,
    name: 'Regar las plantas',
}
];

let renderTareas = () => {
  listTareas.innerHTML = "";
  arrayTareas.forEach((tarea) => {
    const isChecked = tarea.hecho ? "checked" : "";
    listTareas.innerHTML += `
    <tr id="listTareas">
        <td>
          ${tarea.id}  
        </td>
        <td>
          ${tarea.name} 
        </td>
        <td>
          <input class="check" type="checkbox" ${isChecked} data-id="${tarea.id}">
        </td>
        <td>
          <button onclick="eliminar(${tarea.id})" style="width: 25px;">
            <i class="fa-solid fa-trash-can" style="width: 20px;"></i>
          </button>
        </td>
    </tr>
    `;
  });

  contadorTotal.textContent = arrayTareas.length;
  contadorCheck.textContent = getCheckedCount();
};

function eliminar(id) {
  const tareaIndex = arrayTareas.findIndex((tarea) => tarea.id == id);
  if (tareaIndex !== -1) {
    arrayTareas.splice(tareaIndex, 1);
  }
  renderTareas();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const tareaValue = agregarTarea.value.trim();
  if (tareaValue !== "") {
    arrayTareas.push({
      id: Date.now(),
      name: tareaValue,
      hecho: false,
    });
    renderTareas();
    agregarTarea.value = "";
  } else {
    alert("Por favor, ingresa una tarea");
  }
});

listTareas.addEventListener("change", (e) => {
  if (e.target.classList.contains("check")) {
    const tareaId = e.target.dataset.id;
    toggleTareaHecho(tareaId);
    renderTareas();
  }
});

function toggleTareaHecho(id) {
  const tarea = arrayTareas.find((tarea) => tarea.id == id);
  if (tarea) {
    tarea.hecho = !tarea.hecho;
  }
}

function getCheckedCount() {
  const checkboxes = document.querySelectorAll(".check");
  let contador = 0;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      contador++;
    }
  });
  return contador;
}

renderTareas();
