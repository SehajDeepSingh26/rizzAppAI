import { CreditsController } from "@/lib/server/controller/credits";
import { UserController } from "@/lib/server/controller/user";
import { NextResponse } from "next/server";

export async function GET() {
//   const user = await UserController.getUserFromCookies();
const user = {
    email: 'sehajdeep2611@gmail.com',
    stripe_customer: 'cus_RiVPFdd05mt7Z1'
  }
  if (!user) {
    return new NextResponse(null, { status: 401 });
  }

  const { stripe_customer } = user;
  const balance = await CreditsController.getCreditBalance(stripe_customer);

  return NextResponse.json({ balance });
}
