import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "../user";

export default function useSearch({ search }) {
  const { data: user } = useUser();

  return useQuery(
    ["accounts", user?.id, "search", search],
    async () => {
      const { data } = await axios.get("/api/accounts", {
        params: { search: search },
      });

      return data;
    },
    {
      enabled: Boolean(user?.enableQueries) && Boolean(search),
    }
  );
}
