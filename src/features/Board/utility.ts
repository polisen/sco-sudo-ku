export function getBorderStyle(index: number) {
  if (index === 8) return '0';
  if ((index + 1) % 3) {
    return '1px solid #d9d9d9';
  }
  return '3px solid #aba4a4';
}
