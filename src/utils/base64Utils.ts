export function encodeBase64(text: string, urlSafe: boolean = false): string {
  try {
    const bytes = new TextEncoder().encode(text);
    const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
    let encoded = btoa(binString);

    if (urlSafe) {
      encoded = encoded
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    return encoded;
  } catch {
    throw new Error("Encoding failed: Input contains incompatible characters.");
  }
}

export function decodeBase64(base64: string): string {
  try {
    let normalized = base64.replace(/-/g, "+").replace(/_/g, "/");

    while (normalized.length % 4 !== 0) {
      normalized += "=";
    }

    const binString = atob(normalized);
    const bytes = Uint8Array.from(binString, (char) => char.codePointAt(0)!);
    return new TextDecoder().decode(bytes);
  } catch {
    throw new Error("Invalid Base64 string: Ensure the input is correctly formatted.");
  }
}