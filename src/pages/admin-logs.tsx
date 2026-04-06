import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { useAdmin } from '../../lib/adminContext';
import { useState, useMemo, useEffect } from 'react';
import { MdDownload, MdHistory } from 'react-icons/md';
import AdminLayout from '../../components/AdminLayout';

function AdminLogsContent() {
  const { getAuditLogsPaginated, exportAuditLogs } = useAdmin();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAction, setFilterAction] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const filters = useMemo(
    () => ({
      searchQuery: searchQuery || undefined,
      actionType: filterAction || undefined,
    }),
    [searchQuery, filterAction]
  );

  const { logs, total, pages } = useMemo(
    () => getAuditLogsPaginated(filters, page, pageSize),
    [filters, page, pageSize, getAuditLogsPaginated]
  );

  const handleExportCSV = () => {
    const csv = exportAuditLogs('csv', filters);
    downloadFile(csv, 'audit-logs.csv', 'text/csv');
  };

  const handleExportJSON = () => {
    const json = exportAuditLogs('json', filters);
    downloadFile(json, 'audit-logs.json', 'application/json');
  };

  const handleReset = () => {
    setSearchQuery('');
    setFilterAction('');
    setPage(1);
  };

  if (!isHydrated) {
    return (
      <VStack align="stretch" style={{ gap: '24px' }}>
        <Text fontSize="2xl" fontWeight="800">Loading...</Text>
      </VStack>
    );
  }

  return (
    <VStack align="stretch" style={{ gap: '24px' }}>
        {/* Header */}
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
            <Box>
              <Box display="flex" alignItems="center" gap={3} mb={1}>
                <MdHistory size={32} />
                <Text fontSize="2xl" fontWeight="800" color="#1a1a1a">
                  Audit Logs
                </Text>
              </Box>
              <Text fontSize="sm" color="gray.600">
                All admin actions and changes ({total} total logs)
              </Text>
            </Box>
            <Box display="flex" gap={2}>
              <Button size="sm" onClick={handleExportCSV} bg="#D9642E" color="white">
                Export CSV
              </Button>
              <Button size="sm" onClick={handleExportJSON} bg="#D9642E" color="white">
                Export JSON
              </Button>
              <Button size="sm" onClick={handleReset} variant="outline">
                Reset
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Filters */}
        <Box bg="white" p={5} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="sm" fontWeight="600" mb={4}>
            Filters
          </Text>
          <Box display="grid" gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #e6e6e6',
                fontSize: '14px',
              }}
            />
            <select
              value={filterAction}
              onChange={(e) => {
                setFilterAction(e.target.value);
                setPage(1);
              }}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #e6e6e6',
                fontSize: '14px',
              }}
            >
              <option value="">All Actions</option>
              <option value="CREATE">Create</option>
              <option value="UPDATE">Update</option>
              <option value="DELETE">Delete</option>
              <option value="PUBLISH">Publish</option>
              <option value="SUSPEND">Suspend</option>
            </select>
          </Box>
        </Box>

        {/* Logs Table */}
        <Box
          bg="white"
          borderRadius="lg"
          border="1px solid rgba(0,0,0,0.08)"
          overflowX="auto"
        >
          {/* Header Row */}
          <Box
            bg="gray.50"
            borderBottom="1px solid #e6e6e6"
            display={{ base: 'none', md: 'grid' }}
            gridTemplateColumns="200px 150px 120px 200px 100px 150px"
            p={4}
            fontWeight="700"
            color="#1a1a1a"
            fontSize="xs"
          >
            <Text>Timestamp</Text>
            <Text>Admin</Text>
            <Text>Action</Text>
            <Text>Resource</Text>
            <Text>Status</Text>
            <Text>Details</Text>
          </Box>

          {/* Log Rows */}
          {logs.length > 0 ? (
            logs.map((log) => (
              <Box
                key={log.id}
                borderBottom="1px solid #f0f0f0"
                p={4}
                display={{ base: 'block', md: 'grid' }}
                gridTemplateColumns={{ md: '200px 150px 120px 200px 100px 150px' }}
                gap={4}
                _hover={{ bg: 'gray.50' }}
              >
                <Box>
                  <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1}>
                    When
                  </Text>
                  <Text fontSize="xs" color="gray.700">
                    {new Date(log.timestamp).toLocaleString()}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1}>
                    Admin
                  </Text>
                  <Text fontSize="xs" fontWeight="600">
                    {log.adminEmail}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1}>
                    Action
                  </Text>
                  <Text fontSize="xs">{log.actionType}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1}>
                    Resource
                  </Text>
                  <Text fontSize="xs" fontWeight="600">
                    {log.resourceType}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {log.resourceId}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1}>
                    Status
                  </Text>
                  <Box
                    display="inline-block"
                    px={2}
                    py={1}
                    borderRadius="md"
                    bg={log.status === 'SUCCESS' ? '#d1fae5' : '#fee2e2'}
                    color={log.status === 'SUCCESS' ? '#065f46' : '#991b1b'}
                    fontSize="xs"
                    fontWeight="600"
                  >
                    {log.status}
                  </Box>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1}>
                    Details
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {log.details || '—'}
                  </Text>
                </Box>
              </Box>
            ))
          ) : (
            <Box p={8} textAlign="center">
              <Text color="gray.500" fontSize="sm">
                No logs found
              </Text>
            </Box>
          )}
        </Box>

        {/* Pagination */}
        <Box display="flex" gap={2} justifyContent="center" alignItems="center">
          <Button
            size="sm"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Text fontSize="sm" color="gray.600">
            Page {page} of {pages || 1}
          </Text>
          <Button
            size="sm"
            onClick={() => setPage(Math.min(pages, page + 1))}
            disabled={page >= pages}
          >
            Next
          </Button>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(parseInt(e.target.value));
              setPage(1);
            }}
            style={{
              padding: '6px 8px',
              borderRadius: '6px',
              border: '1px solid #e6e6e6',
              fontSize: '14px',
              width: '100px',
            }}
          >
            <option value="25">25 rows</option>
            <option value="50">50 rows</option>
            <option value="100">100 rows</option>
          </select>
        </Box>
      </VStack>
    );
}

export default function AdminLogs() {
  return (
    <AdminLayout>
      <AdminLogsContent />
    </AdminLayout>
  );
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
