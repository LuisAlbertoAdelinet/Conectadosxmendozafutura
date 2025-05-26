// Función para mostrar un capítulo específico
function showChapter(chapterNumber) {
  // Ocultar todos los capítulos
  const chapters = document.querySelectorAll('.chapter');
  chapters.forEach(chapter => {
    chapter.classList.add('hidden');
  });

  // Mostrar el capítulo seleccionado
  const chapterToShow = document.getElementById(`chapter${chapterNumber}`);
  if (chapterToShow) {
    chapterToShow.classList.remove('hidden');
  }

  // Actualizar el marcador de capítulo actual
  const buttons = document.querySelectorAll('.chapter-button');
  buttons.forEach(button => {
    button.classList.remove('text-blue-600');
    button.classList.add('text-gray-600');
  });
  
  const currentButton = document.getElementById(`btn-cap${chapterNumber}`);
  if (currentButton) {
    currentButton.classList.remove('text-gray-600');
    currentButton.classList.add('text-blue-600');
  }
}

// Función para mostrar un capítulo específico desde el selector móvil
function showChapterMobile(chapterNumber) {
  showChapter(chapterNumber);
}

// Inicializar el capítulo 1 por defecto
document.addEventListener('DOMContentLoaded', () => {
  showChapter(1);
});
