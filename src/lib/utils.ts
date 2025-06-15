
export function cn(...args: any[]): string {
  // Simple classnames joiner
  return args.filter(Boolean).join(" ");
}
