import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGet = (endpoint) => {
  const axiosGet = useAxiosPublic();

  const { status, isLoading, data, error, refetch } = useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      try {
        const res = await axiosGet.get(endpoint);
        return res.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  return { status, data, error, isLoading, refetch };
};

export default useGet
