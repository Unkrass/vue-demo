import { Server, Model, Response } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {
  let server = new Server({
    environment,

    models: {
      arena: Model,
      user: Model
    },

    seeds(server) {
      server.create('user', {
        'id': 1,
        'username': 'user',
        'email': 'user@this-is-my-repo.info',
        'password': '123456',
        'roles': ['USER']
      })
      server.create('arena', {
        'id': 1,
        'name': 'Millerntorstadion',
        'city': 'Hamburg',
        'state': 'Germany'
      })
      server.create('arena', {
        'id': 2,
        'name': 'Barclaycard Arena',
        'city': 'Hamburg',
        'state': 'Germany'
      })
    },

    routes() {
      this.urlPrefix = 'http://localhost:8080'
      this.namespace = ''

      /* Login */
      this.post('/oauth/token', function (schema) {
        const requestedUsername = this.normalizedRequestAttrs().username
        if (schema.users.findBy({username: requestedUsername})) {
          return { 'access_token': 'abcd123456789', 'token_type': 'bearer', 'refresh_token': 'efgh123456789', 'expires_in': 43199}
        }
        const headers = {}
        const data = {'error': 'unauthorized', 'error_description': 'Username or password wrong'}
        return new Response(401, headers, data)
      })

      this.get('/users/current', (schema) => {
        return schema.users.first().attrs
      })

      /* Arenas */
      this.get('/events/arenas', (schema) => {
        return schema.arenas.all().models
      })
    }
  })

  return server
}
