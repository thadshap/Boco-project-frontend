<template>
  <div class="container">
    <div class="d-flex justify-content-start align-items-center">
      <div class="align-items-center back-arrow-container" @click="back">
        <i class="fa fa-arrow-left"></i>
        <span class="mx-2">Tilbake</span>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <h2>Mine lån</h2>
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
          class="d-flex flex-row justify-content-center align-items-center flex-wrap categories-card-container-style"
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
    <RentalListComponent
        :rentals="rentals"
    />
  </div>
</template>

<script>
import RentalListComponent from "@/components/RentalListComponent";
import CategoryComponent from "@/components/CategoryComponent";
import lendingService from "@/services/lendingService";

export default {
  name: "MyRentals",
  components: {
    RentalListComponent,
    CategoryComponent,
  },
  data() {
    return {
      rentals: [],
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
    },
  },
  created() {
      lendingService
          .getHistoryRentalForUser(localStorage.getItem("userId"))
          .then(response => {
            // this.rentals = response.data
            for (let i = 0; i < response.data.rentals.length; i++) {
              this.rentals.push(response.data.rentals[i])
              console.log(response.data.rentals[1])
            }
            console.log(response.data.rentals)
            console.log(response.status)
            console.log(this.rentals)
            if(response.status!==200){
              //legg til nettverksfeil tilbakemelding
              alert("fikk ikke kontakt med backend")
              return
            }
            // alert(response.data)
            // this.$router.push("/login")
          })
          .catch(function (error) {
            console.log(error);
          });
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
