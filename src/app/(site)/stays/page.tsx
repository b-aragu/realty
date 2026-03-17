import StaysClient from "./StaysClient";
import { getStays } from "@/sanity/fetch";

// Revalidate every hour
export const revalidate = 3600;

export default async function StaysPage() {
  const stays = await getStays();

  return <StaysClient stays={stays} />;
}
