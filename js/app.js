const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");

eventListeners();
function eventListeners() {
  cursos.addEventListener("click", comprarCurso);
  carrito.addEventListener("click", eliminarCurso);
}

function comprarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    //Si elemento en el que se hace click tiene la clase agregar-carrito ...
    const curso = e.target.parentElement.parentElement; //Se usa delegation y se almacena el card del curso seleccionado en la variable
    leerDatosCurso(curso);
  }
}

function leerDatosCurso(curso) {
  //Esta función se encarga de tomar datos del curso seleccionado y almacenarlos como vector en la variable curso
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
  };
  insertarCarrito(infoCurso);
}

function insertarCarrito(curso) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>
      <img src="${curso.imagen}" width=100> 
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
      <a href="#" class="borrar-curso" data-id="${curso.id}"> x </a>
    </td>
  `;
  listaCursos.appendChild(row);
}

function eliminarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar-curso")) {
    e.target.parentElement.parentElement.remove();
  }
}
