const INDIAN_PHONE_RE = /^(\+91|0)?[6-9]\d{9}$/;

export function normalizeIndianPhone(value: string): string {
  return value.replace(/[\s\-().]/g, "").trim();
}

export function isValidIndianPhone(value: string): boolean {
  if (!value) return false;
  return INDIAN_PHONE_RE.test(normalizeIndianPhone(value));
}
