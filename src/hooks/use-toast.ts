
import { useState } from "react";

type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "success";
};

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  function toast({
    title,
    description,
    action,
    variant = "default",
  }: Omit<ToastProps, "id">) {
    const id = Math.random().toString(36).substring(2, 9);
    
    setToasts((toasts) => [
      ...toasts,
      { id, title, description, action, variant },
    ]);

    setTimeout(() => {
      setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
    }, 5000);
    
    return id;
  }

  function dismiss(toastId?: string) {
    setToasts((toasts) => 
      toastId 
        ? toasts.filter((toast) => toast.id !== toastId)
        : []
    );
  }

  return {
    toasts,
    toast,
    dismiss,
  };
};

export const toast = {
  default: (props: Omit<ToastProps, "id" | "variant">) => {
    const { toast: showToast } = useToast();
    showToast({ ...props, variant: "default" });
  },
  destructive: (props: Omit<ToastProps, "id" | "variant">) => {
    const { toast: showToast } = useToast();
    showToast({ ...props, variant: "destructive" });
  },
  success: (props: Omit<ToastProps, "id" | "variant">) => {
    const { toast: showToast } = useToast();
    showToast({ ...props, variant: "success" });
  },
};
