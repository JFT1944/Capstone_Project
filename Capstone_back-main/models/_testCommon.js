const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

// const testJobIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  // await db.query("DELETE FROM companies");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  await db.query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email, 
                          pref_unit)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com', 'SI'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com', 'US')
        RETURNING username`,
      [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),

      ]);

        await db.query(`INSERT INTO ingredients(name, unit, full_amount, available_amount, username)
        VALUES ('flour', 'g', 1000, 1000, 'u1'),
                ('sugar', 'g', 1000, 1000, 'u1'),
                ('salt', 'g', 1000, 1000, 'u1'),
                ('water', 'ml', 1000, 1000, 'u1'),
                ('flour', 'g', 1000, 1000, 'u2')
                Returning name`)
        
        await db.query(`INSERT INTO recipes(name, ingredients, username)
        VALUES ('bread', '[{"name":"flour","amount":500,"unit":"g"},{"name":"water","amount":300,"unit":"ml"},{"name":"salt","amount":10,"unit":"g"}]', 'u1'),
                ('bread', '[{"name":"flour","amount":500,"unit":"g"},{"name":"water","amount":300,"unit":"ml"},{"name":"salt","amount":10,"unit":"g"}]', 'u2')
                Returning name, ingredients`)

                
      

  // await db.query(`
  //       INSERT INTO applications(username, job_id)
  //       VALUES ('u1', $1)`,
  //     [testJobIds[0]]);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
  // testJobIds,
};