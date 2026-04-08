'use client';

import { Box, Container, Heading, Text, VStack, HStack, Grid, Badge, Button } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';

export default function AdminTournaments() {
  const stats = [
    { label: 'Active Tournaments', value: '5', desc: 'Currently running' },
    { label: 'Total Participants', value: '2.4K', desc: 'All tournaments' },
    { label: 'Prize Pool', value: '$45K', desc: 'This month' },
    { label: 'Avg Duration', value: '7 days', desc: 'Tournament length' },
  ];

  const tournaments = [
    { name: 'Spring Championship', status: 'Active', participants: 512, prize: '$12K' },
    { name: 'Daily Challenge', status: 'Active', participants: 1240, prize: '$500' },
    { name: 'Elite League', status: 'Upcoming', participants: 64, prize: '$20K' },
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
                  Tournament Management
                </Heading>
                <Text color="gray.400">
                  Create and manage competitive tournaments
                </Text>
              </Box>
              <Button bg="#D9642E" color="white" fontWeight="700" _hover={{ bg: '#C65525' }}>
                + Create Tournament
              </Button>
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

            {/* Tournaments */}
            <Box>
              <Heading as="h2" size="md" color="white" mb={4}>
                Tournaments
              </Heading>
              <VStack align="stretch" gap={3}>
                {tournaments.map((tournament, idx) => (
                  <Box
                    key={idx}
                    bg="rgba(0,0,0,0.36)"
                    border="1px solid rgba(217,100,46,0.2)"
                    borderRadius="md"
                    p={5}
                  >
                    <HStack justify="space-between" mb={3}>
                      <VStack align="start" gap={1}>
                        <Heading as="h3" size="sm" color="white">
                          {tournament.name}
                        </Heading>
                        <Text color="gray.400" fontSize="sm">
                          {tournament.participants.toLocaleString()} participants | Prize: {tournament.prize}
                        </Text>
                      </VStack>
                      <Badge colorScheme={tournament.status === 'Active' ? 'green' : tournament.status === 'Upcoming' ? 'blue' : 'gray'}>
                        {tournament.status}
                      </Badge>
                    </HStack>
                    <HStack gap={2}>
                      <Button size="sm" bg="#D9642E" color="white">Edit</Button>
                      <Button size="sm" variant="outline" color="gray.400">Leaderboard</Button>
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
