// const { PORT = 5001 } = process.env;

// const app = require("./app");
// const knex = require("./db/connection");

// knex.migrate
//   .latest()
//   .then((migrations) => {
//     console.log("migrations", migrations);
//     app.listen(PORT, listener);
//   })
//   .catch((error) => {
//     console.error(error);
//     knex.destroy();
//   });

// function listener() {
//   console.log(`Listening on Port ${PORT}!`);
// }


const { PORT = 5001 } = process.env;

const app = require("./app");
const knex = require("./db/connection");

const listener = () => console.log(`Listening on Port ${PORT}!`);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch(console.error);