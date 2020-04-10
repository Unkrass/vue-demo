import { Server, Model } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {
  let server = new Server({
    environment,

    models: {
      arena: Model,
    },

    seeds(server) {
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
      this.urlPrefix = 'http://localhost:8090'
      this.namespace = ''

      /* Login */
      this.post('/oauth/token', () => {
        return { 'access_token': 'abcd123456789', 'token_type': 'bearer', 'refresh_token': 'efgh123456789', 'expires_in': 43199, 'scope': 'ppvoting'}
      })

      /* Arenas */
      this.get('/events/arenas', (schema) => {
        return schema.arenas.all()
      })
    }
  })

  return server
}
