import { makeServer } from "../../src/server";

let server;

beforeEach(() => {
  server = makeServer({ environment: "test" });
});

afterEach(() => {
  server.shutdown();
});

it("shows the arenas from our server", () => {
  server.logging = true;
  server.db.loadData({
    arenas: [{
      'id': 3,
      'name': 'New stadium',
      'city': 'Hamburg',
      'state': 'Germany'
    }]
  });

  cy.visit("/");

  cy.get('#arena-1')
});
