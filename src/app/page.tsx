// import Link from "next/link";

import SignOutButton from "@/components/signoutButton";
import { auth } from "@/server/auth";

// import { LatestPost } from "@/components/post";
// import { getServerAuthSession } from "@/server/auth";
// import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  // const session = await getServerAuthSession();
  const session = await auth();

  // console.log("session = ", session);

  // void api.post.getLatest.prefetch();

  // return <HydrateClient>Hello world!</HydrateClient>;

  return (
    <div className="container mx-auto">
      <h1>Hello World!</h1>
      <pre>{JSON.stringify(session)}</pre>
      <SignOutButton />
    </div>
  );
}
