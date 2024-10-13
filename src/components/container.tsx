import { cn } from "@/lib/utils";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(className)}>
      <div className="m-auto max-w-[1280px] px-5 md:px-10">{children}</div>
    </div>
  );
};

export default Container;
