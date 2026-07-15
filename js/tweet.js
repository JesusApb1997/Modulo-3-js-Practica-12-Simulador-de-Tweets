//declarar los selectores
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
//esctructura para almacenar los tweets
let tweets = [];

//event listeners

eventListeners();
//agregando las funciones de localstorage
function eventListeners(){
    //cuando el usuario agrega un nuevo tweet
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    });
    //escuchador del formulario
    formulario.addEventListener('submit', agregarTweet);
}


function agregarTweet(e) {
    e.preventDefault();

    const tweet = document.querySelector('#tweet').value;
    //console.log(tweet)

    //validacion
    if (tweet === '') {
        //console.log('el campo esta vacio')
        mostrarError('El tweet no puede estar vacio')
        return
    } else {

        //crear objeto
        const tweetObj = {
            tweet: tweet,
            id: Date.now()
        }
        tweets = [...tweets, tweetObj]
        console.log(tweets)

        crearHTML();
        formulario.reset();

    }


}

//mostrar un error al usuario en pantalla
function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error');
    //insertar el mensaje de error
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //eliminar la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove()
    }, 3000)

}

function crearHTML() {
    //console.log('ingrese a la funcion crearhtml')
    limpiarHTML();

    //mostrar toda la informacion guardada en el arreglo de tweets

    if (tweets.length > 0) {
        //si al menos hay un tweet guardado en el arreglo
        //crear y mostrar ese html en la interfaz

        //recorrer el arreglo
        tweets.forEach(tweet => {
            const li = document.createElement('li');
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.innerText = 'X';

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            li.innerText = tweet.tweet;
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li)
        })
    }
}

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

function borrarTweet(id) {
    //console.log('ingrese a borrar')
    tweets = tweets.filter(tweet => tweet.id !== id);
    console.log(tweets)
    crearHTML();
}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

