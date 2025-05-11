document.addEventListener('astro:page-load', () => {
    const carousel = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const carouselContainer = document.querySelector('.carousel-container');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Función para ajustar el contenedor del carrusel al tamaño de la imagen actual
    function adjustCarouselHeight() {
      // Permitir que el tamaño se ajuste a la imagen actual
      const currentImage = slides[currentIndex].querySelector('img');
      if (currentImage.complete) {
        updateSize();
      } else {
        currentImage.onload = updateSize;
      }
      
      function updateSize() {
        // Establecer la altura del contenedor para que coincida con la imagen
        carouselContainer.style.height = 'auto';
      }
    }
    
    // Función para mostrar una diapositiva específica
    function goToSlide(index) {
      if (index < 0) {
        currentIndex = slideCount - 1;
      } else if (index >= slideCount) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
      
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Actualizar indicadores
      indicators.forEach((indicator, i) => {
        if (i === currentIndex) {
          indicator.classList.add('bg-opacity-100');
        } else {
          indicator.classList.remove('bg-opacity-100');
        }
      });
      
      // Ajustar la altura del carrusel para la imagen actual
      adjustCarouselHeight();
    }
    
    // Event listeners para los botones
    prevButton.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });
    
    nextButton.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });
    
    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        goToSlide(index);
      });
    });
    
    // Auto rotación cada 5 segundos
    let interval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
    
    // Detener la rotación automática al pasar el mouse
    carouselContainer.addEventListener('mouseenter', () => {
      clearInterval(interval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
      interval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 5000);
    });
    
    // También ajustar cuando cambia el tamaño de la ventana
    window.addEventListener('resize', adjustCarouselHeight);
    
    // Inicializar
    goToSlide(0);
    
    // Asegurarse de que todas las imágenes estén cargadas
    slides.forEach(slide => {
      const img = slide.querySelector('img');
      if (img) {
        img.onload = adjustCarouselHeight;
        // Si ya está cargada, ajustar de todos modos
        if (img.complete) {
          adjustCarouselHeight();
        }
      }
    });
  });