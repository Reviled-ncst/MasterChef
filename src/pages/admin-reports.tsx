import { Box, Text, VStack, Button, Badge } from '@chakra-ui/react';
import { MdFileDownload } from 'react-icons/md';
import AdminLayout from '../../components/AdminLayout';

function AdminReportsContent() {
  const reports = [
    { name: 'User Activity', date: '2024-04-05', type: 'Ready', size: '2.4 MB' },
    { name: 'Content Performance', date: '2024-04-04', type: 'Ready', size: '1.8 MB' },
    { name: 'System Health', date: '2024-04-03', type: 'Ready', size: '0.9 MB' },
  ];

  const handleGenerateReport = () => {
    alert('Report generated! Download options: CSV, JSON, PDF');
  };

  return (
      <VStack align="stretch" style={{ gap: '24px' }}>
        {/* Header */}
        <Box>
          <Box display="flex" alignItems="center" gap={3} mb={1}>
            <MdFileDownload size={32} />
            <Text fontSize="2xl" fontWeight="800" color="#1a1a1a">
              Reporting & Export
            </Text>
          </Box>
          <Text fontSize="sm" color="gray.600">
            Generate and export reports
          </Text>
        </Box>

        {/* Report Generator */}
        <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="lg" fontWeight="700" color="#1a1a1a" mb={4}>
            Generate New Report
          </Text>
          <VStack align="stretch" style={{ gap: '16px' }}>
            <Box>
              <Text fontSize="sm" fontWeight="600" color="#1a1a1a" mb={2}>
                Report Type
              </Text>
              <select
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #e6e6e6',
                  fontSize: '14px',
                }}
              >
                <option>User Activity Report</option>
                <option>Content Performance</option>
                <option>System Health Report</option>
                <option>Security & Audit</option>
                <option>Financial Report</option>
              </select>
            </Box>

            <Box display={{ base: 'block', md: 'flex' }} gap={4}>
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="600" color="#1a1a1a" mb={2}>
                  From
                </Text>
                <input
                  type="date"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #e6e6e6',
                    fontSize: '14px',
                  }}
                />
              </Box>
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="600" color="#1a1a1a" mb={2}>
                  To
                </Text>
                <input
                  type="date"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #e6e6e6',
                    fontSize: '14px',
                  }}
                />
              </Box>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="600" color="#1a1a1a" mb={2}>
                Export Format
              </Text>
              <Box display="flex" gap={2}>
                {['CSV', 'JSON', 'PDF'].map((format) => (
                  <label key={format} style={{ display: 'flex', gap: '4px', alignItems: 'center', cursor: 'pointer', fontSize: '14px' }}>
                    <input type="radio" name="format" defaultChecked={format === 'CSV'} />
                    {format}
                  </label>
                ))}
              </Box>
            </Box>

            <Button bg="#D9642E" color="white" w="100%" onClick={handleGenerateReport}>
              Generate Report
            </Button>
          </VStack>
        </Box>

        {/* Recent Reports */}
        <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="lg" fontWeight="700" color="#1a1a1a" mb={4}>
            Recent Reports
          </Text>
          <Box bg="gray.50" borderRadius="lg" overflowX="auto">
            <Box display={{ base: 'none', md: 'grid' }} gridTemplateColumns="2fr 1fr 1fr 1fr" p={4} fontWeight="700" color="#1a1a1a" fontSize="xs" borderBottom="1px solid #e6e6e6">
              <Text>Report</Text>
              <Text>Generated</Text>
              <Text>Size</Text>
              <Text>Actions</Text>
            </Box>
            {reports.map((report) => (
              <Box
                key={report.name}
                display={{ base: 'block', md: 'grid' }}
                gridTemplateColumns={{ md: '2fr 1fr 1fr 1fr' }}
                p={4}
                borderBottom="1px solid #e6e6e6"
                _last={{ borderBottom: 'none' }}
              >
                <Box mb={{ base: 4, md: 0 }}>
                  <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1} display={{ base: 'block', md: 'none' }}>
                    Report
                  </Text>
                  <Text fontSize="sm" fontWeight="600">
                    {report.name}
                  </Text>
                </Box>
                <Box mb={{ base: 4, md: 0 }}>
                  <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1} display={{ base: 'block', md: 'none' }}>
                    Generated
                  </Text>
                  <Text fontSize="sm">{report.date}</Text>
                </Box>
                <Box mb={{ base: 4, md: 0 }}>
                  <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1} display={{ base: 'block', md: 'none' }}>
                    Size
                  </Text>
                  <Text fontSize="sm">{report.size}</Text>
                </Box>
                <Box display="flex" gap={2}>
                  <Button size="xs" variant="outline">
                    Download
                  </Button>
                  <Button size="xs" variant="outline">
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Scheduled Reports */}
        <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
          <Text fontSize="lg" fontWeight="700" color="#1a1a1a" mb={4}>
            Scheduled Reports
          </Text>
          <Box display="grid" gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
            <Box bg="gray.50" p={4} borderRadius="lg">
              <Text fontSize="sm" fontWeight="600" color="#1a1a1a" mb={2}>
                Weekly Summary
              </Text>
              <Text fontSize="xs" color="gray.600" mb={3}>
                Every Monday at 9:00 AM
              </Text>
              <Box display="flex" gap={2}>
                <Button size="xs" variant="outline" flex={1}>
                  Edit
                </Button>
                <Button size="xs" variant="outline" flex={1}>
                  Delete
                </Button>
              </Box>
            </Box>
            <Box bg="gray.50" p={4} borderRadius="lg">
              <Text fontSize="sm" fontWeight="600" color="#1a1a1a" mb={2}>
                Monthly Report
              </Text>
              <Text fontSize="xs" color="gray.600" mb={3}>
                1st of each month at 8:00 AM
              </Text>
              <Box display="flex" gap={2}>
                <Button size="xs" variant="outline" flex={1}>
                  Edit
                </Button>
                <Button size="xs" variant="outline" flex={1}>
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>
          <Button variant="outline" w="100%" mt={4}>
            + Create Scheduled Report
          </Button>
        </Box>
      </VStack>
    );
}

export default function AdminReports() {
  return (
    <AdminLayout>
      <AdminReportsContent />
    </AdminLayout>
  );
}
