import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return <p>Room: {router.query.id}</p>;
}

