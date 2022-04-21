<template>
  <div class="d-flex flex-column containerDiv">
    <div class="infoContainerDiv">
      <div class="card infoCard">
        <div class="card-body">
          <div>
            <h3>Min Profil</h3>
          </div>
          <div class="d-flex infoDiv"><img class="profilePic" src="@/assets/img/profilePicPlaceholder.png">
            <div class="d-sm-flex flex-column justify-content-end">
              <p>Brage Minge</p>
              <p>bragemi@stud.ntnu.no</p>
              <div class="d-flex justify-content-between">
                <p><strong>10.0</strong></p>
                <p>3 vurderinger</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-row flex-wrap optionContainer">
      <div class="cardDiv">
        <div class="card cardBodyStyle">
          <div class="card-body">
            <h4 class="card-title">Min konto</h4>
            <p class="card-text">Se og rediger dine opplysninger på BoCo</p>
          </div>
        </div>
      </div>
      <div class="cardDiv">
        <div class="card cardBodyStyle">
          <div class="card-body">
            <h4 class="card-title">Mine annonser</h4>
            <p class="card-text">Se alle dine annonser, aktive og utløpte</p>
          </div>
        </div>
      </div>
      <div class="cardDiv">
        <div class="card cardBodyStyle">
          <div class="card-body cardBodyStyle">
            <h4 class="card-title">Favoritter</h4>
            <p class="card-text">Se alle annonsene du har lagret her</p>
          </div>
        </div>
      </div>
      <div class="cardDiv">
        <div class="card cardBodyStyle">
          <div class="card-body">
            <h4 class="card-title">Følger</h4>
            <p class="card-text">Se brukerne du følger og deres annonser</p>
          </div>
        </div>
      </div>
      <div class="cardDiv">
        <div class="card">
          <div class="card-body cardBodyStyle">
            <h4 class="card-title">Varslingsinnstillinger</h4>
            <p class="card-text">Bestem hvordan du vil motta varslinger</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "MyProfile",
  }

</script>

<style scoped>
  .card {
  }

  @media (min-width: 768px) {
    .cardDiv {
      padding: 5px;
      width: 30%;
    }
  }

  .cardBodyStyle {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .cardDiv {
      width: 90%;
      padding: 5px;
    }
  }

  .infoDiv {
    gap: 1vw;
  }

  .containerDiv {
    padding: 1vw;
    background-color: rgb(230,247,255);
    min-height: 100vh;
  }

  .infoContainerDiv {
    margin: 1vw;
    padding: 5px;
    max-width: 80%;
  }

  .profilePic {
    max-width: 90px;
  }

  .optionContainer {
    margin: 1vw;
  }

</style>