/**
 * Configuración comercial - Nina's Scoops
 */
const CONFIG = {
  whatsappNumber: "593988241141", // Código de país + número
  defaultPrice: 8.00
};

/**
 * Actualiza el precio total dinámicamente según la opción seleccionada
 */
function calcularTotal() {
  const selected = document.querySelector('input[name="scoop_tier"]:checked');
  const price = selected ? parseFloat(selected.dataset.price) : CONFIG.defaultPrice;
  const priceDisplay = document.getElementById('total-price');
  
  if (priceDisplay) {
    priceDisplay.innerText = `$${price.toFixed(2)}`;
  }
}

/**
 * Recopila los datos del configurador y abre el chat de WhatsApp con el mensaje estructurado
 */
function enviarPedido() {
  const scoopSelected = document.querySelector('input[name="scoop_tier"]:checked');
  const scoopName = scoopSelected ? scoopSelected.value : "No especificado";
  const scoopPrice = scoopSelected ? scoopSelected.dataset.price : "0.00";
  
  const usernameInput = document.getElementById('username');
  const user = usernameInput && usernameInput.value.trim() !== '' ? usernameInput.value.trim() : 'No especificado';
  
  const recordCheckbox = document.getElementById('record-video');
  const recordVideo = recordCheckbox && recordCheckbox.checked 
    ? 'Sí, ¡grábenlo y etiquétenme en redes!' 
    : 'No, empaque privado';

  const notesInput = document.getElementById('notes');
  const notes = notesInput && notesInput.value.trim() !== '' ? notesInput.value.trim() : 'Sin notas adicionales';

  const mensaje = 
`*¡Nuevo Pedido en Nina's scoops!* 
-------------------------------------
 *Scoop elegido:* ${scoopName}
 *Total:* $${scoopPrice}
 *Usuario / Nombre:* ${user}
 *¿Grabar video?:* ${recordVideo}
 *Preferencias:* ${notes}
 *Envío:* Servientrega ($5 Local / $7 Nacional / Galápagos a cotizar)
-------------------------------------
¿Me confirman los datos bancarios para el pago y coordinar el envío? ¡Gracias! ✨`;

  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  calcularTotal();
});