import { NextResponse } from "next/server";

type UserV2 = {
  id: string;
  email: string;
  fullname: string;
};

export async function GET() {
  const users: UserV2[] = [
    { id: "1", email: "alice@example.com", fullname: "Alice Johnson" },
    { id: "2", email: "bob@example.com", fullname: "Bob Smith" },
    { id: "3", email: "carol@example.com", fullname: "Carol Davis" },
    { id: "4", email: "david@example.com", fullname: "David Wilson" },
    { id: "5", email: "emma@example.com", fullname: "Emma Brown" },
    { id: "6", email: "frank@example.com", fullname: "Frank Moore" },
    { id: "7", email: "grace@example.com", fullname: "Grace Taylor" },
    { id: "8", email: "henry@example.com", fullname: "Henry Anderson" },
    { id: "9", email: "irene@example.com", fullname: "Irene Thomas" },
    { id: "10", email: "jack@example.com", fullname: "Jack Lee" },
  ];

  return NextResponse.json({ users });
}
