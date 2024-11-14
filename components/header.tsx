"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Building2, ListChecks, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { usePathname } from "next/navigation";

export default function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const pathname = usePathname();

  // Don't show login/register buttons on their respective pages
  const showAuthButtons = !['/login', '/register'].includes(pathname);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          <span className="font-bold">DirectoryPro</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          {isAuthenticated && (
            <>
              <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium">
                <ListChecks className="h-4 w-4" />
                Dashboard
              </Link>
              <span className="text-sm text-muted-foreground">
                {user?.name}
              </span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={logout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </>
          )}
          {!isAuthenticated && showAuthButtons && (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Entrar
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="default" size="sm">
                  Cadastrar
                </Button>
              </Link>
            </>
          )}
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}