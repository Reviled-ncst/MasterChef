'use client';

import { Box, Container, Heading, Text, VStack, HStack, Grid, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';

export default function AdminConfig() {
  const [siteName, setSiteName] = useState('Master Chef');

  return (
    <>
      <Sidebar />
      <Box minH="100vh" py={12} color="gray.100" ml={{ base: 0, md: '280px' }} transition="margin 0.3s ease">
        <Container maxW="container.lg">
        <VStack align="stretch" gap={8}>
          {/* Header */}
          <Box>
            <Heading as="h1" size="xl" mb={2}>
              System Configuration
            </Heading>
            <Text color="gray.400">
              Configure application settings and features
            </Text>
          </Box>

          {/* Application Settings */}
          <Box
            bg="rgba(0,0,0,0.36)"
            border="1px solid rgba(217,100,46,0.2)"
            borderRadius="md"
            p={6}
          >
            <Heading as="h2" size="md" color="white" mb={6}>
              Application Settings
            </Heading>
            <VStack align="stretch" gap={4}>
              <Box>
                <Text color="gray.300" fontSize="sm" fontWeight="600" mb={2}>
                  App Name
                </Text>
                <Input
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  bg="rgba(0,0,0,0.3)"
                  border="1px solid rgba(217,100,46,0.2)"
                  color="white"
                  _placeholder={{ color: 'gray.600' }}
                />
              </Box>

              <Box>
                <Text color="gray.300" fontSize="sm" fontWeight="600" mb={2}>
                  Description
                </Text>
                <Input
                  placeholder="Enter app description"
                  bg="rgba(0,0,0,0.3)"
                  border="1px solid rgba(217,100,46,0.2)"
                  color="white"
                  _placeholder={{ color: 'gray.600' }}
                />
              </Box>

              <Button
                bg="#D9642E"
                color="white"
                fontWeight="700"
                _hover={{ bg: '#C65525' }}
              >
                Save Changes
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
    </>
  );
}
