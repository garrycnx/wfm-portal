import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <div style={{ padding: "40px" }}>
      <h1>Welcome, {session.user.name} 👋</h1>
      <p>You are logged in successfully.</p>
    </div>
  );
}
