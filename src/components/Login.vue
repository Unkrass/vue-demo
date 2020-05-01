<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <voting-card-title></voting-card-title>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="8">
          <v-card class="pa-3">
            <v-form data-test-login-form>
              <v-text-field name="user" label="Username" v-model="username"
                @keyup.enter="login" data-test-username-input>
              </v-text-field>
              <v-text-field name="pw-1" label="Password" v-model="password" data-test-password-input
                type="password" append-icon="visibility_off" @keyup.enter="login">
              </v-text-field>
              <v-btn :loading="loading" :disabled="loading" block class="accent mb-3" @click="login"
                data-test-login-button>
                Login
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import querystring from 'querystring'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      loading: false,
      currentUser: '',
      axiosheader: {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        withCredentials: false
      }
    }
  },
  methods: {
    login: function () {
      this.loading = true
      this.$http.post('/oauth/token',
        querystring.stringify({
          password: this.password,
          username: this.username,
          grant_type: 'password',
        }),
        this.axiosheader
      )
      .then(response => {
        this.$cookie.set('token', response.data.access_token)
        this.getUserData()
        this.loading = false
      })
      .catch(e => {
        if (e.response) {
          this.$emit('error', e.response.data.error_description)
        } else {
          this.$emit('error', 'Oh my God the App is broken in half!')
        }
        this.loading = false
      })
    },
    getUserData: function () {
      const self = this
      
      this.$http.get('/users/current')
      .then(response => {
        self.currentUser = response.data
        self.$cookie.set('roles', JSON.stringify(response.data.roles))
        self.$cookie.set('email', response.data.email)
        self.$cookie.set('username', response.data.username)
        this.$router.push('start')
        self.loading = false
      })
      .catch(() => {
        self.$emit('error', 'Mamma mia! What just happened?!')
        self.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
