import { NextRequest, NextResponse } from "next/server";
import { getIndicativePrice, ZeroExError } from "@/lib/zeroex";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams;
  const required = ["chainId", "sellToken", "buyToken", "sellAmount"];
  for (const key of required) {
    if (!search.get(key)) {
      return NextResponse.json({ error: `Missing required param: ${key}` }, { status: 400 });
    }
  }

  const params = new URLSearchParams({
    chainId: search.get("chainId")!,
    sellToken: search.get("sellToken")!,
    buyToken: search.get("buyToken")!,
    sellAmount: search.get("sellAmount")!,
  });
  if (search.get("taker")) params.set("taker", search.get("taker")!);
  if (search.get("slippageBps")) params.set("slippageBps", search.get("slippageBps")!);

  try {
    const data = await getIndicativePrice(params);
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof ZeroExError) {
      return NextResponse.json({ error: err.message, details: err.details }, { status: err.status });
    }
    return NextResponse.json({ error: "Unexpected error fetching price." }, { status: 500 });
  }
}
