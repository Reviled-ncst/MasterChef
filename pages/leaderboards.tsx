'use client';

import { Box, Heading, Text, VStack, HStack, Container, Grid } from '@chakra-ui/react';
import { MdTrendingUp } from 'react-icons/md';

const mockLeaderboardData = [
  { rank: 1, name: 'ChefMaster99', score: 15850, region: 'Global', games: 342 },
];

export default function Leaderboards() {
  return (
    <Box minH="100vh" py={12} color="gray.100">
      <Container maxW="container.lg">
        <VStack align="stretch" gap={8}>
          {/* Header */}
          <Box mb={4} textAlign="center">
            <Heading as="h1" size="xl" mb={2}>
              Global Leaderboards
            </Heading>
            <Text color="gray.400" maxW="3xl" mx="auto">
              Compete with players worldwide and climb the rankings
            </Text>
          </Box>

          {/* Stat Cards */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
            {[
              { label: 'Total Players', value: '45.2K', desc: 'Active players' },
              { label: 'Top Score', value: '15,850', desc: 'Current record' },
              { label: 'Avg. Score', value: '8,420', desc: 'Across all players' },
              { label: 'New This Week', value: '+1,240', desc: 'Players ranked' },
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

          {/* Leaderboard */}
          <Box>
            <Heading as="h2" size="md" color="white" mb={4}>
              Global Rankings
            </Heading>
            <VStack align="stretch" gap={3}>
              {mockLeaderboardData.map((player) => (
                <Box
                  key={player.rank}
                  bg="rgba(0,0,0,0.36)"
                  border="1px solid rgba(217,100,46,0.2)"
                  borderRadius="md"
                  p={4}
                  transition="transform 180ms"
                  _hover={{ transform: 'translateY(-6px)' }}
                >
                  <HStack justify="space-between">
                    <HStack gap={4} flex={1}>
                      <Box
                        fontSize="24px"
                        fontWeight="900"
                        minW="45px"
                        h="45px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="md"
                        bg="linear-gradient(135deg, #FFD700 0%, #FFC700 100%)"
                        color="white"
                      >
                        👑
                      </Box>
                      <VStack align="start" gap={0}>
                        <Text fontWeight="700" fontSize="md" color="white">
                          {player.name}
                        </Text>
                        <HStack gap={2} fontSize="xs" color="gray.400">
                          <Text>{player.region}</Text>
                          <Text>•</Text>
                          <Text>{player.games} games</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text fontWeight="900" fontSize="lg" color="orange.300">
                      {player.score.toLocaleString()}
                    </Text>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
