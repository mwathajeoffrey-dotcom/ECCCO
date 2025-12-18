const { Client } = require('pg');

const url = process.env.DATABASE_URL;
console.log('Using DATABASE_URL:', url);

async function run() {
  try {
    const client = new Client({
      connectionString: url,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    await client.connect();
    const res = await client.query('SELECT NOW()');
    console.log('PG connected, now=', res.rows[0]);
    await client.end();
  } catch (e) {
    console.error('PG connection failed:', e.message);
  }
}

run();
