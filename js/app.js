// !Varibales y constantes

const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

// !UI
const formulario = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");

let editando;

// !Eventos
eventListeners();
function eventListeners() {
	mascotaInput.addEventListener("blur", datosCita);
	propietarioInput.addEventListener("blur", datosCita);
	telefonoInput.addEventListener("blur", datosCita);
	fechaInput.addEventListener("blur", datosCita);
	horaInput.addEventListener("blur", datosCita);
	sintomasInput.addEventListener("blur", datosCita);
	formulario.addEventListener("submit", nuevaCita);
}

const citaObj = {
	mascota: "",
	propietario: "",
	telefono: "",
	fecha: "",
	hora: "",
	sintomas: "",
};

// ?   *********            C L A S E S        *********

class Citas {
	constructor() {
		this.citas = [];
	}

	agregarCita(cita) {
		this.citas = [...this.citas, cita];
	}

	eliminarCita(id) {
		this.citas = this.citas.filter((cita) => cita.id !== id);
	}

	editarCita(citaActualizada) {
		this.citas = this.citas.map((cita) =>
			cita.id === citaActualizada.id ? citaActualizada : cita
		);
	}
}

class UI {
	// Imprimir Alertas
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

// ?   *****  Instanciado de Clases    *****

const ui = new UI();
const administrarCitas = new Citas();

// !Funciones
function datosCita(e) {
	if (e.target.value === "") {
		e.target.classList.add("border", "border-danger");
		e.target.classList.remove("border", "border-success");
		ui.errorCampoVacio(
			`${e.target.name} es obligatorio`,
			e.target.id
		);
		return;
	} else {
		e.target.classList.remove("border", "border-danger");
		e.target.classList.add("border", "border-success");
	}
	citaObj[e.target.name] = e.target.value;
}

function nuevaCita(e) {
	e.preventDefault();

	// Extraer Informacion del objeto de cita
	const { mascota, propietario, telefono, fecha, hora, sintomas } =
		citaObj;

	// Validar que los campos no esten vacios
	if (
		mascota === "" ||
		propietario === "" ||
		telefono === "" ||
		fecha === "" ||
		hora === "" ||
		sintomas === ""
	) {
		let nombreCampo;
		nombreCampo = e.target;
		ui.imprimirAlerta("Todos los campos son obligatorios", "error");
		return;
	}

	if (editando) {
		// Pasando la cita a edicion
		administrarCitas.editarCita({ ...citaObj });
		// Mensaje cita agregada
		ui.imprimirAlerta("Se editó la cita");

		// Cambiar texto del boton
		formulario.querySelector('button[type="submit"]').textContent =
			"Crear nueva cita";

		editando = false;
	} else {
		// Generamos un Id unico
		citaObj.id = Date.now();

		// Creamos la nueva cita, copiando el objeto
		administrarCitas.agregarCita({ ...citaObj });

		// Mensaje cita agregada
		ui.imprimirAlerta("Cita Agregada");
	}

	// Reiniciamos el Objeto
	reiniciarObjeto();

	// Reiniciamos el Formulario
	formulario.reset();

	// Mostrando la Cita en el HTML
	ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto() {
	citaObj.mascota = "";
	citaObj.propietario = "";
	citaObj.telefono = "";
	citaObj.fecha = "";
	citaObj.hora = "";
	citaObj.sintomas = "";
}

function eliminarCita(id) {
	//Eliminar Cita
	administrarCitas.eliminarCita(id);
	// Mostrar Mensaje
	ui.imprimirAlerta("La cita se elimino correctamente");
	//Recargar las citas
	ui.imprimirCitas(administrarCitas);
}

function cargarEdicion(cita) {
	// Destructuring del objeto cita
	const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
		cita;

	// Llenamos los campos del formulario
	mascotaInput.value = mascota;
	propietarioInput.value = propietario;
	telefonoInput.value = telefono;
	fechaInput.value = fecha;
	horaInput.value = hora;
	sintomasInput.value = sintomas;

	// Llenamos Info en Obj
	citaObj.mascota = mascota;
	citaObj.propietario = propietario;
	citaObj.telefono = telefono;
	citaObj.fecha = fecha;
	citaObj.hora = hora;
	citaObj.sintomas = sintomas;
	citaObj.id = id;

	// Cambiar el texto del boton
	/*
    ! formulario.querySelector('button[type="submit"]').textContent = 'Editar';
    */
	const btnCrear = document.querySelector('button[type="submit"]');
	btnCrear.textContent = "Editar la cita";

	editando = true;
}
