document.addEventListener("DOMContentLoaded", function () {
    // Selecciona el formulario y el elemento donde mostrar el resultado
    var formulario = document.getElementById('formulario');
    var resultadoElemento = document.getElementById('resultado');

    // Agrega un evento de submit al formulario
    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de manera convencional

        // Obtiene los valores del formulario
        var nombre = document.getElementById('nombreDelJugador').value;
        var entrenamiento1 = parseInt(document.getElementById('entrenamiento1').value);
        var entrenamiento2 = parseInt(document.getElementById('entrenamiento2').value);
        var entrenamiento3 = parseInt(document.getElementById('entrenamiento3').value);

        // Verifica que los valores sean números válidos
        if (isNaN(entrenamiento1) || isNaN(entrenamiento2) || isNaN(entrenamiento3)) {
            alert('Por favor, ingresa números válidos para los entrenamientos.');
            return;
        }

        // Realiza el cálculo de los tres entrenamientos
        var resultado = (entrenamiento1 + entrenamiento2 + entrenamiento3) / 3;

        // Guarda el resultado en localStorage
        localStorage.setItem('resultadoNombre', nombre);
        localStorage.setItem('resultadoValor', resultado.toFixed(2));

        // Muestra el resultado en el elemento correspondiente
        resultadoElemento.innerHTML = '<h1>Resultado</h1>' +
        nombre + ': ' + resultado.toFixed(2);
    });
});



/* let puntajeJugadores = [];
const puntajeEntrenamientos = [];
var lastId = 0;

function calcularPromedio(array) {
    sum = 0;
    array.forEach((element) => {
        sum += element;
    });
    return sum / array.length;
}
function almacenarJugador(jugador) {
    localStorage.setItem("jugadores", JSON.stringify(puntajeJugadores));
}

function agregarJugador(nombreJugador, puntajeEntrenamientos) {
    let promedio = calcularPromedio(puntajeEntrenamientos);
    puntajeEntrenamientos.splice(0, puntajeEntrenamientos.length);


    let jugador = {
        id: "jugador-" + (puntajeJugadores.length + 1),
        nombre: nombreJugador,
        promedio: promedio,
    };

    puntajeJugadores.push(jugador);
    almacenarJugador(jugador);
}


function mostrarJugadores() {

    for (let i = 0; i < puntajeJugadores.length; i++) {

        if (!document.getElementById(puntajeJugadores[i].id)) {
            let li = document.createElement("li");
            li.id = puntajeJugadores[i].id;
            li.textContent = `${puntajeJugadores[i].nombre}: ${puntajeJugadores[i].promedio}` ;
            resultado.appendChild(li);
        }
    }

}

function submitJugador(event) {

    let nombreJugador = document.getElementById("nombreDelJugador").value;
    let entrenamiento1 = parseInt(document.getElementById("entrenamiento1").value);
    puntajeEntrenamientos.push(entrenamiento1);
    let entrenamiento2 = parseInt(document.getElementById("entrenamiento2").value);
    puntajeEntrenamientos.push(entrenamiento2);
    let entrenamiento3 = parseInt(document.getElementById("entrenamiento3").value);
    puntajeEntrenamientos.push(entrenamiento3);

    agregarJugador(nombreJugador, puntajeEntrenamientos);
    mostrarJugadores();
    event.preventDefault();
}

function getJugadoresFromLocalStorage() {
    if (localStorage.getItem('jugadores')) {
        puntajeJugadores = JSON.parse(localStorage.getItem('jugadores'));
    }
}

let formulario = document.getElementById("formulario");
let resultado = document.getElementById("resultado")

getJugadoresFromLocalStorage();
mostrarJugadores();
formulario.addEventListener("submit", submitJugador);
 */

/* ========================= */

