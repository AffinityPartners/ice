'use client';

import {
  Download,
  FileSpreadsheet,
  FileJson,
  FileText,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { exportData, ExportFormat } from '@/lib/export-utils';
import { cn } from '@/lib/utils';

interface ExportButtonProps {
  data: any[];
  filename: string;
  prepareData?: (data: any[]) => any[];
  className?: string;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export default function ExportButton({
  data,
  filename,
  prepareData,
  className,
  disabled = false,
  variant = 'outline',
  size = 'default',
}: ExportButtonProps) {
  const handleExport = (format: ExportFormat) => {
    const exportableData = prepareData ? prepareData(data) : data;
    exportData({
      filename,
      format,
      data: exportableData,
    });
  };

  const isDisabled = disabled || !data || data.length === 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          disabled={isDisabled}
          className={cn(className)}
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport('csv')}>
          <FileText className="mr-2 h-4 w-4 text-green-600" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('excel')}>
          <FileSpreadsheet className="mr-2 h-4 w-4 text-green-700" />
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('json')}>
          <FileJson className="mr-2 h-4 w-4 text-blue-600" />
          Export as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}