'use client';

import { Box, Container, Heading, Text, VStack, HStack, Grid } from '@chakra-ui/react';
import { MdTrendingUp, MdPeople, MdGamepad, MdStar } from 'react-icons/md';
import Sidebar from '../../components/Sidebar';

export default function AdminAnalytics() {
  return (
    <>
      <Sidebar />
      <Box minH="100vh" py={12} color="gray.100" ml={{ base: 0, md: '280px' }} transition="margin 0.3s ease">
        <Container maxW="container.lg">
          <VStack align="stretch" gap={8}>
            {/* Header */}
            <Box>
              <Heading as="h1" size="xl" mb={2}>
                Analytics & Statistics
              </Heading>
              <Text color="gray.400">
                Game performance, player engagement, and key metrics
              </Text>
            </Box>

            {/* Key Metrics */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
              {[
                { label: 'Daily Active Users', value: '12.4K', change: '+8.2%', icon: MdPeople },
                { label: 'Average Session', value: '34m 22s', change: '+2.5%', icon: MdGamepad },
                { label: 'Player Retention', value: '68%', change: '+5.3%', icon: MdStar },
                { label: 'Revenue', value: '$18.5K', change: '+12.8%', icon: MdTrendingUp },
              ].map((metric, idx) => (
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
                    {metric.label}
                  </Text>
                  <Text color="orange.300" fontSize="3xl" fontWeight="900" mb={2}>
                    {metric.value}
                  </Text>
                  <Text color="green.400" fontSize="xs" fontWeight="600">
                    {metric.change} this week
                  </Text>
                </Box>
              ))}
            </Grid>

            {/* Player Engagement */}
            <Box
              bg="rgba(0,0,0,0.36)"
              border="1px solid rgba(217,100,46,0.2)"
              borderRadius="md"
              p={6}
            >
              <Heading as="h2" size="md" color="white" mb={4}>
                Player Engagement Metrics
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
                {[
                  { label: 'New Players (7d)', value: '2,450', percent: 32 },
                  { label: 'Returning Players', value: '8,120', percent: 65 },
                  { label: 'Churned Players', value: '1,840', percent: 15 },
                ].map((item, idx) => (
                  <Box key={idx} p={4} bg="rgba(0,0,0,0.2)" borderRadius="lg">
                    <HStack justify="space-between" mb={2}>
                      <Text color="white" fontWeight="600" fontSize="sm">
                        {item.label}
                      </Text>
                      <Text color="orange.300" fontWeight="700" fontSize="sm">
                        {item.percent}%
                      </Text>
                    </HStack>
                    <Text color="white" fontSize="xl" fontWeight="700" mb={3}>
                      {item.value}
                    </Text>
                    <Box bg="rgba(217,100,46,0.2)" h="6px" borderRadius="full">
                      <Box
                        bg="#D9642E"
                        h="100%"
                        borderRadius="full"
                        w={`${item.percent}%`}
                      />
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Box>

            {/* Game Performance */}
            <Box
              bg="rgba(0,0,0,0.36)"
              border="1px solid rgba(217,100,46,0.2)"
              borderRadius="md"
              p={6}
            >
              <Heading as="h2" size="md" color="white" mb={4}>
                Popular Content
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                <Box p={4} bg="rgba(0,0,0,0.2)" borderRadius="lg">
                  <Text color="gray.400" fontSize="xs" fontWeight="700" mb={2}>
                    Top Recipe
                  </Text>
                  <Text color="white" fontSize="lg" fontWeight="700" mb={3}>
                    Pasta Carbonara
                  </Text>
                  <HStack justify="space-between" fontSize="sm" color="gray.400">
                    <Text>15.2K plays</Text>
                    <Text>92% success rate</Text>
                  </HStack>
                </Box>
                <Box p={4} bg="rgba(0,0,0,0.2)" borderRadius="lg">
                  <Text color="gray.400" fontSize="xs" fontWeight="700" mb={2}>
                    Top Tournament
                  </Text>
                  <Text color="white" fontSize="lg" fontWeight="700" mb={3}>
                    Easter Challenge 2026
                  </Text>
                  <HStack justify="space-between" fontSize="sm" color="gray.400">
                    <Text>2.8K participants</Text>
                    <Text>48K prize pool</Text>
                  </HStack>
                </Box>
                <Box p={4} bg="rgba(0,0,0,0.2)" borderRadius="lg">
                  <Text color="gray.400" fontSize="xs" fontWeight="700" mb={2}>
                    Peak Hours
                  </Text>
                  <Text color="white" fontSize="lg" fontWeight="700" mb={3}>
                    6 PM - 10 PM
                  </Text>
                  <HStack justify="space-between" fontSize="sm" color="gray.400">
                    <Text>18.2K active</Text>
                    <Text>+240% from average</Text>
                  </HStack>
                </Box>
                <Box p={4} bg="rgba(0,0,0,0.2)" borderRadius="lg">
                  <Text color="gray.400" fontSize="xs" fontWeight="700" mb={2}>
                    Best Performing Item
                  </Text>
                  <Text color="white" fontSize="lg" fontWeight="700" mb={3}>
                    Golden Chef Hat
                  </Text>
                  <HStack justify="space-between" fontSize="sm" color="gray.400">
                    <Text>4.2K sold</Text>
                    <Text>$8.5K revenue</Text>
                  </HStack>
                </Box>
              </Grid>
            </Box>

            {/* Platform Stats */}
            <Box
              bg="rgba(0,0,0,0.36)"
              border="1px solid rgba(217,100,46,0.2)"
              borderRadius="md"
              p={6}
            >
              <Heading as="h2" size="md" color="white" mb={4}>
                Platform Statistics
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
                {[
                  { label: 'Android Users', value: '28.4K', percent: 62 },
                  { label: 'iOS Users', value: '14.2K', percent: 31 },
                  { label: 'Web Players', value: '3.8K', percent: 7 },
                ].map((platform, idx) => (
                  <Box key={idx} p={4} bg="rgba(0,0,0,0.2)" borderRadius="lg">
                    <Text color="white" fontWeight="600" fontSize="sm" mb={2}>
                      {platform.label}
                    </Text>
                    <Text color="orange.300" fontSize="2xl" fontWeight="700" mb={3}>
                      {platform.value}
                    </Text>
                    <Box bg="rgba(217,100,46,0.2)" h="6px" borderRadius="full">
                      <Box
                        bg="#D9642E"
                        h="100%"
                        borderRadius="full"
                        w={`${platform.percent}%`}
                      />
                    </Box>
                    <Text color="gray.400" fontSize="xs" mt={2}>
                      {platform.percent}% of users
                    </Text>
                  </Box>
                ))}
              </Grid>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  );
}
