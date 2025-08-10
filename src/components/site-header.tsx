'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { logout } from '@/store/slices/auth-slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { GraduationCap, LogOut, Menu, Shield, User } from 'lucide-react';

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

const navItems: { to: string; label: string }[] = [
  { to: '/', label: 'Home' },
  { to: '/exam/start', label: 'Exam' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/admin/dashboard', label: 'Admin' },
];

export default function SiteHeader() {
  const pathname = useLocation();
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const [open, setOpen] = useState(false);

  async function onLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    dispatch(logout());
    router('/');
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-emerald-600" />
          <span className="font-semibold">{'Test_School'}</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const hidden =
              item.to.startsWith('/admin') &&
              (!user || user.role === 'student');
            if (hidden) return null;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'text-sm text-muted-foreground hover:text-foreground',
                  pathname.pathname === item.to && 'text-foreground font-medium'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex"
                asChild
              >
                <Link to="/dashboard" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user.name || user.email}
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="hidden md:inline-flex bg-transparent"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {'Logout'}
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden md:inline-flex"
              >
                <Link to="/auth/login">{'Login'}</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="hidden md:inline-flex bg-emerald-600 hover:bg-emerald-700"
              >
                <Link to="/auth/register">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  {'Get Started'}
                </Link>
              </Button>
            </>
          )}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden bg-transparent"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="mt-6 flex flex-col gap-4">
                {navItems.map((item) => {
                  const hidden =
                    item.to.startsWith('/admin') &&
                    (!user || user.role === 'student');
                  if (hidden) return null;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'text-sm text-muted-foreground hover:text-foreground',
                        pathname.pathname === item.to &&
                          'text-foreground font-medium'
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="h-px bg-border" />
                {user ? (
                  <Button variant="outline" onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {'Logout'}
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      asChild
                      variant="outline"
                      onClick={() => setOpen(false)}
                    >
                      <Link to="/auth/login">{'Login'}</Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => setOpen(false)}
                    >
                      <Link to="/auth/register">{'Register'}</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
