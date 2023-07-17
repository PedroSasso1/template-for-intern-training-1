/* eslint-disable no-undef */
import sqlite from 'sqlite3';

const client = new sqlite.Database(':memory:', err => {
  if (err) {
    throw err;
  }
  console.log('connected at sqlite');
});

client.serialize(() => {
  client.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    age INTEGER UNSIGNED NOT NULL
  )`)
})

export class SqliteHandler {
  constructor() {
    this.client = client;
  }

  async getOneById(table, fields, id) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT \`${fields.join('`,`')}\` FROM ${table} WHERE id = ${id}; 
      `;

      return this.client.get(sql, [], function (err, row) {
        if(err) {
          console.error("SQLite Handler Error: GetOneById failed: ", err.message);
          return reject(err.message);
        }
        return resolve(row)
      })
    })
  }

  async getAll(table, fields) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT \`${fields.join('`,`')}\` FROM ${table}; 
      `;

      return this.client.all(sql, [], function (err, row) {
        if(err) {
          console.error("SQLite Handler Error: GetAll failed: ", err.message);
          return reject(err.message);
        }
        return resolve(row)
      })
    })
  }

  async create(table, fields, values) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO \`${table}\` 
        (\`${fields.join('`,`')}\`)
        VALUES ('${values.join("','")}')
      `;

      return this.client.run(sql, [], function (err) {
        if(err) {
          console.error("SQLite Handler Error: Insert failed: ", err.message);
          return reject(err.message);
        }
        return resolve(this.lastID)
      })
    })
  }

  async update(table, id, fields, values) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE \`${table}\` SET
        ${fields.map((field, index) => `${field} = '${values[index]}'`).join(', ')}
        WHERE id = ${id}
      `;

      return this.client.run(sql, [], function (err) {
        if(err) {
          console.error("SQLite Handler Error: Update failed: ", err.message);
          return reject(err.message);
        }

        return resolve(this.changes === 1)
      })
    })
  }

  async delete(table, id) {
    return new Promise((resolve,reject) => {
      const sql = `DELETE FROM ${table} WHERE id = ${id}`;

      return this.client.run(sql, [], function (err) {
        if(err) {
          console.error("SQLite Handler Error: Delete failed: ", err.message);
          return reject(err.message);
        }

        return resolve(this.changes === 1)
      })
    })
  }
}
