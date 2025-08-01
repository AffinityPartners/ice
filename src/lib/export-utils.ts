import * as XLSX from 'xlsx';
import { Parser } from 'json2csv';

export type ExportFormat = 'csv' | 'excel' | 'json';

interface ExportOptions {
  filename: string;
  format: ExportFormat;
  data: any[];
  fields?: string[];
  headers?: Record<string, string>;
}

export function exportData({ filename, format, data, fields, headers }: ExportOptions) {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  switch (format) {
    case 'csv':
      exportToCSV(data, filename, fields, headers);
      break;
    case 'excel':
      exportToExcel(data, filename, headers);
      break;
    case 'json':
      exportToJSON(data, filename);
      break;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}

function exportToCSV(data: any[], filename: string, fields?: string[], headers?: Record<string, string>) {
  try {
    const parser = new Parser({
      fields: fields || Object.keys(data[0]),
      header: true,
      ...(headers && { fields: Object.keys(headers).map(field => ({
        label: headers[field],
        value: field
      })) })
    });
    
    const csv = parser.parse(data);
    downloadFile(csv, `${filename}.csv`, 'text/csv');
  } catch (error) {
    console.error('CSV export error:', error);
    alert('Failed to export CSV');
  }
}

function exportToExcel(data: any[], filename: string, headers?: Record<string, string>) {
  try {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Apply custom headers if provided
    if (headers) {
      const headerRow = Object.keys(data[0]).map(key => headers[key] || key);
      XLSX.utils.sheet_add_aoa(ws, [headerRow], { origin: 'A1' });
    }
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    
    // Generate Excel file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    downloadFile(blob, `${filename}.xlsx`);
  } catch (error) {
    console.error('Excel export error:', error);
    alert('Failed to export Excel');
  }
}

function exportToJSON(data: any[], filename: string) {
  try {
    const json = JSON.stringify(data, null, 2);
    downloadFile(json, `${filename}.json`, 'application/json');
  } catch (error) {
    console.error('JSON export error:', error);
    alert('Failed to export JSON');
  }
}

function downloadFile(content: string | Blob, filename: string, mimeType?: string) {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType || 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Utility functions for formatting data before export
export function formatDateForExport(date: Date | string | null): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
}

export function formatBooleanForExport(value: boolean): string {
  return value ? 'Yes' : 'No';
}

export function formatCurrencyForExport(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

// Prepare user data for export
export function prepareUserDataForExport(users: any[]) {
  return users.map(user => ({
    'ID': user.id,
    'Name': user.name || '',
    'Email': user.email || '',
    'Role': user.role,
    'Email Verified': formatBooleanForExport(!!user.emailVerified),
    'Created': formatDateForExport(user.createdAt),
    'Last Updated': formatDateForExport(user.updatedAt),
    'Sessions': user._count?.sessions || 0,
    'Is Affiliate': formatBooleanForExport(!!user.affiliate),
  }));
}

// Prepare affiliate data for export
export function prepareAffiliateDataForExport(affiliates: any[]) {
  return affiliates.map(affiliate => ({
    'ID': affiliate.id,
    'Name': `${affiliate.firstName || ''} ${affiliate.lastName || ''}`.trim() || affiliate.companyName || '',
    'Email': affiliate.contactEmail || affiliate.user?.email || '',
    'Company': affiliate.companyName || '',
    'Status': affiliate.isActive ? 'Active' : 'Inactive',
    'Total Earned': formatCurrencyForExport(affiliate.total_earned_cents || 0),
    'Unpaid Balance': formatCurrencyForExport(affiliate.unpaid_balance_cents || 0),
    'Referrals': affiliate._count?.referrals || 0,
    'Conversions': affiliate.conversions || 0,
    'Stripe Connected': formatBooleanForExport(!!affiliate.stripe_account_id),
    'Created': formatDateForExport(affiliate.updatedAt),
  }));
}

// Prepare activity log data for export
export function prepareActivityLogDataForExport(logs: any[]) {
  return logs.map(log => ({
    'ID': log.id,
    'Actor': log.actor?.name || log.actor?.email || 'Unknown',
    'Role': log.actorRole,
    'Action': log.action.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
    'Target': log.target || '',
    'IP Address': log.ipAddress || '',
    'Time': formatDateForExport(log.createdAt),
    'Metadata': log.metadata ? JSON.stringify(log.metadata) : '',
  }));
}

// Prepare blog post data for export
export function prepareBlogPostDataForExport(posts: any[]) {
  return posts.map(post => ({
    'ID': post.id,
    'Title': post.title,
    'Slug': post.slug,
    'Author': post.author || '',
    'Category': post.category?.name || 'Uncategorized',
    'Status': post.published ? 'Published' : 'Draft',
    'Views': post.viewCount || 0,
    'Featured Order': post.featuredOrder || '',
    'Tags': post.tags?.join(', ') || '',
    'Created': formatDateForExport(post.createdAt),
    'Published': formatDateForExport(post.publishedAt),
    'Reading Time': post.readingTime || '',
  }));
}