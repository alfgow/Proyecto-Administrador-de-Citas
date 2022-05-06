import { cargarEdicion, eliminarCita } from "../funciones.js";
import { contenedorCitas } from "../selectores.js";

class UI {
	imprimirAlerta(mensaje, tipo) {
		// Crear el div
		const divMensaje = document.createElement("div");
		divMensaje.classList.add(
			"text-center",
			"alert",
			"d-block",
			"col-12"
		);

		// Agregar clase en base al tipo de error
		if (tipo === "error") {
			divMensaje.classList.add("alert-danger");
		} else {
			divMensaje.classList.add("alert-success");
		}

		// Mensaje de Error
		divMensaje.textContent = mensaje;

		// Agregar al DOM

		document.querySelector("#contenido").insertBefore(
			divMensaje,
			document.querySelector(".agregar-cita")
		);

		// Quitar la Alerta

		setTimeout(() => {
			divMensaje.remove();
		}, 3000);
	}

	// Error en campos vacios
	errorCampoVacio(mensaje, campoId) {
		const mensajeError = document.createElement("div");
		mensajeError.classList.add(
			"text-center",
			"alert",
			"alert-danger"
		);
		mensajeError.textContent = mensaje;
		document.querySelector(`#div-${campoId}`).insertBefore(
			mensajeError,
			document.querySelector(`#${campoId}`)
		);
		setTimeout(() => {
			mensajeError.remove();
		}, 3000);
	}

	// Mostrar Citas en el HTML
	//? Podemos hacer Destructuring desde los parametros usando las llaves {}
	imprimirCitas({ citas }) {
		this.limpiarHTML();
		citas.forEach((cita) => {
			const {
				mascota,
				propietario,
				telefono,
				fecha,
				hora,
				sintomas,
				id,
			} = cita;
			const divCita = document.createElement("div");
			divCita.classList.add("cita", "p-3");
			divCita.dataset.id = id;

			//! Scripring de los elementos de la cita

			//? Nombre Mascota
			const mascotaParrafo = document.createElement("h2");
			mascotaParrafo.classList.add(
				"card-title",
				"font-weight-bolder"
			);
			mascotaParrafo.textContent = mascota;

			//? Propietario
			const propietarioParrafo = document.createElement("p");
			propietarioParrafo.innerHTML = `
                <span class = 'font-weight-bolder'>Propietario: </span>${propietario}
            `;

			//? Telefono Propietario
			const telefonoParrafo = document.createElement("p");
			telefonoParrafo.innerHTML = `
                <span class = 'font-weight-bolder'>Telefono del propietario: </span>${telefono}
            `;

			//? Fecha de Ingreso
			const fechaParrafo = document.createElement("p");
			fechaParrafo.innerHTML = `
                <span class = 'font-weight-bolder'>Fecha de Ingreso: </span>${fecha}
            `;

			//? Hora de Ingreso
			const horaParrafo = document.createElement("p");
			horaParrafo.innerHTML = `
                <span class = 'font-weight-bolder'>Hora de Ingreso: </span>${hora}
            `;

			//? Sintomas
			const sintomasParrafo = document.createElement("p");
			sintomasParrafo.innerHTML = `
                <span class = 'font-weight-bolder'>Síntomas: </span>${sintomas}
            `;

			// Boton de Eliminar la cita
			const btnEliminar = document.createElement("button");
			btnEliminar.classList.add("btn", "btn-danger", "mr-2");
			btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg> `;

			btnEliminar.onclick = () => eliminarCita(id);

			// Boton de Editar la cita
			const btnEditar = document.createElement("button");
			btnEditar.classList.add("btn", "btn-info");
			btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>`;
			btnEditar.onclick = () => cargarEdicion(cita);

			// Agregar los parrafos al div
			divCita.appendChild(mascotaParrafo);
			divCita.appendChild(propietarioParrafo);
			divCita.appendChild(telefonoParrafo);
			divCita.appendChild(fechaParrafo);
			divCita.appendChild(horaParrafo);
			divCita.appendChild(sintomasParrafo);
			divCita.appendChild(btnEliminar);
			divCita.appendChild(btnEditar);

			// Agregar Citas al HTML
			contenedorCitas.appendChild(divCita);
		});
	}

	limpiarHTML() {
		while (contenedorCitas.firstChild) {
			contenedorCitas.removeChild(contenedorCitas.firstChild);
		}
	}
}

export default UI;
