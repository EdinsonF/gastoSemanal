//variables
const presupuestoUsuario = prompt("Cual es tu presupuesto:");
const formulario  = document.querySelector("#agregar-gasto");
let cantidadPresupuesto;



//clases

class Presupuesto{
    
    constructor(presupuesto){
            this.presupuesto= Number(presupuesto);
            this.restante= Number(presupuesto);
    }
    //metodos

    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad);
    }


}

//clase vista
class Interfaz{

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
            },2000);
        

    }
    //agregar gasto
    agregarGasto(nuevoGasto, cantidad){
     //list-group-item d-flex justify-content-between align-items-center
     //span -> badge badge-primary badge-pill   
        const ul = document.querySelector(".list-group");
        const li = document.createElement('li');
        li.className='list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${nuevoGasto}
            <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
        `;
        ul.appendChild(li);
    }

    //restar presupuesto
    presupuestoRestante(cantidad){

        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
        const restante = document.querySelector("#restante");
        restante.innerHTML = presupuestoRestanteUsuario;
     
        this.comprobarPresupuesto();
 
   }

    comprobarPresupuesto(){
        let total = cantidadPresupuesto.presupuesto;
        let restante = cantidadPresupuesto.restante;

        
        const div = document.querySelector(".restante");
        if((total/4) > restante){ 
            div.classList.remove('alert-success', 'alert-warning');
            div.classList.add('alert-danger');

        }else if((total /2) > restante){
            div.classList.remove('alert-success');
            div.classList.add('alert-warning');
        }
    }

}






//evenlistener


addEventListener('DOMContentLoaded', function(){
    const total = document.querySelector("#total");
    const restante = document.querySelector("#restante");
    if(presupuestoUsuario === null || presupuestoUsuario === '') {
        location.reload();
    }else{
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        total.innerHTML = Number(presupuestoUsuario);
        restante.innerHTML = Number(presupuestoUsuario);
        //console.log("correcto:"+presupuesto);

    }
    

});

//hacer click n agregar

formulario.addEventListener('submit', function(e){
    let interfaz = new Interfaz();
    e.preventDefault();
    const nuevoGasto = document.querySelector("#gasto");
    const cantidad   = document.querySelector("#cantidad");

    if(nuevoGasto.value ==='' || cantidad.value === ''){

        interfaz.mostrarMensaje("Faltan datos...","error");
        
    }else{
        interfaz.mostrarMensaje("Agregado","success");
        interfaz.agregarGasto(nuevoGasto.value, cantidad.value);
        interfaz.presupuestoRestante(cantidad.value);
    }
});