const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");

eventListeners();
function eventListeners() {
  cursos.addEventListener("click", comprarCurso);
}

function comprarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    //Si elemento en el que se hace click tiene la clase agregar-carrito ...
    const curso = e.target.parentElement.parentElement; //Se usa delegation y se almacena el card del curso seleccionado en la variable
    leerDatosCurso();
  }
}

function leerDatosCurso() {}
