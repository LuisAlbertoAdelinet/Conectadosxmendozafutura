// Estado de navegación
let currentChapter = null;
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
let navigationHistory = JSON.parse(localStorage.getItem('navigationHistory')) || [];

// Funciones de navegación
function navigateTo(chapter) {
  currentChapter = chapter;
  updateNavigationHistory(chapter);
  updateBookmarks();
  updateChapter(chapter);
}

function updateNavigationHistory(chapter) {
  navigationHistory.push(chapter);
  if (navigationHistory.length > 10) { // Mantener solo los últimos 10 registros
    navigationHistory.shift();
  }
  localStorage.setItem('navigationHistory', JSON.stringify(navigationHistory));
}

function updateBookmarks() {
  const bookmarkBtn = document.getElementById('bookmarkBtn');
  if (bookmarkBtn) {
    bookmarkBtn.classList.toggle('text-yellow-500', bookmarks.includes(currentChapter));
  }
}

function toggleBookmark() {
  if (bookmarks.includes(currentChapter)) {
    bookmarks = bookmarks.filter(ch => ch !== currentChapter);
  } else {
    bookmarks.push(currentChapter);
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  updateBookmarks();
}

// Atajos de teclado
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'ArrowLeft') {
    // Navegar al capítulo anterior
    const history = [...navigationHistory];
    const currentIndex = history.lastIndexOf(currentChapter);
    if (currentIndex > 0) {
      navigateTo(history[currentIndex - 1]);
    }
  } else if (e.ctrlKey && e.key === 'ArrowRight') {
    // Navegar al siguiente capítulo
    const history = [...navigationHistory];
    const currentIndex = history.lastIndexOf(currentChapter);
    if (currentIndex < history.length - 1) {
      navigateTo(history[currentIndex + 1]);
    }
  } else if (e.ctrlKey && e.key === 'b') {
    // Mostrar marcadores
    showBookmarks();
  }
});

// Mostrar marcadores
function showBookmarks() {
  const bookmarksModal = document.createElement('div');
  bookmarksModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'bg-white p-6 rounded-lg shadow-lg max-w-md w-full';
  
  const title = document.createElement('h2');
  title.className = 'text-xl font-bold mb-4';
  title.textContent = 'Mis Marcadores';
  
  const bookmarksList = document.createElement('div');
  bookmarksList.className = 'space-y-2';
  
  bookmarks.forEach(chapter => {
    const bookmarkItem = document.createElement('a');
    bookmarkItem.className = 'block p-2 hover:bg-gray-100 rounded';
    bookmarkItem.href = chapter.url;
    bookmarkItem.textContent = chapter.title;
    bookmarksList.appendChild(bookmarkItem);
  });
  
  const closeButton = document.createElement('button');
  closeButton.className = 'mt-4 w-full bg-gray-200 hover:bg-gray-300 p-2 rounded';
  closeButton.textContent = 'Cerrar';
  closeButton.onclick = () => bookmarksModal.remove();
  
  modalContent.appendChild(title);
  modalContent.appendChild(bookmarksList);
  modalContent.appendChild(closeButton);
  bookmarksModal.appendChild(modalContent);
  document.body.appendChild(bookmarksModal);
}

// Exportar funciones para usar en otros archivos
window.navigateTo = navigateTo;
window.toggleBookmark = toggleBookmark;
