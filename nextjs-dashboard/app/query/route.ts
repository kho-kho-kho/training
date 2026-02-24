import postgres from 'postgres';

const sql = postgres({
  host      : process.env.POSTGRES_HOST,
  database  : process.env.POSTGRES_DATABASE,
  username  : process.env.POSTGRES_USER,
  password  : process.env.POSTGRES_PASSWORD,
  ssl       : 'require'
});

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}

export async function GET() {
  try {
  	return Response.json(await listInvoices());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
