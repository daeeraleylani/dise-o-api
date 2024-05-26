
var nombre=document.getElementById("txtNombre");
var apellidos=document.getElementById("txtApellidos");
var carrera=document.getElementById("txtCarrera");
var telefono=document.getElementById("txtTelefono");
var email=document.getElementById("txtEmail");

var boton=document.getElementById("btnSubmit");
var Tcuerpo=document.getElementById("cuerpoTabla");
var actualizar=document.getElementById("btnActualizar");
var key_update=null;

var nombreModal=document.getElementById("txtNombreModal");
var apellidosModal=document.getElementById("txtApellidosModal");
var carreraModal=document.getElementById("txtCarreraModal");
var telefonoModal=document.getElementById("txtTelefonoModal");
var emailModal=document.getElementById("txtEmailModal");

//añadir un esuchador al documento html
document.addEventListener("DOMContentLoaded", (event)=>{
    obtenerMensajes();
})
//añdir un escuchador al botón
boton.addEventListener("click",(e)=>{
    var mensaje={
        "nombre":nombre.value,
        "apellidos":apellidos.value,
        "carrera":carrera.value,
        "telefono":telefono.value,
        "email":email.value
    };
    var jsonString=JSON.stringify(mensaje);
    

    //POST
    fetch("https://alumnosutsh.000webhostapp.com/index.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/json; charset=UTF-8"
        },
        body:jsonString
    })
    .then((respuesta)=>{return respuesta.json()})
    .then((info)=>{console.log(info)})
    .catch((e)=>{console.error(e)})

    obtenerMensajes();
});
//get
function obtenerMensajes(){
    Tcuerpo.innerHTML="";
    fetch("https://alumnosutsh.000webhostapp.com/index.php",{
        method:"GET",
        headers:{
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    .then((respuesta)=>{return respuesta.json()})
    .then((datos)=>{
        console.log(datos);
        //recorrer el objeto Json
        Object.entries(datos).forEach(([key,value])=>{
            let  fila=document.createElement('tr');
            fila.innerHTML=`
                            <td>${value.nombre}</td>
                            <td>${value.apellidos}</td>
                            <td>${value.carrera}</td>
                            <td>${value.telefono}</td>
                            <td>${value.email}</td>
                            <td>
                            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#form-update"onclick="javascript:reescribirDatos('${value.nombre}','${value.apellidos}','${value.carrera}','${value.telefono}','${value.email}','${key}');"><i class="bi bi-pencil-fill"></i></button></td>
                            <td><button type="button" class="btn btn-danger" onclick="javascript:eliminarMensaje('${key}');"><i class="bi bi-trash-fill"></i></button></td>
                            `;
            Tcuerpo.appendChild(fila);

        });
        //ordenado
    })
    .catch ((err)=>{console.error(err)});
}

//DELETE
function eliminarMensaje(clave){
    fetch("https://alumnosutsh.000webhostapp.com/index.php"+clave+".json",{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json; charset=UTF-8"
        }
    })
    .then((res)=>{return res.json()})
    .then((datos)=>{console.log(datos)})
    .catch((err)=>{console.error(err)});
    //llamar obtener mensajes
    obtenerMensajes();
}

function reescribirDatos(nombre,apellidos,carrera,telefono,email,clv){
    nombreModal.value=nombre;
    apellidosModal.value=apellidos;
    carreraModal.value=carrera;
    telefonoModal.value=telefono;
    emailModal.value=email;
    key_update=clv;
}

actualizar.addEventListener("click",(e)=>{
    actualizarMensaje(key_update);
})

//PUT
function actualizarMensaje(clave){
    var mensaje={
        "nombre":nombreModal.value,
        "apellidos":apellidosModal.value,
        "carrera":carreraModal.value,
        "telefono":telefonoModal.value,
        "email":emailModal.value
    };
    var jsonString=JSON.stringify(mensaje);

    fetch("https://alumnosutsh.000webhostapp.com/index.php"+clave+".json",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json; charset=UTF-8"
        },
        body:jsonString

    })
    .then((res)=>{return res.json()})
    .then((datos)=>{console.log(datos)})
    .catch((err)=>{console.error(err)});    
    //llamar obtener mensajes
    obtenerMensajes();
}





/* estructura básica de fetch
function obtenerMensajes(){
    fetch("")
    .then(()=>{})
    .then(()=>{})
    .catch (()=>);
}
*/