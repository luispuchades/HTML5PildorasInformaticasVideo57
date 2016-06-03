/*global window */
/*global alert */
/*jslint browser: true, for:true */

//JavaScript Document

/**Curso: HMTL5 - Pildoras Informáticas - API File IV
 * Origin: Capitulo57.html ==> Leyendo archivos
 */

// "use strict";

//1. Definición de Objetos y Variables
var zonaDatos;
var botonAceptar;
var nombreArchivo;
var espacio;
var ruta;

//1.1 Extracción de elementos desde HTML
zonaDatos = document.getElementById("zona-datos");
botonAceptar = document.getElementById("boton");
nombreArchivo = document.getElementById("entrada").value;

//function mostrarEnWeb(e) {
//    'use strict';
//
//// Le pasamos el objeto que desencadena el envento en el momento en el que
//// ocurre el evento. En este caso, la "e" esta haciendo referencia al lector.
//    var resultado;
//
//// Asignamos a la variable resultado, el resultado del objeto lector con result
//// OJO >> EJECUTA CODIGO HTML. NO SOLO MUESTRA TEXTO.
//    resultado = e.target.result;
//
//    zonaDatos.innerHTML += "<img src='" + resultado + "' width = '100%'>";
//}


//function crearArchivo() {
//    'use strict';
//
//    var archivos;
//    var miArchivo;
//    var lector;
//
//// Vaciamos la zonaDatos
//    zonaDatos.innerHTML = "";
//
//
//
//// Almacenamos en una matriz bajo la variable archivos todos los archivos
//// que capturamos con el objeto e al desencadenar el evento archivos
//// y aplicarle la propiedad files, que registra todos los archivos como matriz.
//    archivos = e.target.files;
//    miArchivo = archivos[0];
//
//// Detectamos si el archivo seleccionado con la propiedad type
//    if(!miArchivo.type.match(/image/)) {
//
//        alert("Selecciona una imagen, por favor");
//    }
//    else {
//        zonaDatos.innerHTML += "Nombre del archivo: " + miArchivo.name + "<br />";
//        zonaDatos.innerHTML += "Tamaño del archivo: " + Math.round((miArchivo.size)/1024) + " Kb" + "<br />";
//    }

// Creamos el lector:
// Necesitamos un lector para poder leer la información que nos devuelven
// los métodos del objeto devuelto
    lector = new FileReader();

// El lector lee el archivo seleccionado. Seleccionamos la url del archivo
    lector.readAsDataURL(miArchivo);

// Ponemos el lector a la escucha. Cuando cargue el lector, asignaremos
// una función para que muestre el contenido del archivo.
    lector.addEventListener("load", mostrarEnWeb, false);

function errores (e) {
    'use strict';

    alert("Ha habido un error" + e.code);
}


}

function mostrar() {
    'use strict';


}

function crearSys(system) {
    'use strict';

    espacio = system.root;
    ruta = "";
    mostrar();
}

//function errores (error) {
//    'use strict';
//
//    alert("Ha habido un error: " + error.code);
//}


function accesoEspacio() {
    'use strict';

//Indicamos que requerimos un espacio permanente (persistente)
    window.webkitRequestFileSystem(PERSISTENT, 5*1024*1024, crearSys, errores);
    window.mozRequestFileSystem(PERSISTENT, 5*1024*1024, crearSys, errores);
}

function listar(archivos) {
    'use strict';

    for (i = 0; i < archivos.length; i = 1 + 1) {
        if(archivos[i].isFile) {
            zonaDatos.innerHTML += archivos[i].name + "<br />";
        }
        else if (archivos[i].isDirectory) {
            zonaDatos.innerHTML += "<span class = 'directorio'>" + archivos[i].name + "</span><br />";
        }
    }
}

function leer() {
    'use strict';

    lector.readEntries(function(archivos) {
        if (archivos.length) {
            listar(archivos);
        }
    }, errores);
}

function leerDirectorio(directorio) {
    'use strict';

    var lector;


// Creamos el lector. y le asignamos el createReader del objeto directorio que nos pasa la función gerDirectory
    lector = directorio.createReader();
// Leemos las entradas del directorio creado
    leer();
}

function mostrarArchivo(entrada) {
    'use strict';

    document.getElementById("entrada").value = "";
    zonaDatos.innerHTML = "";

/**
 * Abrimos el directorio donde nos encontramos (espacio = system.root;)
 *Ojo con el null, que se utiliza si ya se han creado directorios
 *Si no, tendremos que usar {create: true, exclusive: false}
 */

    espacio.getDirectory(ruta, null, leerDirectorio, errores);

    zonaDatos.innerHTML = "Éxito en la creación de espacio y archivo!" + "<br />";
    zonaDatos.innerHTML += "Nombre: " + entrada.name + "<br />";
    zonaDatos.innerHTML += "Ruta: " + entrada.fullpath + "<br />";
}


function crearArchivo() {
    'use strict';

// Si se propone un nombre de archivo, entonces si crea con getFile
// siempre que no exista otro anterior o con el mismo nombre.
    if (nombreArchivo != "") {

        nombreArchivo = ruta + nombreArchivo;

        espacio.getFile(nombreArchivo, {create: true, exclusive: false}, mostrarArchivo, errores)
// Si sustituimos getFile() por getDirectory, lo que creamos es un directorio
//        espacio.getdirectory(nombreArchivo, {create: true, exclusive: false}, mostrarArchivo, errores)
    }
}


function comenzar() {
    'use strict';

    botonAceptar.addEventListener("click", crearArchivo, false);

/**
 * Determinamos si el espacio debe ser temporal o permanente
 * Aun no es estandard y hay que usar prefijos de navegador (webkit, moz y ms)
 * Pedimos permiso al navegador para acceder a nuestro disco duro
 * Reservamos con requestQuota 5MB = (5 * 1024 bits/KB *...
 * ... * 1024 KB/MB)
 */

    navigator.webkitPersistentStorage.requestQuota(5*1024*1024, accesoEspacio)
    navigator.mozPersistentStorage.requestQuota(5*1024*1024, accesoEspacio)
}




//3. Asignación de Eventos
document.addEventListener("DOMContentLoaded", comenzar, false);
