function calcular() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const numEquipos = parseInt(document.querySelector('input[placeholder="Ej: 3"]').value);
    const diasIniciales = parseInt(document.querySelector('input[placeholder="Ej: 5"]').value);
    const diasAdicionales = parseInt(document.querySelector('input[placeholder="Ej: 2"]').value) || 0;
    const tipoAlquiler = document.getElementById('tipo').value;

    if (!nombre || !email || isNaN(numEquipos) || isNaN(diasIniciales)) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    const precioPorDia = 50000; // Precio por equipo al día
    const totalDias = diasIniciales + diasAdicionales;
    
    let subtotal = (numEquipos * totalDias) * precioPorDia;
    let ajuste = 0;
    let mensajeAjuste = "Ninguno";

    if (tipoAlquiler === "fuera") {
        ajuste = subtotal * 0.05; // +5%
        subtotal += ajuste;
        mensajeAjuste = "Recargo fuera de ciudad (+5%)";
    } else if (tipoAlquiler === "establecimiento") {
        ajuste = subtotal * 0.05; // -5%
        subtotal -= ajuste;
        mensajeAjuste = "Descuento en establecimiento (-5%)";
    }

    const formatoMoneda = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    });

    const factura = `
        --- FACTURA ALQUIPC ---
        Cliente: ${nombre}
        Correo: ${email}
        -----------------------
        Cant. Equipos: ${numEquipos}
        Días Totales: ${totalDias} (${diasIniciales} iniciales + ${diasAdicionales} extra)
        
        Ajuste: ${mensajeAjuste}
        TOTAL A PAGAR: ${formatoMoneda.format(subtotal)}
        -----------------------
        ¡Gracias por su confianza!
    `;

    alert(factura);
}