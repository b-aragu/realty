import Link from "next/link";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "gold";
  className?: string;
}

export default function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center px-8 py-3.5 text-sm tracking-wide font-medium transition-all duration-300 rounded-sm";

  const variants = {
    primary:
      "bg-[#1c2340] text-white hover:bg-[#2e4480] hover:shadow-lg",
    secondary:
      "bg-[#2e4480] text-white hover:bg-[#1c2340] hover:shadow-lg",
    outline:
      "border border-[#1c2340] text-[#1c2340] hover:bg-[#1c2340] hover:text-white",
    gold:
      "bg-[#ffc14d] text-[#131110] hover:bg-[#ff922d] hover:text-white hover:shadow-lg font-semibold",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
