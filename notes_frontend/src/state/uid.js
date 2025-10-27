const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * PUBLIC_INTERFACE
 * nanoid-like simple id generator for local usage, not cryptographically secure.
 */
export function nanoid(size = 12) {
  let id = '';
  const n = ALPHABET.length;
  for (let i = 0; i < size; i++) {
    id += ALPHABET[Math.floor(Math.random() * n)];
  }
  return id;
}

export default nanoid;
