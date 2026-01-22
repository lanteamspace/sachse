interface SectionTitleProps {
  title: string;
  subtitle?: string;
  variant?: "primary" | "secondary";
}

const SectionTitle = ({ title, subtitle, variant = "primary" }: SectionTitleProps) => {
  const borderColor = variant === "primary" ? "border-primary" : "border-secondary";
  const dotColor = variant === "primary" ? "bg-primary" : "bg-secondary";
  const textColor = variant === "primary" ? "text-primary" : "text-secondary";

  return (
    <div className={`section-line ${borderColor} mb-8`}>
      <div className={`absolute left-0 top-0 w-2 h-2 rounded-full ${dotColor} -translate-x-[5px]`} 
        style={{ boxShadow: variant === "primary" ? "0 0 10px hsl(var(--primary))" : "0 0 10px hsl(var(--secondary))" }} 
      />
      <h2 className="text-xl md:text-3xl font-bold text-foreground">{title}</h2>
      {subtitle && (
        <p className={`font-mono ${textColor} text-[10px] md:text-sm uppercase tracking-widest mt-1`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
