<template>
    <v-app>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
        <v-main>
            <v-container>
                <h1>Movies</h1>
                <v-row>
                    <v-autocomplete v-model="keyword" v-on:keydown="searching(keyword)" max-width="400px" v-if="loaded" :items=movieSearch label="Search"
                    ></v-autocomplete>
                </v-row>
                <v-row>
                    <v-col style="text-align:right">
                        <v-dialog v-model="dialog" max-width="400">
                            <v-card>
                                <v-card-title>
                                    <a>
                                        <span  v-on:click="go(card.imdbID)" class="text-h6">{{ card.title }}</span>
                                    </a>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-img
                                                :src="card.poster"
                                            >
                                            </v-img>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                    <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                </v-dialog>
                <v-div>
                    <v-row class="justify-center">
                        <v-col
                            class="col-md-3 col-sm-4"
                            v-for="movie in movies"
                            :key="movie.Title"
                            :cols="movie.flex"
                            :search="search"
                        >
                            <v-card>
                                <a>
                                    <v-img
                                        v-on:click="picClicked(movie)"
                                        sizes="30%"
                                        :src="movie.Poster"
                                        height="400"
                                    >
                                    </v-img>
                                </a>
                                <br>
                                <a>
                                    <v-list-item-subtitle v-on:click="go(movie.imdbID)" style="text-align:center" v-text="movie.Title"></v-list-item-subtitle>
                                </a>
                                <br>
                            </v-card>
                            <br><br>
                        </v-col>
                    </v-row>
                    <v-row class="justify-center">
                        <v-btn v-on:click="loadMore()" class="mb-6">Load More</v-btn>
                    </v-row>
                </v-div>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'

Vue.use(VueAxios, axios)
    export default {
        data: () => ({
            page: 1,
            keyword: '',
            movies: [],
            movieSearch: [],
            dialog: false,
            search: '',
            card: {
                title: '',
                poster: '',
                imdbID: '',
            },
        }),
        created () {
            document.title = "Movies";
            Vue.axios
            .get('https://www.omdbapi.com?apikey=faf7e5bb&s=Batman&page=1')
            .then(response =>{
                this.movies = response.data.Search;
                for(var i = 0; i < this.movies.length; i++) {
                    this.movieSearch[i] = this.movies[i].Title;
                    console.log('ini ' + this.movieSearch[i]);
                }
                this.loaded = true;
            });
        },
        methods: {
            go(imdbId) {
                // this.$router.push('/detail/'+imdbId);
                window.open('detail/'+imdbId, imdbId.href);
            },
            picClicked(movie) {
                this.card = movie;
                this.card.title = movie.Title;
                this.card.poster = movie.Poster;
                this.card.imdbID = movie.imdbID;
                this.dialog = true;
            },
            searching(keyword) {
                console.log(keyword);
            },
            loadMore() {
                this.page = this.page + 1;
                Vue.axios
                .get('https://www.omdbapi.com?apikey=faf7e5bb&s=Batman&page=' + this.page)
                .then(response =>{
                    for(var i = 0; i<response.data.Search.length; i++) {
                        this.movies.push(response.data.Search[i]);
                        this.movieSearch.push(response.data.Search[i].Title);
                    }
                    console.log(this.movies);
                });
            }
        },
        
    }
</script>