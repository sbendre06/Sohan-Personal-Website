import { ReactNode } from "react";

interface SectionShellProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const SectionShell = ({ id, title, subtitle, children }: SectionShellProps) => {
  return (
    <section id={id} className="min-h-screen flex flex-col justify-center py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto w-full animate-slide-up">
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold neon-text mb-3">{title}</h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground font-light">{subtitle}</p>
          )}
          <div className="h-px w-24 bg-gradient-to-r from-primary to-transparent mt-4" />
        </div>
        {children}
      </div>
    </section>
  );
};

export default SectionShell;
