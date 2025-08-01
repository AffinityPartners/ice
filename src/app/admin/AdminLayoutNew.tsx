'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Settings,
  Newspaper,
  Users,
  HelpCircle,
  Menu,
  X,
  User,
  LogOut,
  Home,
  ChevronDown,
  ChevronRight,
  Tags,
  Bell,
  History,
  Handshake,
  DollarSign,
  BarChart3,
  Globe,
  Activity,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  subItems?: { name: string; href: string; icon?: React.ComponentType<{ className?: string }> }[];
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    name: 'Web Analytics',
    href: '/admin/web-analytics',
    icon: Globe,
  },
  {
    name: 'Blog',
    href: '/admin/blog',
    icon: Newspaper,
    subItems: [
      {
        name: 'All Posts',
        href: '/admin/blog',
        icon: Newspaper,
      },
      {
        name: 'Categories',
        href: '/admin/blog/categories',
        icon: Tags,
      },
    ],
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    name: 'Affiliates',
    href: '/admin/affiliates',
    icon: Handshake,
  },
  {
    name: 'Payouts',
    href: '/admin/payouts',
    icon: DollarSign,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
  {
    name: 'FAQ',
    href: '/admin/faq',
    icon: HelpCircle,
    subItems: [
      {
        name: 'All FAQs',
        href: '/admin/faq',
        icon: HelpCircle,
      },
      {
        name: 'Categories',
        href: '/admin/faq/categories',
        icon: Tags,
      },
    ],
  },
  {
    name: 'Activity Logs',
    href: '/admin/activity',
    icon: History,
  },
  {
    name: 'Global Settings',
    href: '/admin/global-settings',
    icon: Settings,
  },
  {
    name: 'Profile',
    href: '/admin/profile',
    icon: User,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    // Auto-expand menus based on current path
    if (pathname.startsWith('/admin/blog') && !expandedItems.includes('Blog')) {
      setExpandedItems(prev => [...prev, 'Blog']);
    }
    if (pathname.startsWith('/admin/faq') && !expandedItems.includes('FAQ')) {
      setExpandedItems(prev => [...prev, 'FAQ']);
    }
  }, [pathname]);

  const getUserInitials = () => {
    if (session?.user?.name) {
      const names = session.user.name.split(' ');
      return names
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return session?.user?.email?.[0]?.toUpperCase() || 'U';
  };

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className="border-r bg-card">
          <SidebarHeader className="border-b px-4 py-3">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Activity className="h-5 w-5" />
              </div>
              <span className="font-semibold">ICE Admin</span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === pathname || 
                  (item.subItems && item.subItems.some(sub => sub.href === pathname));
                const isExpanded = expandedItems.includes(item.name);

                if (item.subItems) {
                  return (
                    <Collapsible
                      key={item.name}
                      open={isExpanded}
                      onOpenChange={() => toggleExpanded(item.name)}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton 
                            className={cn(
                              "w-full",
                              isActive && "bg-primary/10 text-primary"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.name}</span>
                            <ChevronRight className={cn(
                              "ml-auto h-4 w-4 transition-transform",
                              isExpanded && "rotate-90"
                            )} />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => {
                              const SubIcon = subItem.icon;
                              return (
                                <SidebarMenuSubItem key={subItem.href}>
                                  <SidebarMenuSubButton
                                    asChild
                                    className={cn(
                                      pathname === subItem.href && "bg-primary/10 text-primary"
                                    )}
                                  >
                                    <Link href={subItem.href}>
                                      {SubIcon && <SubIcon className="h-3 w-3" />}
                                      <span>{subItem.name}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        pathname === item.href && "bg-primary/10 text-primary"
                      )}
                    >
                      <Link href={item.href}>
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 px-2"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={session?.user?.image || undefined} />
                    <AvatarFallback className="bg-primary/10 text-xs">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col items-start truncate">
                    <span className="text-sm font-medium truncate">
                      {session?.user?.name || session?.user?.email}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {session?.user?.email}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 ml-auto opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="cursor-pointer">
                    <Home className="mr-2 h-4 w-4" />
                    Main Site
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger className="-ml-2" />
            <div className="flex flex-1 items-center justify-between">
              <h1 className="font-semibold">Admin Dashboard</h1>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-6">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}