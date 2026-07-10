/** Strip to digits only (max 11 for US +1). */
export function phoneDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11);
}

/** Format for display: 8631233212 → (863) 123-3212 */
export function formatPhoneDisplay(value: string): string {
  let digits = phoneDigits(value);
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  if (digits.length !== 10) return value.trim();
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Format for tel: links: 8631233212 → +18631233212 */
export function formatPhoneTel(value: string): string {
  const digits = phoneDigits(value);
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return digits ? `+${digits}` : "";
}

/** Progressive format while typing in an input field. */
export function formatPhoneInput(value: string): string {
  const digits = phoneDigits(value).slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
