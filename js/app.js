const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e) {
    e.preventDefault();
    
    // validar segun la api
    const cuidad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(cuidad === '' || pais === '') {
        // hubo un error
        mostrarError('Ambos campos son obligatorios')
        return;
    }

    // si la validacion esta ok consultar la api
    consultarAPI(cuidad, pais);

}

function mostrarError(message) {
    // console.log(message);
    const alerta = document.querySelector('.bg-red-100');

    // crear una alert
    if(!alerta){
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${message}</span>
        `;
        container.appendChild(alerta);

        // eliminar la alerta despues de 3 segundos
        setTimeout( () => {
            alerta.remove()
        }, 3000);
    }
}

function consultarAPI(cuidad, pais) {
    const apiKey = 'f6732347d586fa08911f87af1cfb09cc';
    const basicURL = `https://api.openweathermap.org/data/2.5/weather?q=${cuidad},${pais}&appid=${apiKey}`;

    // mostrar el spinner de carga
    spinner();

    // console.log(basicURL);
    fetch(basicURL)
    .then( respuesta => respuesta.json())
    .then( dato => {
        // limpiar el html
        limpiarHTML();
        // console.log(dato);
        if(dato.cod === "404") {
            mostrarError('Ciudad no encontrada');
            return;
        } 

        // mostrar la respuesta en el HTML
        mostrarClima(dato);
    })
}

function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos;

    const centigrados = kelvinACentigrados(temp);
    const minima = kelvinACentigrados(temp_min);
    const maxima = kelvinACentigrados(temp_max);

    const nombre = document.createElement('p');
    nombre.textContent = `Clima en ${name}`;
    nombre.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `Temperatura actual: ${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const max = document.createElement('p');
    max.innerHTML = `Máxima: ${maxima} &#8451;`;
    max.classList.add('text-xl');

    const min = document.createElement('p');
    min.innerHTML = `Mínima: ${minima} &#8451;`;
    min.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombre);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(max);
    resultadoDiv.appendChild(min);

    resultado.appendChild(resultadoDiv);

    // resetear el formulario
    formulario.reset();
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

/*
function kelvinACentigrados(grados) {
    return parseInt(grados - 273.15);
}
*/
const kelvinACentigrados = grados => parseInt(grados - 273.15);

function spinner() {
    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}