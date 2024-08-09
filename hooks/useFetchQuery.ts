import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

type PaginatedResults<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

type API = {
  "/pokemon?limit=21": PaginatedResults<{
    name: string;
    url: string;
  }>;
  "/pokemon-species/:id": {
    flavor_text_entries: {
      flavor_text: string;
      language: {
        name: string;
      };
    }[];
  };
  "/pokemon/:id": {
    id: number;
    name: string;
    url: string;
    weight: number;
    height: number;
    moves: { move: { name: string } }[];
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[];
  };
  types: {
    type: {
      name: string;
    };
  }[];
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
    queryFn: async () => {
      await wait(1000);
      return fetch("https://pokeapi.co/api/v2" + localUrl, {
        headers: {
          Accept: "application/json",
        },
      }).then((r) => r.json()) as Promise<API[T]>;
    },
  });
}

export function useInfiniteFetchQuery<T extends keyof API>(
  url: T,
  params?: Record<string, string | number>,
) {
  const localUrl = Object.entries(params ?? {}).reduce(
    (acc, [key, value]) => acc.replace(":" + key, value.toString()),
    url as string,
  );
  return useInfiniteQuery({
    queryKey: [localUrl],
    initialPageParam: "https://pokeapi.co/api/v2" + localUrl,
    queryFn: async ({ pageParam }) => {
      await wait(1000);
      return fetch(pageParam, {
        headers: {
          Accept: "application/json",
        },
      }).then((r) => r.json()) as Promise<API[T]>;
    },
    getNextPageParam: (lastPage) => {
      if (!("next" in lastPage)) {
        throw new Error("Unpaginated result");
      }
      return lastPage.next;
    },
  });
}
const wait = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};
