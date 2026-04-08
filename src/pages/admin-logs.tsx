'use client';

import { Box, Container, Heading, Text, VStack, HStack, Grid, Button } from '@chakra-ui/react';
import { MdDownload, MdHistory } from 'react-icons/md';
import Sidebar from '../../components/Sidebar';

export default function AdminLogs() {
  const stats = [
    { label: 'Total Logs', value: '2,451', desc: 'Recorded actions' },
    { label: 'This Week', value: '342', desc: 'Actions logged' },
    { label: 'Today', value: '45', desc: 'Logs created' },
    { label: 'Critical', value: '3', desc: 'Alert events' },
  ];

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
                Audit Logs
              </Heading>
              <Text color="gray.400">
                Track all admin actions and system changes
              </Text>
            </Box>
            <HStack gap={2}>
              <Button
                size="sm"
                bg="#D9642E"
                color="white"
                fontWeight="700"
                _hover={{ bg: '#C65525' }}
              >
                <MdDownload style={{ marginRight: '6px' }} />
                Export
              </Button>
            </HStack>
          </HStack>

          {/* Stat Cards */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
            {stats.map((stat, idx) => (
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

          {/* Recent Logs */}
          <Box>
            <Heading as="h2" size="md" color="white" mb={4}>
              Recent Activity
            </Heading>
            <VStack align="stretch" gap={3}>
              {[
                { action: 'User login', user: 'admin@masterchef.com', time: '2 mins ago' },
              ].map((log, idx) => (
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
                        {log.action}
                      </Text>
                      <Text color="gray.400" fontSize="sm">
                        {log.user}
                      </Text>
                    </VStack>
                    <Text color="gray.400" fontSize="sm">
                      {log.time}
                    </Text>
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
