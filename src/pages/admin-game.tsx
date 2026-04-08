'use client';

import { Box, Container, Heading, Text, VStack, HStack, Grid, Badge, Button, useDisclosure } from '@chakra-ui/react';
import { MdAdd, MdPlayArrow, MdPause, MdDelete } from 'react-icons/md';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function AdminGame() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [actionType, setActionType] = useState<'tournament' | 'event' | 'challenge'>('tournament');
  const [isLoading, setIsLoading] = useState(false);

  const tournaments = [
    { id: 1, name: 'Easter Challenge 2026', status: 'Active', prize: '50K coins', players: 2840 },
  ];

  const events = [
    { id: 1, name: 'Double XP Weekend', status: 'Active', startDate: 'Apr 12', endDate: 'Apr 14' },
  ];

  const challenges = [
    { id: 1, name: 'Speed Cook 60s', difficulty: 'Hard', reward: '500 coins', attempts: 12450 },
  ];

  const handleDelete = (id: number, type: 'tournament' | 'event' | 'challenge') => {
    setSelectedId(id);
    setActionType(type);
    onOpen();
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    console.log(`Delete ${actionType}:`, selectedId);
    setIsLoading(false);
    onClose();
  };

  return (
    <>
      <Sidebar />
      <Box minH="100vh" py={12} color="gray.100" ml={{ base: 0, md: '300px' }} transition="margin 0.3s ease">
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
                        <Button size="sm" bg="#D9642E" color="white" _hover={{ bg: '#C65525' }}>
                          <MdPlayArrow />
                        </Button>
                        <Button size="sm" bg="#eab308" color="black" _hover={{ bg: '#dcaa02' }}>
                          <MdPause />
                        </Button>
                        <Button size="sm" bg="rgba(139,0,0,0.9)" color="white" _hover={{ bg: 'rgba(139,0,0,1)' }} onClick={() => handleDelete(tournament.id, 'tournament')}>
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
                        <Button size="sm" bg="#D9642E" color="white" _hover={{ bg: '#C65525' }}>
                          Edit
                        </Button>
                        <Button size="sm" bg="rgba(139,0,0,0.9)" color="white" _hover={{ bg: 'rgba(139,0,0,1)' }} onClick={() => handleDelete(event.id, 'event')}>
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
                        <Button size="sm" bg="#D9642E" color="white" _hover={{ bg: '#C65525' }}>
                          Edit
                        </Button>
                        <Button size="sm" bg="rgba(139,0,0,0.9)" color="white" _hover={{ bg: 'rgba(139,0,0,1)' }} onClick={() => handleDelete(challenge.id, 'challenge')}>
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

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmDelete}
        title={`Delete ${actionType}`}
        message={`Are you sure you want to delete this ${actionType}? This action cannot be undone.`}
        isDangerous={true}
        isLoading={isLoading}
      />
    </>
  );
}
