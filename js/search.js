// Función para inicializar la búsqueda
function initSearch() {
  // Verificar si estamos en la página principal
  if (window.location.pathname.endsWith('index.html')) {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    // Cargar índice de búsqueda
    fetch('./data/search-index.json')
      .then(response => response.json())
      .then(data => {
        const searchIndex = data.topics;
        
        // Manejar la búsqueda
        searchInput.addEventListener('input', (e) => {
          const searchTerm = e.target.value.toLowerCase();
          if (searchTerm.length < 2) {
            clearResults();
            return;
          }

          // Filtrar resultados con peso para títulos y palabras clave
          const results = searchIndex.filter(item => 
            item.title.toLowerCase().includes(searchTerm) ||
            item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm)) ||
            item.description.toLowerCase().includes(searchTerm)
          ).sort((a, b) => {
            // Priorizar por coincidencia en el título
            const titleMatchA = a.title.toLowerCase().includes(searchTerm);
            const titleMatchB = b.title.toLowerCase().includes(searchTerm);
            if (titleMatchA && !titleMatchB) return -1;
            if (!titleMatchA && titleMatchB) return 1;
            return 0;
          });

          displaySearchResults(results);
        });
      });
  }
}

// Función para mostrar resultados de búsqueda
function displaySearchResults(results) {
  const resultsContainer = document.createElement('div');
  resultsContainer.className = 'fixed top-16 right-4 w-96 bg-white p-4 rounded-lg shadow-lg z-50';
  
  if (results.length > 0) {
    resultsContainer.innerHTML = `
      <div class="space-y-2">
        ${results.map(result => `
          <a href="${result.url}" class="block p-2 hover:bg-gray-100 rounded transition-colors">
            <div class="font-semibold">${result.title}</div>
            <div class="text-sm text-gray-600">${result.description}</div>
          </a>
        `).join('')}
      </div>
    `;
  } else {
    resultsContainer.innerHTML = `
      <div class="text-center py-4 text-gray-500">
        <p>No se encontraron resultados</p>
        <p class="text-xs text-gray-400">Prueba con términos más específicos</p>
      </div>
    `;
  }

  // Eliminar resultados anteriores si existen
  const existingResults = document.querySelector('.search-results');
  if (existingResults) {
    existingResults.remove();
  }

  resultsContainer.className += ' search-results';
  document.body.appendChild(resultsContainer);
}

// Función para limpiar resultados
function clearResults() {
  const resultsContainer = document.querySelector('.search-results');
  if (resultsContainer) {
    resultsContainer.remove();
  }
}

// Inicializar búsqueda cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initSearch);
