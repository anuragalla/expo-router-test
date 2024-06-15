import { useQuery } from "@tanstack/react-query";

export function useBootstrap() {
  return useQuery({
    queryKey: ["bootstrap"],
    // settimeout using promise
    queryFn: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ redirectUrl: "/explore" });
        }, 1000);
      }),
  });
}
