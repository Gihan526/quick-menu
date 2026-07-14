export function generateOwnerKey(): string {
  return `qm_${crypto.randomUUID()}`;
}
