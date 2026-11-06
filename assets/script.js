const tablaDatos = document.getElementById("tablaDatos");
const formRegistrar = document.getElementById("formRegistrar");

const modalForm = document.getElementById("modalForm");
const idModal = document.getElementById("idModal");
const nombreModal = document.getElementById("nombreModal");
const precioModal = document.getElementById("precioModal");
const stockModal = document.getElementById("stockModal");

$("#modalActualizar").on("shown.bs.modal", function () {
  // $("#myInput").trigger("focus");
});

formRegistrar.addEventListener("submit", (e) => {
  InsertarDatos(e);
});

const MostrarTabla = async () => {
  try {
    const respuesta = await fetch("http://localhost:8000/api/products");

    if (!respuesta.ok) {
      alert("Error de conexion");
      return;
    }

    const data = await respuesta.json();
    console.log(data);

    var innerHtml = `<thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Eliminar</th>
                                <th scope="col">Actualizar</th>
                            </tr>
                         </thead>
                         <tbody class="table-group-divider">`;

    data.forEach((row) => {
      innerHtml += `
                        <tr>
                            <th scope="row" data-id = "${row.id}">${row.id}</th>
                            <td>${row.nombre}</td>
                            <td>${row.precio}</td>
                            <td>${row.stock}</td>
                            <td><button
                                onclick="EliminarDatos(this)"
                                class="btn btn-danger"
                                type="submit"
                                >
                                     Eliminar
                            </button>
                                  <td><button
                                onclick="ActualizarModal(this)"
                                class="btn btn-primary"
                                data-toggle="modal"
                                data-target="#modalActualizar""    
                                type="submit"
                                >
                                     Actualizar
                            </button>
                            </td>
                        </tr>
                    
                         `;
    });

    innerHtml += ` </tbody>
                     </table>`;

    tablaDatos.replaceChildren();
    tablaDatos.insertAdjacentHTML("beforeend", innerHtml);
  } catch (error) {
    console.log(error);
  }
};

const InsertarDatos = async (e) => {
  try {
    e.preventDefault();
    const formData = new FormData(formRegistrar);
    const datos = Object.fromEntries(formData);

    const respuesta = await fetch(
      "http://localhost:8000/api/products/register",
      {
        method: "POST",
        // headers: "Content-Type: application/json",
        body: JSON.stringify(datos),
      },
    );

    if (!respuesta.ok) {
      alert("Error de conexion");
      return;
    }
    MostrarTabla();
    const data = await respuesta.json();
    alert(`${data.mensaje} con Id ${data.id} `);
  } catch (e) {
    console.log(e);
  }
};

async function EliminarDatos(e) {
  try {
    const tr = e.closest("tr");
    const id = tr.children[0].dataset.id;

    console.log(id);
    const url = `http://localhost:8000/api/products/${id}`;

    const respuesta = await fetch(url, {
      method: "DELETE",
    });

    if (!respuesta.ok) {
      alert("Error de conexion");
      return;
    }
    MostrarTabla();
    const data = await respuesta.json();
    alert(`${data.mensaje} con Id ${data.id} `);
  } catch (e) {
    console.log(e);
  }
}

const ActualizarModal = async (e) => {
  const tr = e.closest("tr");
  const id = tr.children[0].dataset.id;
  const nombre = tr.children[1].textContent;
  const precio = tr.children[2].textContent;
  const stock = tr.children[3].textContent;

  idModal.dataset.id = id;
  idModal.textContent = `Id del producto: ${id}`;
  nombreModal.value = nombre;
  precioModal.value = precio;
  stockModal.value = stock;
};

const ActualizarDatos = async () => {
  try {
    const modalFormData = new FormData(modalForm);
    const datos = Object.fromEntries(modalFormData);
    const id = idModal.dataset.id;

    // console.log(id);

    // console.log(modalForm);
    // console.log(modalFormData);
    console.log(JSON.stringify(datos));

    const url = `http://localhost:8000/api/products/${id}`;

    const respuesta = await fetch(`http://localhost:8000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    if (!respuesta.ok) {
      alert("Error de conexion");
      return;
    }

    MostrarTabla();
    const data = await respuesta.json();
    alert(`${data.mensaje} con Id ${data.id} `);
  } catch (e) {
    console.log(e);
  }
};

MostrarTabla();
