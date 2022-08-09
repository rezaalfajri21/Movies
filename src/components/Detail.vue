<template>
  <v-app>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <v-main>
        <v-row no-gutters class="fill-height" justify="center">
          <v-col cols="12" sm="4" md="4" class="hidden-sm-and-down">
            <v-card flat>
              <v-flex class="px-10 pb-2 text-center">
                <v-img sizes="80%" :src="movies.Poster">

                </v-img>
              </v-flex>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="8" class="">
            <v-card flat max-width="700" class="fill-height textTable">
              <v-flex class="px-10 pb-2">
                <p class="title" 
                font-family= "Poppins"
                >{{movies.Title}} ({{movies.Year}})</p>
                <v-btn color="primary" rounded>
                  <span class="detail">{{movies.Rated}}</span>
                </v-btn>
                <subtitle class="field mt-8" font-family= "Poppins"> 
                    <span class="detail">Runtime: &nbsp;</span>
                    <span>{{movies.Runtime}}</span>
                </subtitle>
                <subtitle class="field" font-family= "Poppins"> 
                    <span class="detail">Genre:  &nbsp;</span>
                    <span>{{movies.Genre}}</span>
                </subtitle>
                <subtitle class="field" font-family= "Poppins"> 
                    <span class="detail">Director:  &nbsp;</span>
                    <span>{{movies.Director}}</span>
                </subtitle>
                <subtitle class="field" font-family= "Poppins"> 
                    <span class="detail">Writer:  &nbsp;</span>
                    <span>{{movies.Writer}}</span>
                </subtitle>
                <subtitle class="field" font-family= "Poppins"> 
                    <span class="detail">IMDB Rating:  &nbsp;</span>
                    <span>{{movies.imdbRating}}</span>
                </subtitle>
                <subtitle class="field" font-family= "Poppins"> 
                    <span class="detail">Casts:  &nbsp;</span>
                    <span>{{movies.Actors}}</span>
                </subtitle>
                <subtitle class="field" font-family= "Poppins"> 
                    <span class="detail">Synopsis:  &nbsp;</span>
                </subtitle>
                <subtitle class="field" font-family= "Poppins"> 
                    <span>{{movies.Plot}}</span>
                </subtitle>
              </v-flex>
            </v-card>
          </v-col>
        </v-row>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'

Vue.use(VueAxios, axios)
export default {
  name: 'detail',
  created () {
    localStorage.removeItem('TOKEN');
    document.title = this.movies.Title + "Detail";
    console.log(localStorage.IMDBID);
            document.title = "Detail";
            Vue.axios
            .get('https://www.omdbapi.com/?apikey=faf7e5bb&i='+ this.$route.params.imdbId +'&plot=full')
            .then(response =>{
                this.movies = response.data;
                console.log(this.movies);
            });
    
  },
  data (){
    return {
      movies: [],  
    };
  },
  methods: {
    login() {
        console.log('login ni bos');
        if(this.email=="admin@email.com" && this.password=="admin123"){
          localStorage.TOKEN=true;
          this.$router.push('/home');
        }
       
    },
  }
}
</script>

<style lang="css" scoped>

.title{
  position: static;
  padding: 4px;

  /* Title */
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 28px;
  display: flex;
  align-items: center;

  /* Black-900 (#1A1A1A) */
  color: #1A1A1A;

}

.field{

  position: static;
  padding: 4px;

  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  display: flex;

  color: #778192;


  /* Inside Auto Layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 1px;
}

.detail {
    font-weight: bold;
}
</style>