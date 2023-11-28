document.addEventListener("DOMContentLoaded", function () {

    var formulario = document.getElementById('formulario');
    var resultadoElemento = document.getElementById('resultado');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        var nombre = document.getElementById('nombreDelJugador').value;
        var entrenamiento1 = parseInt(document.getElementById('entrenamiento1').value);
        var entrenamiento2 = parseInt(document.getElementById('entrenamiento2').value);
        var entrenamiento3 = parseInt(document.getElementById('entrenamiento3').value);

        if (isNaN(entrenamiento1) || isNaN(entrenamiento2) || isNaN(entrenamiento3)) {
            alert('Por favor, ingresa números válidos para los entrenamientos.');
            return;
        }

        var resultado = (entrenamiento1 + entrenamiento2 + entrenamiento3) / 3;

        localStorage.setItem('resultadoNombre', nombre);
        localStorage.setItem('resultadoValor', resultado.toFixed(2));

        resultadoElemento.innerHTML = '<h1>Resultado</h1>' +
        nombre + ': ' + resultado.toFixed(2);
    });
});

/* ========================= */

document.addEventListener("DOMContentLoaded", function () {
    var btnAddCart = document.querySelectorAll(".btn-add-cart");
    var contadorProductos = document.getElementById("contador-productos");
    var cartIcon = document.querySelector(".container-cart-icon");
    var cartProducts = document.querySelector(".container-cart-products");
    var cartTotal = document.querySelector(".cart-total span");
    var cartEmpty = document.querySelector(".cart-empty");

    btnAddCart.forEach(function (btn) {
        btn.addEventListener("click", function () {
            // Obtiene la información del producto
            var productName = this.parentElement.querySelector("h2").textContent;
            var productPrice = parseFloat(this.parentElement.querySelector(".price").textContent.replace("$", ""));

            var cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({ name: productName, price: productPrice });
            localStorage.setItem("cart", JSON.stringify(cart));

            actualizarContadorProductos();

            mostrarCarrito();

            showAlert("Producto añadido al carrito");
        });
    });

    cartIcon.addEventListener("click", function () {
        if (cartProducts.style.display === "none") {
            mostrarCarrito();
        } else {
            ocultarCarrito();
        }
    });

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("img-remove")) {
            var productIndex = event.target.getAttribute("data-index");

            var cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.splice(productIndex, 1);
            localStorage.setItem("cart", JSON.stringify(cart));

            actualizarContadorProductos();

            mostrarCarrito();
        }
    });

    function actualizarContadorProductos() {
        var cart = JSON.parse(localStorage.getItem("cart")) || [];
        contadorProductos.textContent = cart.length;
    }

    function mostrarCarrito() {
        var cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length > 0) {
            cartEmpty.style.display = "none";
            cartProducts.innerHTML = "";

            var total = 0;
            cart.forEach(function (product, index) {
                total += product.price;

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

            cartTotal.textContent = "$" + total.toFixed(2);

            cartProducts.style.display = "block";
        } else {
            cartProducts.style.display = "none";
            cartTotal.parentNode.style.display = "none";
            cartEmpty.style.display = "block";
        }
    }

    function ocultarCarrito() {
        cartProducts.style.display = "none";
    }

    const showAlert = (message) => {
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: message,
            timer: 1500,
            showConfirmButton: false
        });
    };

    actualizarContadorProductos();
});
