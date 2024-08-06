import { useQuery } from "@tanstack/react-query";

type PaginatedResults<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

type API = {
  "/pokemon": PaginatedResults<{
    name: string;
    url: string;
  }>;
};

type ItemOf<T> = T extends (infer I)[] ? I : never;

export type APIResult<T extends keyof API> = ItemOf<API[T]["results"]>;

export function useFetchQuery<T extends keyof API>(url: T) {
  return useQuery({
    queryKey: [url],
    queryFn: () => {
      return fetch("https://pokeapi.co/api/v2" + url, {
        headers: {
          Accept: "application/json",
        },
      }).then((r) => r.json()) as Promise<API[T]>;
    },
  });
}