document.addEventListener("DOMContentLoaded", function () {
    // Selecciona los elementos del DOM
    var btnAddCart = document.querySelectorAll(".btn-add-cart");
    var contadorProductos = document.getElementById("contador-productos");
    var cartIcon = document.querySelector(".container-cart-icon");
    var cartProducts = document.querySelector(".container-cart-products");
    var cartTotal = document.querySelector(".cart-total span");
    var cartEmpty = document.querySelector(".cart-empty");

    // Agrega un evento de clic a cada botón "Añadir al carrito"
    btnAddCart.forEach(function (btn) {
        btn.addEventListener("click", function () {
            // Obtiene la información del producto
            var productName = this.parentElement.querySelector("h2").textContent;
            var productPrice = parseFloat(this.parentElement.querySelector(".price").textContent.replace("$", ""));

            // Añade el producto al localStorage
            var cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({ name: productName, price: productPrice });
            localStorage.setItem("cart", JSON.stringify(cart));

            // Actualiza el contador de productos en el carrito
            actualizarContadorProductos();

            // Muestra el carrito
            mostrarCarrito();

            // Muestra la alerta de éxito
            showAlert("Producto añadido al carrito");
        });
    });

    // Agrega un evento de clic al icono del carrito para mostrar/ocultar el carrito
    cartIcon.addEventListener("click", function () {
        if (cartProducts.style.display === "none") {
            // Muestra el carrito si está oculto
            mostrarCarrito();
        } else {
            // Oculta el carrito si está visible
            ocultarCarrito();
        }
    });

    // Agrega un evento de clic a cada botón "X" en el carrito para eliminar un producto
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("img-remove")) {
            // Obtiene el índice del producto a eliminar
            var productIndex = event.target.getAttribute("data-index");

            // Elimina solo un producto del localStorage
            var cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.splice(productIndex, 1);
            localStorage.setItem("cart", JSON.stringify(cart));

            // Actualiza el contador de productos en el carrito
            actualizarContadorProductos();

            // Muestra el carrito
            mostrarCarrito();
        }
    });

    // Función para actualizar el contador de productos en el carrito
    function actualizarContadorProductos() {
        var cart = JSON.parse(localStorage.getItem("cart")) || [];
        contadorProductos.textContent = cart.length;
    }

    // Función para mostrar el carrito
    function mostrarCarrito() {
        var cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Muestra el carrito si hay productos
        if (cart.length > 0) {
            cartEmpty.style.display = "none";
            cartProducts.innerHTML = "";

            // Calcula el total del carrito
            var total = 0;
            cart.forEach(function (product, index) {
                total += product.price;

                // Crea elementos HTML para mostrar los productos en el carrito
                var productElement = document.createElement("div");
                productElement.classList.add("row-product");
                productElement.innerHTML = '<div class="cart-product">' +
                    '<div class="info-cart-product">' +
                    '<span class="cantidad-producto-carrito">1</span>' +
                    '<p class="titulo-producto-carrito">' + product.name + '</p>' +
                    '<span class="precio-producto-carrito">$' + product.price.toFixed(2) + '</span>' +
                    '</div>' +
                    '<img class="img-remove" data-index="' + index + '" src="/image/logos/logo-x.png" alt="x">' +
                    '</div>';
                cartProducts.appendChild(productElement);
            });

            // Muestra el total del carrito
            cartTotal.textContent = "$" + total.toFixed(2);

            // Muestra el carrito
            cartProducts.style.display = "block";
        } else {
            // Oculta el carrito si está vacío
            cartProducts.style.display = "none";
            cartTotal.parentNode.style.display = "none";
            cartEmpty.style.display = "block";
        }
    }

    // Función para ocultar el carrito
    function ocultarCarrito() {
        cartProducts.style.display = "none";
    }

    // Función para mostrar la alerta de éxito
    const showAlert = (message) => {
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: message,
            timer: 1500,
            showConfirmButton: false
        });
    };

    // Actualiza el carrito al cargar la página
    actualizarContadorProductos();
});
