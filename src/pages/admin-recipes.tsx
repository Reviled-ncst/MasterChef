'use client';

import { Box, Container, Heading, Text, VStack, HStack, Grid, Badge, Button } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';

export default function AdminRecipes() {
  const stats = [
    { label: 'Total Recipes', value: '486', desc: 'All difficulty levels' },
    { label: 'Recently Added', value: '12', desc: 'This month' },
    { label: 'Most Popular', value: 'Pasta Carbonara', desc: '3.2K plays' },
    { label: 'Avg Difficulty', value: '6.5/10', desc: 'Overall difficulty' },
  ];

  const recipes = [
    { name: 'Pasta Carbonara', difficulty: 'Medium', plays: 3240, rating: 4.8 },
    { name: 'Mushroom Risotto', difficulty: 'Hard', plays: 2105, rating: 4.6 },
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
                  Recipe Management
                </Heading>
                <Text color="gray.400">
                  Manage game recipes and cooking challenges
                </Text>
              </Box>
              <Button bg="#D9642E" color="white" fontWeight="700" _hover={{ bg: '#C65525' }}>
                + New Recipe
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

            {/* Recipes */}
            <Box>
              <Heading as="h2" size="md" color="white" mb={4}>
                Top Recipes
              </Heading>
              <VStack align="stretch" gap={3}>
                {recipes.map((recipe, idx) => (
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
                          {recipe.name}
                        </Heading>
                        <Text color="gray.400" fontSize="sm">
                          {recipe.plays.toLocaleString()} plays | ⭐ {recipe.rating}
                        </Text>
                      </VStack>
                      <Badge colorScheme={recipe.difficulty === 'Easy' ? 'green' : recipe.difficulty === 'Medium' ? 'orange' : 'red'}>
                        {recipe.difficulty}
                      </Badge>
                    </HStack>
                    <HStack gap={2}>
                      <Button size="sm" bg="#D9642E" color="white">Edit</Button>
                      <Button size="sm" variant="outline" color="gray.400">View Details</Button>
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
