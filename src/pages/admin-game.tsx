'use client';

import { Box, Container, Heading, Text, VStack, HStack, Grid, Badge, Button } from '@chakra-ui/react';
import { MdAdd, MdPlayArrow, MdPause, MdDelete } from 'react-icons/md';
import Sidebar from '../../components/Sidebar';

export default function AdminGame() {
  const tournaments = [
    { id: 1, name: 'Easter Challenge 2026', status: 'Active', prize: '50K coins', players: 2840 },
  ];

  const events = [
    { id: 1, name: 'Double XP Weekend', status: 'Active', startDate: 'Apr 12', endDate: 'Apr 14' },
  ];

  const challenges = [
    { id: 1, name: 'Speed Cook 60s', difficulty: 'Hard', reward: '500 coins', attempts: 12450 },
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
                  Game Management
                </Heading>
                <Text color="gray.400">
                  Manage tournaments, events, and challenges
                </Text>
              </Box>
              <Button
                bg="#D9642E"
                color="white"
                fontWeight="700"
                _hover={{ bg: '#C65525' }}
              >
                <MdAdd style={{ marginRight: '6px' }} />
                Create New
              </Button>
            </HStack>

            {/* Stats */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
              {[
                { label: 'Active Tournaments', value: '8', desc: 'Running now' },
                { label: 'Total Prize Pool', value: '485K', desc: 'This month' },
                { label: 'Active Players', value: '12.4K', desc: 'In events' },
                { label: 'Challenges', value: '340', desc: 'Available' },
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

            {/* Tournaments */}
            <Box>
              <Heading as="h2" size="md" color="white" mb={4}>
                Tournaments
              </Heading>
              <VStack align="stretch" gap={3}>
                {tournaments.map((tournament) => (
                  <Box
                    key={tournament.id}
                    bg="rgba(0,0,0,0.36)"
                    border="1px solid rgba(217,100,46,0.2)"
                    borderRadius="md"
                    p={4}
                    transition="transform 180ms"
                    _hover={{ transform: 'translateY(-3px)' }}
                  >
                    <HStack justify="space-between">
                      <VStack align="start" gap={1} flex={1}>
                        <Text color="white" fontWeight="700">
                          {tournament.name}
                        </Text>
                        <HStack gap={2} fontSize="xs" color="gray.400">
                          <Badge colorScheme="green" fontSize="xs">{tournament.status}</Badge>
                          <Text>Prize: {tournament.prize}</Text>
                          <Text>•</Text>
                          <Text>{tournament.players.toLocaleString()} players</Text>
                        </HStack>
                      </VStack>
                      <HStack gap={2}>
                        <Button size="sm" bg="#D9642E" color="white">
                          <MdPlayArrow />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MdPause />
                        </Button>
                        <Button size="sm" variant="outline" color="red.400">
                          <MdDelete />
                        </Button>
                      </HStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Box>

            {/* Events */}
            <Box>
              <Heading as="h2" size="md" color="white" mb={4}>
                Events
              </Heading>
              <VStack align="stretch" gap={3}>
                {events.map((event) => (
                  <Box
                    key={event.id}
                    bg="rgba(0,0,0,0.36)"
                    border="1px solid rgba(217,100,46,0.2)"
                    borderRadius="md"
                    p={4}
                    transition="transform 180ms"
                    _hover={{ transform: 'translateY(-3px)' }}
                  >
                    <HStack justify="space-between">
                      <VStack align="start" gap={1} flex={1}>
                        <Text color="white" fontWeight="700">
                          {event.name}
                        </Text>
                        <HStack gap={2} fontSize="xs" color="gray.400">
                          <Badge colorScheme="green" fontSize="xs">{event.status}</Badge>
                          <Text>{event.startDate} - {event.endDate}</Text>
                        </HStack>
                      </VStack>
                      <HStack gap={2}>
                        <Button size="sm" bg="#D9642E" color="white">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" color="red.400">
                          <MdDelete />
                        </Button>
                      </HStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Box>

            {/* Challenges */}
            <Box>
              <Heading as="h2" size="md" color="white" mb={4}>
                Active Challenges
              </Heading>
              <VStack align="stretch" gap={3}>
                {challenges.map((challenge) => (
                  <Box
                    key={challenge.id}
                    bg="rgba(0,0,0,0.36)"
                    border="1px solid rgba(217,100,46,0.2)"
                    borderRadius="md"
                    p={4}
                    transition="transform 180ms"
                    _hover={{ transform: 'translateY(-3px)' }}
                  >
                    <HStack justify="space-between">
                      <VStack align="start" gap={1} flex={1}>
                        <Text color="white" fontWeight="700">
                          {challenge.name}
                        </Text>
                        <HStack gap={2} fontSize="xs" color="gray.400">
                          <Badge colorScheme="red" fontSize="xs">{challenge.difficulty}</Badge>
                          <Text>Reward: {challenge.reward}</Text>
                          <Text>•</Text>
                          <Text>{challenge.attempts.toLocaleString()} attempts</Text>
                        </HStack>
                      </VStack>
                      <HStack gap={2}>
                        <Button size="sm" bg="#D9642E" color="white">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" color="red.400">
                          <MdDelete />
                        </Button>
                      </HStack>
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
