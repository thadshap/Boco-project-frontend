<template>
  <div class="container">
    <div class="d-flex justify-content-start align-items-center">
      <div class="align-items-center back-arrow-container" @click="back">
        <i class="fa fa-arrow-left"></i>
        <span class="mx-2">Tilbake</span>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <h2>Mine annonser</h2>
    </div>
    <div class="d-flex justify-content-center search-box-container-style">
      <div class="d-flex search-container">
        <input type="search" placeholder="Søk" class="w-100" />
        <button class="btn btn-primary btn-style" type="button">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>

    <div>
      <h3>Categories</h3>
      <div
          class="d-flex flex-row justify-content-start align-items-center flex-wrap categories-card-container-style"
      >
        <CategoryComponent
            v-for="category in categories"
            :key="category"
            :title="category.title"
            :icon="category.icon"
        />
      </div>
    </div>
  </div>

  <div>
    <h3>Newest items</h3>

    <AdListComponent :ads="ads"
    :loaned-ads="false"
    :my-ads="true"/>
  </div>
</template>

<script>
import AdListComponent from "@/components/AdListComponent";
import CategoryComponent from "@/components/CategoryComponent";

export default {
  name: "MyAds",
  components: {
    AdListComponent,
    CategoryComponent,
  },
  data() {
    return {
      ads: [],
      categories: [
        {
        "title": "Verktøy",
        "icon": "fa-hammer"
        },
        {
          "title": "Bil",
          "icon": "fa-car"
        },
        {
          "title": "Båt",
          "icon": "fa-ship"
        }
      ],
    };
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped>
.search-box-container-style {
  margin-bottom: 20px;
}

.btn-style {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  width: 80px;
}

.categories-card-container-style {
  padding: 10px;
}

@media (min-width: 992px) {
  .search-container {
    width: 50%;
  }
}

@media (max-width: 991px) {
  .search-container {
    width: 80%;
  }
}

.back-arrow-container {
  cursor: pointer;
}
</style>
