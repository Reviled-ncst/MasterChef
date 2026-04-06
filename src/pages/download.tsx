import { useState } from 'react';
import { Box, Heading, Text, Button, Stack, Container, VStack } from '@chakra-ui/react';

export default function Download() {
  const [platform, setPlatform] = useState<'windows' | 'mac' | 'linux'>('windows');
  const selectedBg = '#D9642E';
  const selectedHover = '#C65525';
  const unselectedBg = '#1F1F1F';
  const platformLabel = platform === 'windows' ? 'Windows (64-bit)' : platform === 'mac' ? 'macOS' : 'Linux';

  return (
    <Box minH="80vh" py={12} px={4}>
      <Container maxW="container.md" color="gray.100">
        <VStack align="stretch" bg="rgba(0,0,0,0.56)" p={6} borderRadius="md" boxShadow="sm" style={{ gap: '24px' }}>
          <Heading as="h2" size="xl" mb={4} color="orange.300">
            Download Master Chef
          </Heading>

          <Text fontSize="lg" mb={6}>
            Choose your platform and download the latest builds. This page will be protected once authentication is enabled.
          </Text>

          <Stack direction="column">
            <Stack direction={{ base: 'column', md: 'row' }} pt={4} style={{ gap: '16px' }}>
              <Button onClick={() => setPlatform('windows')} bg={platform === 'windows' ? selectedBg : unselectedBg} color="white" _hover={{ bg: platform === 'windows' ? selectedHover : 'gray.700' }}>
                Windows (64-bit)
              </Button>
              <Button onClick={() => setPlatform('mac')} bg={platform === 'mac' ? selectedBg : unselectedBg} color={platform === 'mac' ? 'white' : '#D96C2F'} borderColor={platform === 'mac' ? 'transparent' : '#D96C2F'} _hover={{ bg: platform === 'mac' ? selectedHover : 'gray.700' }}>
                macOS
              </Button>
              <Button onClick={() => setPlatform('linux')} bg={platform === 'linux' ? selectedBg : unselectedBg} color="white" _hover={{ bg: platform === 'linux' ? selectedHover : 'gray.700' }}>
                Linux
              </Button>
            </Stack>

            <Box mt={6} p={4} bg="rgba(0,0,0,0.24)" borderRadius="md">
              <Heading as="h4" size="md" mb={2} color="gray.200">Selected platform</Heading>
              <Text fontSize="sm" color="gray.300" mb={3}>You have selected: <strong>{platformLabel}</strong></Text>
              <Button colorScheme="orange">Download for {platformLabel}</Button>
            </Box>
          </Stack>

          <Box mt={8} p={4} bg="rgba(0,0,0,0.36)" borderRadius="md">
            <Heading as="h4" size="md" mb={2} color="gray.200">System Requirements</Heading>
            <Text fontSize="sm" color="gray.300">
              Note: Installers include optional high-resolution assets. We'll enable gated downloads after adding authentication.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}