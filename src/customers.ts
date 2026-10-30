// Acme Customers API client (API v1).
export const ACME_BASE_URL = "https://api.acme.test";

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone: string;
}

function authHeaders() {
  return { authorization: `Bearer ${process.env.ACME_API_KEY ?? ""}` };
}

export async function getCustomer(id: string): Promise<Customer> {
  const response = await fetch(`${ACME_BASE_URL}/v1/customers/${id}`, {
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error(`Acme request failed: ${response.status}`);
  return (await response.json()) as Customer;
}

export async function listCustomers(limit = 20): Promise<Customer[]> {
  const response = await fetch(`${ACME_BASE_URL}/v1/customers?limit=${limit}`, {
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error(`Acme request failed: ${response.status}`);
  const body = (await response.json()) as { data: Customer[] };
  return body.data;
}
