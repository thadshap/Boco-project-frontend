<template>
  <div id="adPictureDiv" class="text-center">
    <img id="adPicture" alt="Bilde av gjenstanden som blir utlånt">
  </div>
  <div class="text-center">
    <label id="adHeader" class="form-label">{{ headerText }}</label>
  </div>
  <div class="text-center">
    <label class="form-label">Leiepris : {{rentalPrice}} kr pr/{{unitPeriod}}</label>
  </div>
  <div class="text-center">
    <button id="startChatButton" class="btn btn-primary" type="button" v-on:click="startChat">
      Send melding
    </button>
  </div>
  <div id="description" class="text-center">
    <label id="descriptionLabel" class="form-label">
      {{ description }}
    </label>
  </div>
  <div class="text-center">
    <div id="lenderHeader">
      <label class="form-label">
        Utlåner:
      </label>
    </div>
    <div id="lenderDetails">
      <label id="lenderName" class="form-label">
        {{ lender.name}} <br>
      </label>
      <i class="fas fa-check-circle"></i></div>
    <div id="lenderNumber">
      <label id="lenderNumberLabel" class="form-label">
        tlf : {{ lender.number}}<br>
      </label>
    </div>
  </div>
  <div id="distance" class="text-center">
    <label class="form-label">
      Avstand : {{ distance}} km fra din posisjon&nbsp;
    </label>
  </div>
  <div id ="address" class="text-center">
    <label class="form-label">
      Adresse : {{ address }}&nbsp;
    </label>
  </div>
  <div class="text-center" style="padding: 0px;">
    <img></div>
</template>

<script>
export default {
  name: "DetailedAd",

  data() {
    return {
      headerText : '',
      rentalPrice : null,
      unitPeriod : '',
      description : '',
      lender : {
        name : '',
        number: null,
      },
      distance : null,
      address : '',
      picture : '',
    };
  },
  methods : {
    startChat (){

    },
  },
};
</script>

<style scoped>
  #adPictureDiv{
    padding: 10vw 10vw 0 10vw;
  }
  #adPicture{
    width: 250px;
    height: auto;
  }
  #adHeader{
    font-weight: bold;
    font-size: 22px;
  }
  #startChatButton{
    height: 10vw;
    padding: 4px;
    font-size: 14px;
  }
  #description{
    padding: 0px 10px 0px 10px;
  }
  #descriptionLabel{
    font-size: 12px;
    font-style: italic;
  }
  i{
    color: blue;
    padding: 0.5vw;
  }
  #lenderDetails{
    height: 4vh;
  }
  #lenderName, #lenderNumberLabel{
    font-size: 12px;
    color: blue;
    text-decoration: underline;
  }
  #lenderNumber{
    height: 5vh;
  }
  #lenderHeader{
    height: 2vh;
  }
  #distance{
    padding: 0px 10px 0px 10px;
  }
  #address{
    padding: 0px 5vw 0px 5vw;
  }
</style>