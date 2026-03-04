function calcular() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const numEquipos = parseInt(document.querySelector('input[placeholder="Ej: 3"]').value) || 0;
    const diasInic = parseInt(document.querySelector('input[placeholder="Ej: 5"]').value) || 0;
    const diasAdd = parseInt(document.querySelector('input[placeholder="Ej: 2"]').value) || 0;
    const tipo = document.getElementById('tipo').value;

    if (!nombre || !email || numEquipos < 2 || diasInic < 1) {
        alert("Por favor, completa los campos correctamente (mínimo 2 equipos).");
        return;
    }

    const PRECIO_DIA = 50000;
    const costoBaseInic = (numEquipos * diasInic) * PRECIO_DIA;
    let costoBaseAdd = (numEquipos * diasAdd) * PRECIO_DIA;
    
    let detalleDescuento = "No aplica";
    let detalleRecargo = "No aplica";

    if (tipo === "establecimiento" && diasAdd > 0) {
        const descuento = costoBaseAdd * 0.05;
        costoBaseAdd -= descuento;
        detalleDescuento = "-$ " + descuento.toLocaleString();
    }

    let subtotal = costoBaseInic + costoBaseAdd;

    if (tipo === "fuera") {
        const recargo = subtotal * 0.05;
        subtotal += recargo;
        detalleRecargo = "+$ " + recargo.toLocaleString();
    }

    const formatoMoneda = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    });

    const divResultado = document.getElementById('resultado');
    
    divResultado.style.marginTop = "20px";
    divResultado.style.padding = "15px";
    divResultado.style.border = "2px dashed #4ca1af";
    divResultado.style.backgroundColor = "#fff";

    divResultado.innerHTML = `
        <h3 style="text-align: center; color: #2c3e50;">RESUMEN DE FACTURA</h3>
        <hr>
        <p><strong>Cliente:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Equipos:</strong> ${numEquipos}</p>
        <p><strong>Días totales:</strong> ${diasInic + diasAdd}</p>
        <hr>
        <p>Desc. Días Add (5%): <span style="color: green;">${detalleDescuento}</span></p>
        <p>Recargo Ciudad (5%): <span style="color: red;">${detalleRecargo}</span></p>
        <h2 style="text-align: center; color: #2c3e50;">TOTAL: ${formatoMoneda.format(subtotal)}</h2>
    `;
}