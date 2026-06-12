"use client";

import NextLink from "next/link";
import { useRouter as useNextRouter, usePathname, useParams as useNextParams } from "next/navigation";
import { forwardRef, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export interface AppLinkProps extends Omit<AnchorProps, "href"> {
  to: string;
  children?: React.ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ to, children, ...rest }, ref) => (
    <NextLink href={to} ref={ref} {...rest}>
      {children}
    </NextLink>
  ),
);
Link.displayName = "Link";

export interface AppNavLinkProps extends Omit<ComponentProps<typeof NextLink>, "href" | "className"> {
  to: string;
  className?: string;
  activeClassName?: string;
}

export const NavLink = forwardRef<HTMLAnchorElement, AppNavLinkProps>(
  ({ className, activeClassName, to, ...props }, ref) => {
    const pathname = usePathname() ?? "/";
    const isActive = pathname === to;

    return (
      <NextLink
        ref={ref}
        href={to}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);
NavLink.displayName = "NavLink";

export function useRouter() {
  const router = useNextRouter();
  const pathname = usePathname() ?? "/";

  return {
    pathname,
    push: (to: string) => router.push(to),
    back: () => router.back(),
  };
}

export function useParams<T extends Record<string, string | undefined> = Record<string, string | undefined>>() {
  return useNextParams() as T;
}
