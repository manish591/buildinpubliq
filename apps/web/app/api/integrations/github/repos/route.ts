import { getUserRepositories } from "@/app/data/github/get-user-repositories";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const data = await getUserRepositories();

    return new Response(JSON.stringify({
      data,
      message: "Successfully fetched the users repos",
    }), {
      status: 200
    });
  } catch (err) {
    console.log("Failed to fetch users repos", err);
    return new Response(JSON.stringify({
      message: 'Failed to fetch users repos'
    }), {
      status: 500
    });
  }
}