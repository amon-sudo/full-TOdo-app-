import {DatabaseSync} from 'node:sqlite'

const db = new DatabaseSync(':memory:') //starting our database, noe here we have used the memory beacuse it a normal not a production
//setting up the databse
db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
    `)


db.exec(`
    CREATE TABLE todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id)


    )
    `)

export default db