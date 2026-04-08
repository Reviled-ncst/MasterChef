'use client';

import { Box, Container, Heading, Text, VStack, HStack, Grid, Badge, Button } from '@chakra-ui/react';
import { MdDashboard, MdAttachMoney, MdEmojiEvents, MdTrendingUp } from 'react-icons/md';
import { useCurrentUser } from '../../lib/authHooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function GamerDashboard() {
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
              Gamer Dashboard
            </Heading>
            <Text color="gray.400" maxW="3xl" mx="auto">
              Welcome back, {currentUser.name}! Track your progress and achievements
            </Text>
          </Box>

          {/* Stat Cards */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
            {[
              { label: 'Current Level', value: '45', desc: 'Your level' },
              { label: 'Total Wins', value: '342', desc: 'Victories achieved' },
              { label: 'Win Rate', value: '68%', desc: 'Success rate' },
              { label: 'Points', value: '18.5K', desc: 'Total points' },
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

          {/* Quick Actions */}
          <Box>
            <Heading as="h2" size="md" color="white" mb={4}>
              Quick Actions
            </Heading>
            <HStack gap={3} flexWrap="wrap">
              <Button
                bg="#D9642E"
                color="white"
                fontWeight="700"
                _hover={{ bg: '#C65525', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                Start Game
              </Button>
              <Button
                variant="outline"
                color="orange.300"
                borderColor="orange.300"
                fontWeight="700"
                _hover={{ bg: 'rgba(217,100,46,0.1)' }}
              >
                View Profile
              </Button>
              <Button
                variant="outline"
                color="orange.300"
                borderColor="orange.300"
                fontWeight="700"
                _hover={{ bg: 'rgba(217,100,46,0.1)' }}
              >
                Inventory
              </Button>
            </HStack>
          </Box>

          {/* Recent Activity */}
          <Box>
            <Heading as="h2" size="md" color="white" mb={4}>
              Recent Activity
            </Heading>
            <VStack align="stretch" gap={3}>
              {[
                { event: 'Victory! Season Finale Tournament', date: '2 hours ago', icon: '🏆' },
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
                    <HStack gap={3}>
                      <Text fontSize="2xl">{item.icon}</Text>
                      <VStack align="start" gap={0}>
                        <Text color="white" fontWeight="700">
                          {item.event}
                        </Text>
                        <Text color="gray.400" fontSize="sm">
                          {item.date}
                        </Text>
                      </VStack>
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
