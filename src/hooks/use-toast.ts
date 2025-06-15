
type ToastProps = { title: string; description?: string; variant?: string };

export function toast(props: ToastProps) {
  alert(`${props.title}: ${props.description || ""}`);
}

// Minimal placeholder for useToast hook
export function useToast() {
  return {
    toast,
  };
}
