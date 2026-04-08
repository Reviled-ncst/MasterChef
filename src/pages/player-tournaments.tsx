'use client';

import { Box, Container, Heading, Text, VStack, HStack, Grid, Badge } from '@chakra-ui/react';
import { MdEmojiEvents } from 'react-icons/md';
import { useCurrentUser } from '../../lib/authHooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function PlayerTournaments() {
  const currentUser = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Box minH="100vh" py={12} color="gray.100" transition="margin 0.3s ease">
        <Container maxW="container.lg">
        <VStack align="stretch" gap={8}>
          {/* Header */}
          <Box mb={4} textAlign="center">
            <Heading as="h1" size="xl" mb={2}>
              Tournaments
            </Heading>
            <Text color="gray.400" maxW="3xl" mx="auto">
              Compete with players and earn exclusive rewards
            </Text>
          </Box>

          {/* Stat Cards */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
            {[
              { label: 'Tournaments', value: '8', desc: 'Participated' },
              { label: 'Wins', value: '5', desc: 'Tournament wins' },
              { label: 'Best Rank', value: '#12', desc: 'Highest placement' },
              { label: 'Prizes Won', value: '2.4K', desc: 'Total rewards' },
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

          {/* Active Tournaments */}
          <Box>
            <Heading as="h2" size="md" color="white" mb={4}>
              Active Tournaments
            </Heading>
            <VStack align="stretch" gap={3}>
              {[
                { name: 'Monthly Chef Challenge', date: 'Ends Apr 30', participants: '542', status: 'Active' },
              ].map((tournament, idx) => (
                <Box
                  key={idx}
                  bg="rgba(0,0,0,0.36)"
                  border="1px solid rgba(217,100,46,0.2)"
                  borderRadius="md"
                  p={5}
                  transition="transform 180ms"
                  _hover={{ transform: 'translateY(-3px)' }}
                >
                  <HStack justify="space-between" mb={3}>
                    <Heading as="h3" size="sm" color="white">
                      {tournament.name}
                    </Heading>
                    <Badge colorScheme="green" borderRadius="full">
                      {tournament.status}
                    </Badge>
                  </HStack>
                  <HStack justify="space-between" gap={4}>
                    <Text color="gray.400" fontSize="sm">
                      {tournament.date}
                    </Text>
                    <Text color="orange.300" fontSize="sm" fontWeight="600">
                      {tournament.participants} participants
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
