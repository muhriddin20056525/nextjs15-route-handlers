import { redirect } from "next/navigation";

export async function GET() {
  redirect("/api/v2/users");
}
