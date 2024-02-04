import Link from 'next/link';

export const Breadcrumb = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className="flex items-center gap-1 sm:gap-3 text-sm text-muted-foreground">
      {children}
    </ul>
  );
};

interface BreadcrumbItemProps {
  url: string;
  children: React.ReactNode;
  isLast?: boolean;
}

export const BreadcrumbItem = ({
  url,
  children,
  isLast = false,
}: BreadcrumbItemProps) => {
  if (isLast) {
    return (
      <li>
        <span className="font-medium cursor-default text-black">
          {children}
        </span>
      </li>
    );
  }

  return (
    <>
      <li className="hover:underline hover:text-black">
        <Link href={url}>{children}</Link>
      </li>
      <li>
        <span>/</span>
      </li>
    </>
  );
};
