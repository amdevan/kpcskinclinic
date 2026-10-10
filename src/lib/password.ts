import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

/**
 * Scrypt parameters — production-grade key-derivation.
 * N=16384, r=8, p=1, keylen=64 — matches OWASP recommendations
 * and remains fast enough for a low-traffic admin login.
 */
const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const KEY_LEN = 64;
const SALT_LEN = 16;
const PREFIX = "scrypt:";

/**
 * Hash a password using scrypt. The returned string encodes both the
 * random 16-byte salt and the 64-byte derived key, so the same value can
 * be stored in a single column. Format: `scrypt:{salt-hex}:{hash-hex}`.
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(SALT_LEN);
  const hash = scryptSync(password, salt, KEY_LEN, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  });
  return `${PREFIX}${salt.toString("hex")}:${hash.toString("hex")}`;
}

/**
 * Verify a password against a stored hash. Supports the current scrypt
 * scheme (`scrypt:salt:hash`) AND a legacy base64-encoded shadow record
 * (used by earlier dev iterations of the admin user table) — the legacy
 * path is only checked when the stored value does NOT start with `scrypt:`.
 */
export function verifyPassword(password: string, stored: string): boolean {
  if (!stored) return false;

  // Modern scrypt path
  if (stored.startsWith(PREFIX)) {
    try {
      const parts = stored.slice(PREFIX.length).split(":");
      if (parts.length !== 2) return false;
      const salt = Buffer.from(parts[0], "hex");
      const expectedHash = Buffer.from(parts[1], "hex");
      if (salt.length !== SALT_LEN || expectedHash.length !== KEY_LEN) {
        return false;
      }
      const actualHash = scryptSync(password, salt, KEY_LEN, {
        N: SCRYPT_N,
        r: SCRYPT_R,
        p: SCRYPT_P,
      });
      // Constant-time comparison to avoid timing side-channels.
      if (actualHash.length !== expectedHash.length) return false;
      return timingSafeEqual(actualHash, expectedHash);
    } catch {
      return false;
    }
  }

  // Legacy base64 path (kept for backward compat with old dev users).
  try {
    const decoded = Buffer.from(stored, "base64").toString("utf-8");
    return decoded === password;
  } catch {
    return false;
  }
}

/**
 * Validate password strength. Rules:
 *  - minimum 8 characters
 *  - at least 1 letter
 *  - at least 1 digit
 */
export function passwordStrength(
  password: string,
): { ok: boolean; error?: string } {
  if (!password || password.length < 8) {
    return {
      ok: false,
      error: "Password must be at least 8 characters with letters and digits",
    };
  }
  if (!/[a-zA-Z]/.test(password)) {
    return {
      ok: false,
      error: "Password must be at least 8 characters with letters and digits",
    };
  }
  if (!/\d/.test(password)) {
    return {
      ok: false,
      error: "Password must be at least 8 characters with letters and digits",
    };
  }
  return { ok: true };
}
