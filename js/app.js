const carrito = document.getElementById("carrito"),
  cursos = document.getElementById("lista-cursos"),
  listaCursos = document.querySelector("#lista-carrito tbody"),
  vaciarCarritoBTN = document.getElementById("vaciar-carrito");

eventListeners();
function eventListeners() {
  cursos.addEventListener("click", comprarCurso);
  carrito.addEventListener("click", eliminarCurso);
  vaciarCarritoBTN.addEventListener("click", vaciarCarrito);
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
  guardarCursoLocalStorage(curso);
}

function eliminarCurso(e) {
  e.preventDefault();
  // Si el elemento donde se ha hecho click contiene la clase borrar-curso, se toma el padre del padre y se elimina.
  if (e.target.classList.contains("borrar-curso")) {
    e.target.parentElement.parentElement.remove();
  }
}

function vaciarCarrito() {
  // Se recorrerán los elementos del tbody mientras exista un elemento hijo. Entonces lo removerá
  while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild);
  }
  return false;

  /* //Forma corta 
  listaCursos.innerHTML = ''; */
}

function guardarCursoLocalStorage(curso) {
  let cursos;

  cursos = obtenerCursoLocalStorage();
  cursos.push(curso); //Se agrega el curso seleccionado al arreglo
  localStorage.setItem("cursos", JSON.stringify(cursos)); //Se convierte el vector a string y se guarda como JSON en LS
}

function obtenerCursoLocalStorage() {
  let cursosLS;
  //Se comprueba que existan elementos en Local Storage
  if (localStorage.getItem("cursos") === null) {
    cursosLS = []; //Si NO los hay crea un arreglo
  } else {
    // Si los hay solo los convierte en JSON
    cursosLS = JSON.parse(localStorage.getItem("cursos"));
  }
  return cursosLS;
}
