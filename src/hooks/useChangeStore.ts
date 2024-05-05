import updateStore from "@/services/updateStore";
import { useMutation } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import usePending from "./usePending";

const useChangeStore = ({ errorMessage }: { errorMessage: string | null }) => {
  const session = useSession();

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  const { isPending, mutate } = useMutation({
    mutationFn: ({
      formData,
      language,
    }: {
      formData: FormData;
      language: string;
    }) =>
      updateStore(
        formData,
        session.data?.user.storeOwner.stores[0].id!,
        session.data?.user.token!,
        language
      ),
    onError: (error: any) => {
      if (error.response.status === 401) {
        signOut();
      }
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
    },
  });

  usePending({ isPending, message: "Updating restaurant data..." });

  return { mutate };
};

export default useChangeStore;
