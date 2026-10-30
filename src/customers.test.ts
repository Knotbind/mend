import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { getCustomer, listCustomers, type Customer } from "./customers.ts";
import { contactLine, hasPhone, toCsvRow } from "./format.ts";

const ada: Customer = {
  id: "cus_1",
  email: "ada@example.test",
  name: "Ada Lovelace",
  phone_number: "+4420790460",
};

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

function respondWith(body: unknown) {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify(body), { status: 200 })) as typeof fetch;
}

test("getCustomer returns the customer", async () => {
  respondWith(ada);
  assert.deepEqual(await getCustomer("cus_1"), ada);
});

test("listCustomers unwraps the data array", async () => {
  respondWith({ data: [ada] });
  assert.deepEqual(await listCustomers(), [ada]);
});

test("formats a customer", () => {
  assert.equal(contactLine(ada), "Ada Lovelace <ada@example.test> +4420790460");
  assert.equal(hasPhone(ada), true);
  assert.equal(toCsvRow(ada), "cus_1,ada@example.test,+4420790460");
});
