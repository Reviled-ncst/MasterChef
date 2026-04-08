'use client';

import { Box, Container, Heading, Text, VStack, HStack, Grid, Badge, Button, Input, useDisclosure } from '@chakra-ui/react';
import { MdAdd, MdEdit, MdDelete, MdSearch } from 'react-icons/md';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function AdminContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<{ name: string; type: 'recipe' | 'ingredient' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const recipes = [
    { id: 1, name: 'Pasta Carbonara', status: 'Published', difficulty: 'Medium', players: 1240 },
  ];

  const ingredients = [
    { id: 1, name: 'Spaghetti', category: 'Pasta', rarity: 'Common', uses: 342 },
  ];

  const handleDelete = (name: string, type: 'recipe' | 'ingredient') => {
    setSelectedItem({ name, type });
    onOpen();
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    console.log(`Delete ${selectedItem?.type}:`, selectedItem?.name);
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
                  Content Management
                </Heading>
                <Text color="gray.400">
                  Manage recipes, ingredients, and game items
                </Text>
              </Box>
              <Button
                bg="#D9642E"
                color="white"
                fontWeight="700"
                _hover={{ bg: '#C65525' }}
              >
                <MdAdd style={{ marginRight: '6px' }} />
                Add New
              </Button>
            </HStack>

            {/* Tabs */}
            <HStack gap={4} borderBottom="1px solid rgba(217,100,46,0.2)" pb={4}>
              {['Recipes', 'Ingredients', 'Items'].map((tab) => (
                <Button
                  key={tab}
                  variant="ghost"
                  color="#D9642E"
                  fontWeight="600"
                  borderBottom="2px solid #D9642E"
                  pb={2}
                  _hover={{ bg: 'transparent' }}
                >
                  {tab}
                </Button>
              ))}
            </HStack>

            {/* Stats */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
              {[
                { label: 'Total Recipes', value: '847', desc: 'Published' },
                { label: 'Ingredients', value: '523', desc: 'Available' },
                { label: 'Items', value: '1,240', desc: 'In game' },
                { label: 'This Month', value: '+45', desc: 'New content' },
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

            {/* Search */}
            <Box position="relative">
              <MdSearch style={{ position: 'absolute', left: '12px', top: '12px', color: '#999', fontSize: '20px' }} />
              <Input
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                pl={12}
                bg="rgba(0,0,0,0.36)"
                border="1px solid rgba(217,100,46,0.2)"
                borderRadius="md"
                color="white"
                _placeholder={{ color: 'gray.600' }}
              />
            </Box>

            {/* Recipes List */}
            <Box>
              <Heading as="h2" size="md" color="white" mb={4}>
                Recipes
              </Heading>
              <VStack align="stretch" gap={3}>
                {recipes.map((recipe) => (
                  <Box
                    key={recipe.id}
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
                          {recipe.name}
                        </Text>
                        <HStack gap={2} fontSize="xs" color="gray.400">
                          <Badge colorScheme="green" fontSize="xs">{recipe.status}</Badge>
                          <Text>{recipe.difficulty}</Text>
                          <Text>•</Text>
                          <Text>{recipe.players.toLocaleString()} players</Text>
                        </HStack>
                      </VStack>
                      <HStack gap={2}>
                        <Button size="sm" bg="#D9642E" color="white" _hover={{ bg: '#C65525' }}>
                          <MdEdit />
                        </Button>
                        <Button size="sm" bg="rgba(139,0,0,0.9)" color="white" _hover={{ bg: 'rgba(139,0,0,1)' }} onClick={() => handleDelete(recipe.name, 'recipe')}>
                          <MdDelete />
                        </Button>
                      </HStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Box>

            {/* Ingredients List */}
            <Box>
              <Heading as="h2" size="md" color="white" mb={4}>
                Ingredients
              </Heading>
              <VStack align="stretch" gap={3}>
                {ingredients.map((ingredient) => (
                  <Box
                    key={ingredient.id}
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
                          {ingredient.name}
                        </Text>
                        <HStack gap={2} fontSize="xs" color="gray.400">
                          <Text>{ingredient.category}</Text>
                          <Text>•</Text>
                          <Badge colorScheme="purple" fontSize="xs">{ingredient.rarity}</Badge>
                          <Text>•</Text>
                          <Text>{ingredient.uses} uses</Text>
                        </HStack>
                      </VStack>
                      <HStack gap={2}>
                        <Button size="sm" bg="#D9642E" color="white" _hover={{ bg: '#C65525' }}>
                          <MdEdit />
                        </Button>
                        <Button size="sm" bg="rgba(139,0,0,0.9)" color="white" _hover={{ bg: 'rgba(139,0,0,1)' }} onClick={() => handleDelete(ingredient.name, 'ingredient')}>
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
        title={`Delete ${selectedItem?.type === 'recipe' ? 'Recipe' : 'Ingredient'}`}
        message={`Are you sure you want to delete "${selectedItem?.name}"? This action cannot be undone.`}
        isDangerous={true}
        isLoading={isLoading}
      />
    </>
  );
}
