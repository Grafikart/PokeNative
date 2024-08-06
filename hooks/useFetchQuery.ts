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
  "/pokemon/:id": {
    id: number;
    name: string;
    url: string;
    types: {
      type: {
        name: string;
      };
    }[];
  };
};

type ItemOf<T> = T extends (infer I)[] ? I : never;

export type APIResult<T extends keyof API> = ItemOf<API[T]["results"]>;

export function useFetchQuery<T extends keyof API>(
  url: T,
  params?: Record<string, string | number>,
) {
  const localUrl = Object.entries(params ?? {}).reduce(
    (acc, [key, value]) => acc.replace(":" + key, value.toString()),
    url as string,
  );
  return useQuery({
    queryKey: [localUrl],
    queryFn: () => {
      return fetch("https://pokeapi.co/api/v2" + localUrl, {
        headers: {
          Accept: "application/json",
        },
      }).then((r) => r.json()) as Promise<API[T]>;
    },
  });
}
