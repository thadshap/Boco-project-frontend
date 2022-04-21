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
          <input class="form-control w-50" type="file">
        </div>
        <div class="d-flex flex-column">
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
  name: "LendingPage"
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
</style>