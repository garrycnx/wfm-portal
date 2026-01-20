import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome {session.user?.name}</p>
    </div>
  );
}
