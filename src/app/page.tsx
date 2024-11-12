import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

export default async function HomePage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  redirect("/dashboard");
} 