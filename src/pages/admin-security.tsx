'use client';

import { Box, Container, Heading, Text, VStack, Grid, Badge } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';

export default function AdminSecurity() {
  const roles = [
    { name: 'Admin', permissions: 'Full access', users: 1 },
    { name: 'Moderator', permissions: 'User management', users: 2 },
    { name: 'User', permissions: 'Limited access', users: 2847 },
  ];

  return (
    <>
      <Sidebar />
      <Box minH="100vh" py={12} color="gray.100" ml={{ base: 0, md: '280px' }} transition="margin 0.3s ease">
        <Container maxW="container.lg">
        <VStack align="stretch" gap={8}>
          {/* Header */}
          <Box>
            <Heading as="h1" size="xl" mb={2}>
              Security & Permissions
            </Heading>
            <Text color="gray.400">
              Manage user roles and permissions
            </Text>
          </Box>

          {/* Roles */}
          <Box>
            <Heading as="h2" size="md" color="white" mb={4}>
              Admin Roles
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
              {roles.map((role, idx) => (
                <Box
                  key={idx}
                  bg="rgba(0,0,0,0.36)"
                  border="1px solid rgba(217,100,46,0.2)"
                  borderRadius="md"
                  p={5}
                  transition="transform 180ms"
                  _hover={{ transform: 'translateY(-6px)' }}
                >
                  <Heading as="h3" size="sm" color="white" mb={2}>
                    {role.name}
                  </Heading>
                  <Text color="gray.400" fontSize="sm" mb={3}>
                    {role.permissions}
                  </Text>
                  <Text color="orange.300" fontSize="lg" fontWeight="700">
                    {role.users} user{role.users !== 1 ? 's' : ''}
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
