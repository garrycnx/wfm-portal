import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <div>
      <h1>Welcome {session.user?.name}</h1>
      <p>{session.user?.email}</p>
    </div>
  );
}
