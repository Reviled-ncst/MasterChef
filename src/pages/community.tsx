'use client';

import { Box, Heading, Text, VStack, HStack, Container, Grid, Badge } from '@chakra-ui/react';

const mockThreads = [
  { id: 1, title: 'Best strategies for the new recipe challenge', author: 'ChefMaster99', replies: 42, likes: 156, views: 1240 },
];

const mockEvents = [
  { id: 1, name: 'Birthday Bash Tournament', date: 'April 15', participants: 234, status: 'Active' },
];

export default function Community() {
  return (
    <Box minH="100vh" py={12} color="gray.100">
      <Container maxW="container.lg">
        <VStack align="stretch" gap={8}>
          {/* Header */}
          <Box mb={4} textAlign="center">
            <Heading as="h1" size="xl" mb={2}>
              Community
            </Heading>
            <Text color="gray.400" maxW="3xl" mx="auto">
              Connect with players, share strategies, and participate in events
            </Text>
          </Box>

          {/* Stat Cards */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
            {[
              { label: 'Members', value: '45K+', desc: 'Active members' },
              { label: 'Discussions', value: '8.2K', desc: 'Forum threads' },
              { label: 'Events/Month', value: '12+', desc: 'Community events' },
              { label: 'Posts Today', value: '342', desc: 'Community posts' },
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

          {/* Recent Discussions */}
          <Box>
            <Heading as="h2" size="md" color="white" mb={4}>
              Latest Discussions
            </Heading>
            <VStack align="stretch" gap={3}>
              {mockThreads.map((thread) => (
                <Box
                  key={thread.id}
                  bg="rgba(0,0,0,0.36)"
                  border="1px solid rgba(217,100,46,0.2)"
                  borderRadius="md"
                  p={4}
                  transition="transform 180ms"
                  _hover={{ transform: 'translateY(-6px)' }}
                >
                  <HStack justify="space-between" mb={2}>
                    <Heading as="h3" size="sm" color="white">
                      {thread.title}
                    </Heading>
                  </HStack>
                  <Text color="gray.400" fontSize="xs" mb={3}>
                    By {thread.author} • {thread.views.toLocaleString()} views
                  </Text>
                  <HStack justify="space-between" gap={4}>
                    <HStack gap={3}>
                      <Text fontSize="sm" color="gray.400">
                        {thread.replies} replies
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        {thread.likes} likes
                      </Text>
                    </HStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Upcoming Events */}
          <Box>
            <Heading as="h2" size="md" color="white" mb={4}>
              Upcoming Events
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
              {mockEvents.map((event) => (
                <Box
                  key={event.id}
                  bg="rgba(0,0,0,0.36)"
                  border="1px solid rgba(217,100,46,0.2)"
                  borderRadius="md"
                  p={5}
                  transition="transform 180ms"
                  _hover={{ transform: 'translateY(-6px)' }}
                >
                  <HStack justify="space-between" mb={3}>
                    <Badge colorScheme={event.status === 'Active' ? 'green' : 'orange'} borderRadius="full">
                      {event.status}
                    </Badge>
                    <Text fontSize="xs" fontWeight="700" color="orange.300">
                      {event.date}
                    </Text>
                  </HStack>
                  <Heading as="h3" size="sm" color="white" mb={3}>
                    {event.name}
                  </Heading>
                  <Text fontSize="sm" color="gray.400">
                    {event.participants.toLocaleString()} participants
                  </Text>
                </Box>
              ))}
            </Grid>
          </Box>

          {/* Featured Members */}
          <Box>
            <Heading as="h2" size="md" color="white" mb={4}>
              Featured Members
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4}>
              {[
                { name: 'ChefMaster99', role: 'Community Leader', avatar: '🧑‍🍳' },
              ].map((member, idx) => (
                <Box
                  key={idx}
                  bg="rgba(0,0,0,0.36)"
                  border="1px solid rgba(217,100,46,0.2)"
                  borderRadius="md"
                  p={5}
                  textAlign="center"
                  transition="transform 180ms"
                  _hover={{ transform: 'translateY(-6px)' }}
                >
                  <Text fontSize="40px" mb={3}>
                    {member.avatar}
                  </Text>
                  <Heading as="h3" size="sm" color="white" mb={2}>
                    {member.name}
                  </Heading>
                  <Badge colorScheme="orange" variant="subtle" borderRadius="full" fontSize="xs">
                    {member.role}
                  </Badge>
                </Box>
              ))}
            </Grid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
