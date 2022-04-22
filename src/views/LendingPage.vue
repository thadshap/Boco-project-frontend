<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="form-container">
      <div>
        <h1 class="text-center header-style">
          Lag ny annonse
        </h1>
      </div>
      <form>
        <div class="d-flex flex-column">
          <label class="form-label">
            Tittel
          </label>
          <input class="form-control" type="text">
        </div>
        <div class="d-flex flex-column">
          <label class="form-label">
            Kategori
          </label>
          <input class="form-control" type="text">
        </div>
        <div class="d-flex flex-column">
          <label class="form-label">
            Beskrivelse
          </label>
          <textarea class="form-control"></textarea>
        </div>
        <div class="d-flex flex-column">
          <label class="form-label">
            Bilde(r)
          </label>

          <button class="btn btn-primary w-100 btn-style" type="button" @click="chooseImages">
            Last opp bilder
          </button>

          <input
            class="form-control form-control-lg"
            ref="fileInput"
            type="file"
            accept="image/*"
            id="formFileLg"
            @input="onFileChange"
            multiple
          >

          <div id="preview" class="d-flex flex-wrap justify-content-center align-items-center mt-3" v-if="imgUrl.length !== 0">
            <div v-for="img in imgUrl" :key="img" class="image-preview-container p-1">
              <img :src="img" class="image-preview-image"/>
            </div>
          </div>

        </div>
        <div class="d-flex flex-column mt-5">
          <label class="form-label">
            Pris
          </label>
          <input class="form-control" type="text">
        </div>
        <div class="d-flex flex-column">
          <label class="form-label">
            Gate adresse
          </label>
          <input class="form-control" type="text">
        </div>
        <div class="d-flex flex-column">
          <label class="form-label">
            Postnummer
          </label>
          <input class="form-control" type="text">
        </div>
        <div class="d-flex flex-column">
          <label class="form-label">
            Tlf. nummer
          </label>
          <input class="form-control" type="tel">
        </div>
        <button class="btn btn-primary w-100 btn-style" type="button">
          Opprett annonse
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LendingPage",
  data() {
    return {
      imgUrl: []
    }
  },
  methods: {
    chooseImages() {
      this.$refs.fileInput.click()
    },
    onFileChange(e) {
      console.log(e.target.files.length)
      for(let i = 0; i < e.target.files.length; i++) {
        console.log(e.target.files[i])
        let file = e.target.files[i];
        this.imgUrl.push(URL.createObjectURL(file));
        console.log(this.imgUrl)
      }
    }
  }
};
</script>

<style scoped>
.header-style {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  padding-bottom: 10px;
}

.btn-style {
  margin-top: 20px;
}

#formFileLg {
  display: none;
}

.image-preview-image {
  height: 100%;
}

@media screen and (min-width: 1200px) {
  .image-preview-container {
    width: 33%;
    height: 100px;
  }

  .image-preview-image {
    height: 100%;
  }
}

@media screen and (min-width: 576px) and (max-width: 1200px) {
  .image-preview-container {
    width: 50%;
    height: 100px;
  }

  .image-preview-image {
    height: 100%;
  }
}

@media screen and (max-width: 567px) {
  .image-preview-container {
    width: 100%;
    height: 100px;
  }

  .image-preview-image {
    height: 100%;
  }
}

/*#preview img {*/
/*  max-width: 33%;*/
/*  max-height: 500px;*/
/*}*/

@media (min-width: 992px) {
  .form-container {
    width: 50%;
  }
}

@media (max-width: 991px) {
  .form-container {
    width: 80%;
  }
}
</style>