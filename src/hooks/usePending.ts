import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const usePending = ({
  isPending,
  message,
}: {
  isPending: boolean;
  message: string;
}) => {
  const toastId = useRef<number>();
  useEffect(() => {
    if (isPending) {
      toastId.current = toast.loading(message) as number;
    } else if (toastId.current !== null) {
      toast.dismiss(toastId.current);
    }
  }, [isPending, message]);
};

export default usePending;
