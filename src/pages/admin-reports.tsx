'use client';

import { Box, Container, Heading, Text, VStack, HStack, Button, Grid } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';

export default function AdminReports() {
  const reports = [
    { name: 'User Activity', date: '2026-04-05', size: '2.4 MB' },
  ];

  const handleGenerateReport = () => {
    alert('Report generated! Download options: CSV, JSON, PDF');
  };

  return (
    <>
      <Sidebar />
      <Box minH="100vh" py={12} color="gray.100" ml={{ base: 0, md: '280px' }} transition="margin 0.3s ease">
        <Container maxW="container.lg">
        <VStack align="stretch" gap={8}>
          {/* Header */}
          <HStack justify="space-between" align="flex-start">
            <Box>
              <Heading as="h1" size="xl" mb={2}>
                Reporting & Export
              </Heading>
              <Text color="gray.400">
                Generate and export reports
              </Text>
            </Box>
            <Button
              bg="#D9642E"
              color="white"
              fontWeight="700"
              _hover={{ bg: '#C65525', transform: 'translateY(-2px)' }}
              transition="all 0.2s"
              onClick={handleGenerateReport}
            >
              Generate Report
            </Button>
          </HStack>

          {/* Report Stats */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
            {[
              { label: 'Total Reports', value: '12', desc: 'Generated' },
              { label: 'This Week', value: '3', desc: 'New reports' },
              { label: 'Avg. Size', value: '1.8 MB', desc: 'Per report' },
              { label: 'Storage Used', value: '21.6 MB', desc: 'Total' },
            ].map((stat, idx) => (
              <Box
                key={idx}
                bg="rgba(0,0,0,0.36)"
                border="1px solid rgba(217,100,46,0.2)"
                borderRadius="md"
                p={5}
                transition="transform 180ms"
                _hover={{ transform: 'translateY(-6px)' }}
              >
                <Text color="gray.400" fontSize="xs" fontWeight="700" textTransform="uppercase" mb={2}>
                  {stat.label}
                </Text>
                <Text color="orange.300" fontSize="3xl" fontWeight="900" mb={2}>
                  {stat.value}
                </Text>
                <Text color="gray.400" fontSize="xs" fontWeight="500">
                  {stat.desc}
                </Text>
              </Box>
            ))}
          </Grid>

          {/* Report Generator */}
          <Box
            bg="rgba(0,0,0,0.36)"
            border="1px solid rgba(217,100,46,0.2)"
            borderRadius="md"
            p={6}
          >
            <Heading as="h2" size="md" color="white" mb={4}>
              Generate New Report
            </Heading>
            <VStack align="stretch" gap={4}>
              <Box>
                <Text color="gray.300" fontSize="sm" fontWeight="600" mb={2}>
                  Report Type
                </Text>
                <select
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(217,100,46,0.2)',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    color: 'white',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  <option style={{ backgroundColor: '#1a1a1a', color: 'white' }}>User Activity Report</option>
                  <option style={{ backgroundColor: '#1a1a1a', color: 'white' }}>Content Performance</option>
                  <option style={{ backgroundColor: '#1a1a1a', color: 'white' }}>System Health</option>
                </select>
              </Box>
            </VStack>
          </Box>

          {/* Recent Reports */}
          <Box>
            <Heading as="h2" size="md" color="white" mb={4}>
              Recent Reports
            </Heading>
            <VStack align="stretch" gap={3}>
              {reports.map((report, idx) => (
                <Box
                  key={idx}
                  bg="rgba(0,0,0,0.36)"
                  border="1px solid rgba(217,100,46,0.2)"
                  borderRadius="md"
                  p={4}
                  transition="transform 180ms"
                  _hover={{ transform: 'translateY(-3px)' }}
                >
                  <HStack justify="space-between">
                    <VStack align="start" gap={1}>
                      <Text color="white" fontWeight="700">
                        {report.name}
                      </Text>
                      <Text color="gray.400" fontSize="sm">
                        {report.date} • {report.size}
                      </Text>
                    </VStack>
                    <Button size="sm" bg="#D9642E" color="white">
                      Download
                    </Button>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
    </>
  );
}
