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
  Globe,
  Activity,
  Sparkles,
  BarChart3,
  Shield,
  UserPlus,
  FileText,
  TrendingUp,
  CircleDollarSign,
  ChevronUp,
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
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuBadge,
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
import { Toaster } from '@/components/ui/toaster';
import { Card } from '@/components/ui/Card';
import Image from 'next/image';
import { PlusCircle } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
  description?: string;
  subItems?: { 
    name: string; 
    href: string; 
    icon?: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    description: 'Overview & statistics',
  },
  {
    name: 'Analytics',
    href: '/admin/web-analytics',
    icon: TrendingUp,
    description: 'Website performance',
  },
  {
    name: 'Content Hub',
    href: '/admin/blog',
    icon: FileText,
    subItems: [
      {
        name: 'Blog Posts',
        href: '/admin/blog',
        icon: Newspaper,
      },
      {
        name: 'Blog Categories',
        href: '/admin/blog/categories',
        icon: Tags,
      },
      {
        name: 'FAQ Articles',
        href: '/admin/faq',
        icon: HelpCircle,
      },
      {
        name: 'FAQ Categories',
        href: '/admin/faq/categories',
        icon: Tags,
      },
    ],
  },
  {
    name: 'Partner Program',
    href: '/admin/affiliates',
    icon: UserPlus,
    subItems: [
      {
        name: 'All Affiliates',
        href: '/admin/affiliates',
        icon: Users,
      },
      {
        name: 'Activity',
        href: '/admin/affiliate-activity',
        icon: Activity,
      },
      {
        name: 'Payouts',
        href: '/admin/payouts',
        icon: CircleDollarSign,
      },
    ],
  },
  {
    name: 'Activity Log',
    href: '/admin/activity',
    icon: History,
    description: 'System activity history',
  },
];

const settingsNavigation: NavItem[] = [
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    subItems: [
      {
        name: 'General',
        href: '/admin/settings',
        icon: Settings,
      },
      {
        name: 'Global',
        href: '/admin/global-settings',
        icon: Globe,
      },
    ],
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
    navigation.forEach(item => {
      if (item.subItems) {
        const shouldExpand = item.subItems.some(sub => pathname.startsWith(sub.href));
        if (shouldExpand && !expandedItems.includes(item.name)) {
          setExpandedItems(prev => [...prev, item.name]);
        }
      }
    });
    
    settingsNavigation.forEach(item => {
      if (item.subItems) {
        const shouldExpand = item.subItems.some(sub => pathname.startsWith(sub.href));
        if (shouldExpand && !expandedItems.includes(item.name)) {
          setExpandedItems(prev => [...prev, item.name]);
        }
      }
    });
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
        <Sidebar>
          <SidebarHeader>
            <Link href="/admin" className="flex items-center gap-3 px-2 py-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#235486] text-white">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">ICE Admin</span>
                <span className="text-xs text-muted-foreground">Control Center</span>
              </div>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.href === pathname || 
                      (item.subItems && item.subItems.some(sub => pathname.startsWith(sub.href)));
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
                                tooltip={item.name}
                                className={cn(
                                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
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
                                  const isSubActive = pathname === subItem.href;
                                  return (
                                    <SidebarMenuSubItem key={subItem.href}>
                                      <SidebarMenuSubButton
                                        asChild
                                        isActive={isSubActive}
                                      >
                                        <Link href={subItem.href}>
                                          {SubIcon && <SubIcon className="h-4 w-4" />}
                                          <span>{subItem.name}</span>
                                          {subItem.badge && (
                                            <SidebarMenuBadge>{subItem.badge}</SidebarMenuBadge>
                                          )}
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
                          tooltip={item.name}
                          isActive={pathname === item.href}
                        >
                          <Link href={item.href}>
                            <Icon className="h-4 w-4" />
                            <span>{item.name}</span>
                            {item.badge && (
                              <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {settingsNavigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.href === pathname || 
                      (item.subItems && item.subItems.some(sub => pathname.startsWith(sub.href)));
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
                                tooltip={item.name}
                                className={cn(
                                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
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
                                  const isSubActive = pathname === subItem.href;
                                  return (
                                    <SidebarMenuSubItem key={subItem.href}>
                                      <SidebarMenuSubButton
                                        asChild
                                        isActive={isSubActive}
                                      >
                                        <Link href={subItem.href}>
                                          {SubIcon && <SubIcon className="h-4 w-4" />}
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
                          tooltip={item.name}
                          isActive={pathname === item.href}
                        >
                          <Link href={item.href}>
                            <Icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session?.user?.image || ''} />
                        <AvatarFallback className="bg-[#235486] text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col flex-1 text-left">
                        <span className="text-sm font-medium">{session?.user?.name || 'Admin User'}</span>
                        <span className="text-xs text-muted-foreground">{session?.user?.email}</span>
                      </div>
                      <ChevronUp className="ml-auto h-4 w-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" align="start" className="w-[--radix-dropdown-menu-trigger-width]">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        <span>Back to Site</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            
            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-xl font-semibold">
                {navigation.find(item => item.href === pathname)?.name || 
                 settingsNavigation.find(item => item.href === pathname)?.name || 
                 navigation.find(item => item.subItems?.some(sub => pathname === sub.href))?.subItems?.find(sub => pathname === sub.href)?.name ||
                 settingsNavigation.find(item => item.subItems?.some(sub => pathname === sub.href))?.subItems?.find(sub => pathname === sub.href)?.name ||
                 'Dashboard'}
              </h1>

              <div className="flex items-center gap-2">
                {/* Page-specific actions */}
                {pathname === '/admin' && (
                  <>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/admin/activity">
                        <Activity className="mr-2 h-4 w-4" />
                        View Activity
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/admin/blog/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Post
                      </Link>
                    </Button>
                  </>
                )}
                {(pathname.startsWith('/admin/blog') || pathname === '/admin/blog') && pathname !== '/admin/blog/new' && (
                  <Button size="sm" asChild>
                    <Link href="/admin/blog/new">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Post
                    </Link>
                  </Button>
                )}
                
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#235486]" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-6">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}