import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  return NextResponse.json(
    { message: "It is mock AI Response" },
    {
      status: 200,
    }
  );
};
