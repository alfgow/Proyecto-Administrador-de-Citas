import { datosCita, nuevaCita } from "../funciones.js";
import {
	fechaInput,
	formulario,
	horaInput,
	mascotaInput,
	propietarioInput,
	sintomasInput,
	telefonoInput,
} from "../selectores.js";

class App {
	constructor() {
		this.initApp();
	}

	initApp() {
		mascotaInput.addEventListener("blur", datosCita);
		propietarioInput.addEventListener("blur", datosCita);
		telefonoInput.addEventListener("blur", datosCita);
		fechaInput.addEventListener("blur", datosCita);
		horaInput.addEventListener("blur", datosCita);
		sintomasInput.addEventListener("blur", datosCita);
		formulario.addEventListener("submit", nuevaCita);
	}
}
export default App;
