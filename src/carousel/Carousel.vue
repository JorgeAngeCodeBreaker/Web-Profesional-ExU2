<template>
  <div class="container d-flex justify-content-center">
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" style="width: 600px;">
      <div class="carousel-inner">
        <div v-for="(libro, index) in libros" :key="libro.id" :class="['carousel-item', { 'active': index === currentIndex }]">

          <img :src="libro.imagen" class="d-block w-100" :alt="libro.nombre" style="max-height: 300px;">

          <div class="carousel-caption d-none d-md-block">

            <h5 class="nombre">{{ libro.nombre }}</h5>
            <p class="autor">{{ libro.autor }}</p>
            <p class="createdAt">{{ libro.createdAt }}</p>


          </div>
        </div>
      </div>
      <a class="carousel-control-prev" role="button" @click="prevSlide">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Anterior</span>
      </a>
      <a class="carousel-control-next" role="button" @click="nextSlide">
        <span class="sr-only">Siguiente</span>
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      libros: [],
      currentIndex: 0
    };
  },
  created() {
    this.fetchLibros();
    setInterval(this.nextSlide, 3000);
  },
  methods: {
    fetchLibros() {
      axios.get('http://localhost:8080/api/libros/')
        .then(response => {
          this.libros = response.data;
        })
        .catch(error => {
          console.error('Error fetching libros:', error);
        });
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.libros.length) % this.libros.length;
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.libros.length;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();


      
    }
  }
};
</script>

<style scoped>
.carousel-item {
  display: none;
}
.carousel-item.active {
  display: block;
}

.nombre {
  color: white;
  
}

.autor {
  color: white;
}

.createdAt {
  color: white;
}

.sr-only{
color:white;
}



</style>
