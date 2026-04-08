'use client';

import { Box, Container, Heading, Text, VStack, HStack, Grid, Button, Input } from '@chakra-ui/react';
import { MdSettings, MdSave } from 'react-icons/md';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';

export default function AdminSettings() {
  const [siteName, setSiteName] = useState('Master Chef');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [enableRegistration, setEnableRegistration] = useState(true);

  const handleSave = () => {
    alert('Settings saved successfully!');
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
                System Settings
              </Heading>
              <Text color="gray.400">
                Configure system-wide settings
              </Text>
            </Box>
            <Button
              bg="#D9642E"
              color="white"
              fontWeight="700"
              _hover={{ bg: '#C65525', transform: 'translateY(-2px)' }}
              transition="all 0.2s"
              onClick={handleSave}
            >
              <MdSave style={{ marginRight: '8px' }} />
              Save Settings
            </Button>
          </HStack>

          {/* General Settings */}
          <Box
            bg="rgba(0,0,0,0.36)"
            border="1px solid rgba(217,100,46,0.2)"
            borderRadius="md"
            p={6}
          >
            <Heading as="h2" size="md" color="white" mb={6}>
              General Settings
            </Heading>
            <VStack align="stretch" gap={4}>
              <Box>
                <Text color="gray.300" fontSize="sm" fontWeight="600" mb={2}>
                  Site Name
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
                <HStack justify="space-between">
                  <Box>
                    <Text color="gray.300" fontWeight="600">
                      Maintenance Mode
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                      Disable access except for admins
                    </Text>
                  </Box>
                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                    style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                  />
                </HStack>
              </Box>

              <Box>
                <HStack justify="space-between">
                  <Box>
                    <Text color="gray.300" fontWeight="600">
                      Enable Registration
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                      Allow new user signups
                    </Text>
                  </Box>
                  <input
                    type="checkbox"
                    checked={enableRegistration}
                    onChange={(e) => setEnableRegistration(e.target.checked)}
                    style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                  />
                </HStack>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
    </>
  );
}
