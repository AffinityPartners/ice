'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  User,
  Shield,
  UserIcon,
  Clock,
  Info,
  ChevronDown,
  ChevronUp,
  Activity,
  DollarSign,
  FileText,
  Settings,
  TrendingUp,
  Laptop,
  Globe,
} from 'lucide-react';
import { format } from 'date-fns';
import ExportButton from '@/components/ui/ExportButton';
import { prepareActivityLogDataForExport } from '@/lib/export-utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ActivityLog {
  id: string;
  actorId: string;
  actorRole: string;
  action: string;
  target?: any;
  metadata?: any;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: Date;
  actor: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

interface ActivityTableProps {
  initialLogs: ActivityLog[];
}

export default function ActivityTable({ initialLogs }: ActivityTableProps) {
  const [logs, setLogs] = useState(initialLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Get unique actions for filter
  const uniqueActions = Array.from(new Set(initialLogs.map(log => log.action)));

  const getActionIcon = (action: string) => {
    if (action.includes('payment') || action.includes('commission')) return DollarSign;
    if (action.includes('blog') || action.includes('post')) return FileText;
    if (action.includes('settings') || action.includes('config')) return Settings;
    if (action.includes('user') || action.includes('profile')) return User;
    if (action.includes('admin')) return Shield;
    if (action.includes('affiliate')) return TrendingUp;
    return Activity;
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return Shield;
      case 'AFFILIATE':
        return TrendingUp;
      case 'USER':
        return UserIcon;
      default:
        return UserIcon;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'destructive';
      case 'AFFILIATE':
        return 'secondary';
      case 'USER':
        return 'default';
      default:
        return 'outline';
    }
  };

  const getActionBadgeVariant = (action: string) => {
    if (action.includes('delete') || action.includes('remove')) return 'destructive';
    if (action.includes('create') || action.includes('add')) return 'default';
    if (action.includes('update') || action.includes('edit')) return 'secondary';
    return 'outline';
  };

  const toggleRowExpansion = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const formatActionName = (action: string) => {
    return action
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const parseUserAgent = (userAgent: string | null) => {
    if (!userAgent) return { browser: 'Unknown', os: 'Unknown' };
    
    // Simple parsing - in production, use a proper UA parser
    let browser = 'Unknown';
    let os = 'Unknown';
    
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'macOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS')) os = 'iOS';
    
    return { browser, os };
  };

  // Filter logs based on search and filters
  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.actor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'all' || log.actorRole === roleFilter;
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;

    const logDate = new Date(log.createdAt);
    const matchesStartDate = !dateRange.start || logDate >= new Date(dateRange.start);
    const matchesEndDate = !dateRange.end || logDate <= new Date(dateRange.end);

    return matchesSearch && matchesRole && matchesAction && matchesStartDate && matchesEndDate;
  });



  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by user or action..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="AFFILIATE">Affiliate</SelectItem>
              <SelectItem value="USER">User</SelectItem>
            </SelectContent>
          </Select>

          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              {uniqueActions.map(action => (
                <SelectItem key={action} value={action}>
                  {formatActionName(action)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-[140px]"
              placeholder="Start date"
            />
            <Input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-[140px]"
              placeholder="End date"
            />
          </div>

          <ExportButton
            data={filteredLogs}
            filename="activity-logs"
            prepareData={prepareActivityLogDataForExport}
            disabled={filteredLogs.length === 0}
            className="w-full sm:w-auto"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredLogs.length} of {logs.length} activity logs
        </p>
        {(searchTerm || roleFilter !== 'all' || actionFilter !== 'all' || dateRange.start || dateRange.end) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setRoleFilter('all');
              setActionFilter('all');
              setDateRange({ start: '', end: '' });
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground h-32">
                  No activity logs found
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => {
                const isExpanded = expandedRows.has(log.id);
                const ActionIcon = getActionIcon(log.action);
                const RoleIcon = getRoleIcon(log.actorRole);
                const { browser, os } = parseUserAgent(log.userAgent || null);

                return (
                  <React.Fragment key={log.id}>
                    <TableRow className={cn(isExpanded && "border-b-0")}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={log.actor.image || undefined} />
                            <AvatarFallback>
                              {log.actor.name?.charAt(0).toUpperCase() || 
                               log.actor.email?.charAt(0).toUpperCase() || '?'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              {log.actor.name || 'Unknown User'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {log.actor.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ActionIcon className="h-4 w-4 text-muted-foreground" />
                          <Badge variant={getActionBadgeVariant(log.action)}>
                            {formatActionName(log.action)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(log.actorRole)}>
                          <RoleIcon className="mr-1 h-3 w-3" />
                          {log.actorRole}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{format(new Date(log.createdAt), 'MMM d, yyyy')}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(log.createdAt), 'h:mm a')}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleRowExpansion(log.id)}
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                    {isExpanded && (
                      <TableRow>
                        <TableCell colSpan={5} className="p-0">
                          <div className="p-4 space-y-4 bg-muted/50">
                                <div className="grid gap-4 md:grid-cols-2">
                                  {/* IP Address and Location */}
                                  <div>
                                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                                      <Globe className="h-4 w-4 text-muted-foreground" />
                                      Network Details
                                    </h4>
                                    <div className="space-y-1 text-sm">
                                      <p>
                                        <span className="text-muted-foreground">IP Address:</span>{' '}
                                        <code className="bg-background px-1 py-0.5 rounded">
                                          {log.ipAddress || 'Not recorded'}
                                        </code>
                                      </p>
                                    </div>
                                  </div>

                                  {/* User Agent */}
                                  <div>
                                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                                      <Laptop className="h-4 w-4 text-muted-foreground" />
                                      Device Info
                                    </h4>
                                    <div className="space-y-1 text-sm">
                                      <p>
                                        <span className="text-muted-foreground">Browser:</span> {browser}
                                      </p>
                                      <p>
                                        <span className="text-muted-foreground">OS:</span> {os}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Target Details */}
                                {log.target && (
                                  <div>
                                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                      Target Details
                                    </h4>
                                    <pre className="text-xs bg-background p-3 rounded-lg overflow-x-auto">
                                      {JSON.stringify(log.target, null, 2)}
                                    </pre>
                                  </div>
                                )}

                                {/* Metadata */}
                                {log.metadata && (
                                  <div>
                                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                      Additional Metadata
                                    </h4>
                                    <pre className="text-xs bg-background p-3 rounded-lg overflow-x-auto">
                                      {JSON.stringify(log.metadata, null, 2)}
                                    </pre>
                                  </div>
                                )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}