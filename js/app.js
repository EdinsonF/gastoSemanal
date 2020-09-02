//variables
const presupuestoUsuario = prompt("Cual es tu presupuesto:");
const formulario  = document.querySelector("#agregar-gasto");
const listado = document.querySelector(".list-group");



//clases

class Presupuesto{
    
    constructor(presupuesto){
            this.presupuesto= Number(presupuesto);
            this.restante= Number(presupuesto);
            this.gastos = [];
    }
    //metodos

    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        this.actualizarRestante();
    }

    actualizarRestante(){
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
    }

    eliminarGasto(id){
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        console.log(this.gastos);
    }


}

//clase vista
class Interfaz{

    insertarPresupuesto(cantidad){
        const {presupuesto, restante} = cantidad;
        document.querySelector("#total").innerHTML = Number(presupuesto);
        document.querySelector("#restante").innerHTML = Number(restante);
    }

    //validar y mostrar mensaje
    mostrarMensaje(mensaje, tipo){
        const divPadre = document.querySelector(".primario");
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center'); 
        if(tipo === 'error'){
            divMensaje.classList.add('alert', 'alert-danger');          
        }else{
            divMensaje.classList.add('alert', 'alert-success');
        }

            divMensaje.innerHTML = mensaje;
            divPadre.insertBefore(divMensaje, formulario);
            setTimeout(function(){
                divMensaje.remove();
                formulario.reset();
            },1000);
        

    }
    //agregar gasto
    monstrarGastos(datos){
        this.limpiarLista();
    datos.forEach(gastos => {
        const {gasto, cantidad, id} = gastos;

        //list-group-item d-flex justify-content-between align-items-center
        //span -> badge badge-primary badge-pill   
        
        const li = document.createElement('li');
        li.className='list-group-item d-flex justify-content-between align-items-center';
        li.dataset.id = id;
        li.innerHTML = `
            <span>${gasto}</span>
            <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
        `;
        const btnBorrar = document.createElement('button');
        btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
        btnBorrar.textContent = "Eliminar";
        btnBorrar.onclick = () => {
            eliminarGasto(id);
        }
        li.appendChild(btnBorrar);
        listado.appendChild(li);
    });    
    }

    limpiarLista(){
        while(listado.firstChild){
            listado.removeChild(listado.firstChild);
        }

    }

    //restar presupuesto
    mostrarRestante(restante){

         document.querySelector("#restante").innerHTML = restante;
     
        this.comprobarPresupuesto();
 
   }

    comprobarPresupuesto(){
        let {presupuesto , restante} = cantidadPresupuesto;

        console.log("pre:"+presupuesto+",restante:"+restante);
        const div = document.querySelector(".restante");
        if((presupuesto/4) > restante){ 
            div.classList.remove('alert-success', 'alert-warning');
            div.classList.add('alert-danger');

        }else if((presupuesto /2) > restante){
            div.classList.remove('alert-success','alert-danger');
            div.classList.add('alert-warning');
        }else{
            div.classList.remove( 'alert-warning','alert-danger');
            div.classList.add('alert-success');
        }

        if(restante <= 0){
            UI.mostrarMensaje("Presupuesto agotado", "error");
            formulario.querySelector('button[type="submit"]').disabled = true;
        }else{
            formulario.querySelector('button[type="submit"]').disabled = false;
        }
    }

}

//INSTANCIAS
const UI = new Interfaz();

let cantidadPresupuesto;



/* EVENT LISTENER */


addEventListener('DOMContentLoaded', preguntarPresupuesto);

formulario.addEventListener('submit', agregarGasto);



/* FUNCIONES */

function preguntarPresupuesto(){
    if(presupuestoUsuario === null || presupuestoUsuario === '' || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0)   {
        location.reload();
    }else{
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        UI.insertarPresupuesto(cantidadPresupuesto);
        //console.log("correcto:"+presupuesto)
    }
}

function agregarGasto(e){
    e.preventDefault();
    const gasto = document.querySelector("#gasto").value;
    const cantidad   = Number(document.querySelector("#cantidad").value);

    if(gasto ==='' || cantidad === ''){
        UI.mostrarMensaje("Ambos campos son obligatorios!","error");
    }else if(cantidad <= 0 || isNaN(cantidad)){
        UI.mostrarMensaje("El valor es errado!","error");
    }else{
        const datos = {gasto, cantidad, id: Date.now()}
        
        cantidadPresupuesto.nuevoGasto(datos);
        

        const {gastos, restante} = cantidadPresupuesto;
        UI.mostrarMensaje("Agregado","success");
        UI.monstrarGastos(gastos);
        UI.mostrarRestante(restante);
    }
}


function eliminarGasto(id){
    cantidadPresupuesto.eliminarGasto(id);
    cantidadPresupuesto.actualizarRestante();
    const {gastos, restante} = cantidadPresupuesto;
    UI.monstrarGastos(gastos);   
    UI.mostrarRestante(restante);
    
}