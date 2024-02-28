<template>
  <div>
    <div class="container d-flex justify-content-center">
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" style="width: 600px;"
        v-show="showElement">
        <div class="carousel-inner">
          <div v-for="(libro, index) in libros" :key="libro.id"
            :class="['carousel-item', { 'active': index === currentIndex }]">

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
    <div>
      <b-container>
        <b-row class="mt-3 mb-3">
          <b-col>
            <b-button variant="primary" @click="fetchBydate">
              Ordenar por fechas
            </b-button>
          </b-col>
          <b-col>
            <b-button variant="primary" @click="fetchByAuthor">
              Ordenar por autor
            </b-button>
          </b-col>
          <b-col>
            <b-button variant="primary" @click="fetchByImage">
              Ordenar por imagen
            </b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col>

            <div id="app" class="container">
              <div class="mb-3">
                <button class="btn btn-success" @click="mostrarModal('agregar')">
                  <i class="fas fa-plus"></i> Agregar
                </button>
              </div>

              <div class="row">
                <div class="col-md-4 mb-3" v-for="(libro) in libros" :key="libro.id" draggable="true"
                  @dragstart="manejarInicioArrastre($event, libro)">
                  <div class="card">
                    <img :src="libro.imagen || 'https://via.placeholder.com/150'" class="card-img-top"
                      alt="Portada del libro" />

                    <div class="card-body">
                      <h5 class="card-title">{{ libro.nombre }}</h5>
                      <p class="card-text">Autor: {{ libro.autor }}</p>
                      <p class="card-text">
                        Publicación: {{ libro.createdAt || "Desconocida" }}
                      </p>
                      <button class="btn btn-primary" @click="mostrarModal('editar', libro)">
                        <i class="fas fa-edit"></i> Editar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="delete-zone" @dragover.prevent @drop="manejarSoltar">
                Arrastra aquí para eliminar
              </div>

              <b-modal ref="modalAgregar" title="Agregar nuevo libro" ok-title="Agregar" @ok="agregarLibro">
                <b-form @submit.prevent="agregarLibro">
                  <b-form-group label="Nombre del libro:" label-for="nombre-input">
                    <b-form-input id="nombre-input" v-model="libroActual.nombre" required></b-form-input>
                  </b-form-group>
                  <b-form-group label="Autor:" label-for="autor-input">
                    <b-form-input id="autor-input" v-model="libroActual.autor" required></b-form-input>
                  </b-form-group>

                  <b-form-group label="Imagen del libro:" label-for="imagen-file-input">
                    <b-form-file id="imagen-file-input" @change="convertirImagenABase64($event, false)"></b-form-file>
                  </b-form-group>
                </b-form>
              </b-modal>

              <b-modal ref="modalEditar" title="Editar libro" ok-title="Guardar cambios"
                @ok="editarLibro(libroActual.id, false)">
                <b-form @submit.prevent="editarLibro(libroActual.id, false)">
                  <b-form-group label="Nombre del libro:" label-for="nombre-edit-input">
                    <b-form-input id="nombre-edit-input" v-model="libroActual.nombre" required></b-form-input>
                  </b-form-group>
                  <b-form-group label="Autor:" label-for="autor-edit-input">
                    <b-form-input id="autor-edit-input" v-model="libroActual.autor" required></b-form-input>
                  </b-form-group>
                  <b-form-group label="Fecha de Publicación:" label-for="publicacion-edit-input">
                    <b-form-input id="publicacion-edit-input" v-model="libroActual.createdAt"
                      type="date"></b-form-input>
                  </b-form-group>
                  <b-form-group label="Imagen del libro:" label-for="imagen-edit-file-input">
                    <b-form-file id="imagen-edit-file-input" @change="convertirImagenABase64($event, true)"></b-form-file>
                  </b-form-group>
                </b-form>
              </b-modal>
            </div>
          </b-col>
        </b-row>
      </b-container>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      libros: [],
      currentIndex: 0,
      showElement: true,

      lastScrollPosition: 0,
      libroArrastrado: null,
      libroActual: {
        id: null,
        nombre: "",
        autor: "",
        imagen: "",
      },
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
    fetchBydate() {
      axios.get('http://localhost:8080/api/libros/PublishDate')
        .then(response => {
          this.libros = response.data;
        })
        .catch(error => {
          console.error('Error fetching libros:', error);
        });
    },
    fetchByAuthor() {
      axios.get('http://localhost:8080/api/libros/autor')
        .then(response => {
          this.libros = response.data;
        })
        .catch(error => {
          console.error('Error fetching libros:', error);
        });
    },
    fetchByImage() {
      axios.get('http://localhost:8080/api/libros/imagen')
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
    },
    onScroll() {


      //hide the carousel when scrolling down over 500px
      if (window.scrollY > 500) {
        this.showElement = false;
      } else {
        this.showElement = true;
      }

    },
    convertirImagenABase64(event, esEdicion) {
      if (event.target.files.length > 0) {
        const archivo = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.libroActual.imagen = e.target.result;
          if (esEdicion) {
            this.editarLibro(this.libroActual.id, true);
          }
        };
        reader.readAsDataURL(archivo);
      }
    },
    mostrarModal(
      accion,
      libro = { id: null, nombre: "", autor: "", createdAt: "", imagen: "" }
    ) {
      this.libroActual = { ...libro };
      this.$refs[accion === "agregar" ? "modalAgregar" : "modalEditar"].show();
    },
    agregarLibro() {
      axios
        .post("http://localhost:8080/api/libros/", this.libroActual)
        .then((response) => {
          this.libros.push(response.data);
          this.$refs.modalAgregar.hide();
        })
        .catch((error) => {
          console.error("Hubo un error al agregar el libro:", error);
        });
    },
    editarLibro(idLibro, soloImagen) {
      if (!soloImagen) {
        axios
          .put(`http://localhost:8080/api/libros/${idLibro}`, this.libroActual)
          .then((response) => {
            const index = this.libros.findIndex(
              (libro) => libro.id === idLibro
            );
            this.libros.splice(index, 1, response.data);
            this.$refs.modalEditar.hide();
          })
          .catch((error) => {
            console.error("Hubo un error al editar el libro:", error);
          });
      }
    },
    manejarInicioArrastre(event, libro) {
      this.libroArrastrado = libro;
      event.dataTransfer.setData("text", libro.id.toString());
    },
    manejarSoltar(event) {
      event.preventDefault();
      if (this.libroArrastrado) {
        axios
          .delete(`http://localhost:8080/api/libros/${this.libroArrastrado.id}`)
          .then(() => {
            this.libros = this.libros.filter(
              (libro) => libro.id !== this.libroArrastrado.id
            );
            this.libroArrastrado = null;
          })
          .catch((error) => {
            console.error("Hubo un error al eliminar el libro:", error);
          });
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    this.fetchLibros();

  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
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

.sr-only {
  color: white;
}

.delete-zone {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 20px;
  border: 2px dashed red;
  text-align: center;
}

.delete-zone:hover {
  background-color: #ffebeb;
}

.card {
  transition: opacity 0.3s ease;
}

.card:hover {
  cursor: grab;
  opacity: 0.7;
}
</style>
