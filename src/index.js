let turnos = 0;
let $primerCarta = null;
let tiempo = 0;
let puntaje = 0;
let jugando = true;

const $INTERFAZ = document.querySelector("#interfaz");
const $TABLERO = document.querySelector("#tablero");
const $CARTAS = $TABLERO.querySelectorAll(".carta");
const $BOTON = $INTERFAZ.querySelector(".btn");
const $TEMPORIZADOR = $INTERFAZ.querySelector("#temporizador");
const $PUNTAJE = $INTERFAZ.querySelector("#puntaje");
const $FINJUEGO = document.querySelector(".fin-juego");

function prepararJuego() {
    const memes = ["harold", "conan", "pikachu", "cat", "isfine", "atrap"];
    const memesx2 = memes.concat(memes);
    randomizarCartas($CARTAS, memesx2);
    actualizarTurnos(turnos);
    bloquearInput($TABLERO);
};

function comenzarJuego() {
    desbloquearInput($TABLERO);
    iniciarTemporizador(true);
    $BOTON.onclick = "";
};

function iniciarTemporizador() {
    if (jugando) {
        setTimeout(function() {
            tiempo ++;
            $TEMPORIZADOR.textContent = "Tiempo: " + tiempo + " segundos";
            iniciarTemporizador();
        }, 1000)  
    }else{
        return;
    }
};

function calcularPuntaje() {
    puntaje = 5000 - ((tiempo * 50) + (turnos * 200));
    $PUNTAJE.textContent = "Puntaje: " + puntaje;
};

function bloquearInput($TABLERO) {
    $TABLERO.onclick = function () {}
};

function desbloquearInput($TABLERO) {
    $TABLERO.onclick = function(evento) {
        const $elemento = evento.target;
        if ($elemento.classList.contains("carta")) {
            manejarClickCarta($elemento);
        }
    }
}

function randomizarCartas(cartas, memes) {
    const memesRandom = memes.sort(function() {
        return 0.5 - Math.random();
      });
    
    memesRandom.forEach(function(meme, i) {
        cartas[i].classList.add(meme);
    });
}

function manejarClickCarta($cartaActual) {
    mostrarCarta($cartaActual);

    if ($primerCarta === null) {
        $primerCarta = $cartaActual
    }else {

        if ($primerCarta === $cartaActual) {
            return;
        }

        turnos ++;
        actualizarTurnos(turnos);
        calcularPuntaje();

        if (cartasIguales($primerCarta, $cartaActual)) {
            eliminarCarta($primerCarta);
            eliminarCarta($cartaActual);
        }else{
            ocultarCarta($primerCarta);
            ocultarCarta($cartaActual);
        }
        $primerCarta = null;
    }
};

function mostrarCarta($carta) {
    $carta.classList.remove("reverso");
};

function ocultarCarta($carta) {
    setTimeout(function() {
        $carta.classList.add("reverso"); 
    }, 500);
};

function eliminarCarta($carta) {
    setTimeout(function() {
        $carta.remove();
        evaluarFinDeJuego();
    }, 500);
}

function cartasIguales(cuadro1, cuadro2) {
    return cuadro1.className === cuadro2.className;
}

function actualizarTurnos(turnos) {
    $INTERFAZ.querySelector("#turnos").textContent = "Turnos: " + turnos;
}

function evaluarFinDeJuego() {
    if ($TABLERO.querySelectorAll(".carta").length === 0) {
        jugando = false;
        $FINJUEGO.classList.remove("oculto");
        $FINJUEGO.querySelector(".card-text").textContent = `Finalizaste en ${turnos} turnos y ${tiempo} segundos. Tu puntaje es ${puntaje}`;
        $TABLERO.classList.add("oculto");
    }
}

prepararJuego();
$BOTON.onclick = comenzarJuego;