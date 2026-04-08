'use client';

import { Box, Container, Heading, Text, VStack, HStack, Grid, Badge } from '@chakra-ui/react';
import { useCurrentUser } from '../../lib/authHooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Sidebar from '../../components/Sidebar';

export default function AdminDashboard() {
  const currentUser = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/');
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== 'admin') {
    return null;
  }

  return (
    <>
      <Sidebar />
      <Box minH="100vh" py={12} color="gray.100" ml={{ base: 0, md: '280px' }} transition="margin 0.3s ease">
        <Container maxW="container.lg">
        <VStack align="stretch" gap={8}>
          {/* Header */}
          <Box mb={4} textAlign="center">
            <Heading as="h1" size="xl" mb={2}>
              Admin Dashboard
            </Heading>
            <Text color="gray.400" maxW="3xl" mx="auto">
              System overview and key metrics
            </Text>
          </Box>

          {/* Stat Cards */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
            {[
              { label: 'Total Users', value: '2,847', desc: 'Registered players' },
              { label: 'Active Now', value: '512', desc: 'Currently online' },
              { label: 'Server Uptime', value: '99.98%', desc: 'This month' },
              { label: 'Games Played', value: '45.8K', desc: 'Total games' },
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

          {/* System Status */}
          <Box>
            <Heading as="h2" size="md" color="white" mb={4}>
              System Status
            </Heading>
            <VStack align="stretch" gap={3}>
              {[
                { name: 'Database', status: 'Healthy', color: 'green' },
              ].map((item, idx) => (
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
                    <Text color="white" fontWeight="700">
                      {item.name}
                    </Text>
                    <Badge colorScheme={item.color} borderRadius="full">
                      {item.status}
                    </Badge>
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
