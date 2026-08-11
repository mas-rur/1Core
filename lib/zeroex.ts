const ZEROX_BASE = process.env.ZEROX_API_BASE ?? "https://api.0x.org";

export class ZeroExError extends Error {
  status: number;
  details: unknown;
  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

function headers() {
  const apiKey = process.env.ZEROX_API_KEY;
  if (!apiKey) {
    throw new ZeroExError(
      "Server is missing ZEROX_API_KEY. Add it to .env.local — get a free key at dashboard.0x.org.",
      500
    );
  }
  return {
    "0x-api-key": apiKey,
    "0x-version": "v2",
  };
}

/** Indicative, read-only price — no allowance/signature required. Used while the user is typing. */
export async function getIndicativePrice(params: URLSearchParams) {
  const res = await fetch(`${ZEROX_BASE}/swap/allowance-holder/price?${params.toString()}`, {
    headers: headers(),
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new ZeroExError(data?.reason ?? "Failed to fetch price", res.status, data);
  }
  return data;
}

/** Firm, executable quote — includes the transaction object to sign & send. */
export async function getFirmQuote(params: URLSearchParams) {
  const res = await fetch(`${ZEROX_BASE}/swap/allowance-holder/quote?${params.toString()}`, {
    headers: headers(),
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new ZeroExError(data?.reason ?? "Failed to fetch quote", res.status, data);
  }
  return data;
}
