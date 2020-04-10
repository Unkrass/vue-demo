<template>
  <div>
    <div>
      <div>
        <h1 class="text-2xl font-bold">Arenas</h1>
        <div>2 Arenas should appear here:</div>
        <div v-for="arena in arenas" :key="arena.id"></div>
      </div>
    </div>
    <div style="margin-top: 30px;">And this button outputs the login response:</div>
    <div>
      <button class="btn btn-blue" @click="login()">Post Login Response to Console</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import querystring from "querystring";
export default {
  data() {
    return {
      arenas: [],
    };
  },

  created() {
    axios.get("/events/arenas").then(({ data }) => {
      this.arenas = data;
    });
  },

  methods: {
    login: function () {
      axios.post('/oauth/token',
        querystring.stringify({
          password: '123456789',
          username: 'john cena',
          grant_type: 'password',
          scope: 'qwertzuiop',
          client_secret: 'asdfghjk',
          client_id: 'yxcvbnm'
        }),
        {
        auth: {
          username: 'test',
          password: 'password'
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        withCredentials: false
      }
      )
      .then(() => {
        // eslint-disable-next-line
        console.log('successfully logged in')
      })
      .catch(err => {
        // eslint-disable-next-line
        console.log(err)
      })
    }
  }
};
</script>

<style>
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }
</style>
