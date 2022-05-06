import Citas from "./clases/citas.js";
import UI from "./clases/ui.js";
import {
	fechaInput,
	formulario,
	horaInput,
	mascotaInput,
	propietarioInput,
	sintomasInput,
	telefonoInput,
} from "./selectores.js";

const ui = new UI();
const administrarCitas = new Citas();

let editando;

const citaObj = {
	mascota: "",
	propietario: "",
	telefono: "",
	fecha: "",
	hora: "",
	sintomas: "",
};

export function datosCita(e) {
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

export function nuevaCita(e) {
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

export function reiniciarObjeto() {
	citaObj.mascota = "";
	citaObj.propietario = "";
	citaObj.telefono = "";
	citaObj.fecha = "";
	citaObj.hora = "";
	citaObj.sintomas = "";
}

export function eliminarCita(id) {
	//Eliminar Cita
	administrarCitas.eliminarCita(id);
	// Mostrar Mensaje
	ui.imprimirAlerta("La cita se elimino correctamente");
	//Recargar las citas
	ui.imprimirCitas(administrarCitas);
}

export function cargarEdicion(cita) {
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
