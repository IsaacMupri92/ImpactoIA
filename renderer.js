// Renderer process script
console.log('ImpactoIA - Renderer process loaded');

// Listener para cuando se muestra la sección "Acerca de"
if (window.electronAPI) {
  window.electronAPI.onShowAbout(() => {
    console.log('Showing about section');
  });
}

// Agregar animación a los elementos cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.card');
  if (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100);
  }
});
