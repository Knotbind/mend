import type { Customer } from "./customers.ts";

export function contactLine(customer: Customer): string {
  return `${customer.name} <${customer.email}> ${customer.phone}`;
}

export function hasPhone(customer: Customer): boolean {
  const { phone } = customer;
  return phone.length > 0;
}

export function toCsvRow(customer: Customer): string {
  return [customer["id"], customer.email, customer.phone].join(",");
}
