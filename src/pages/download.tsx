import { Box, Heading, Text, Button, Container, VStack } from '@chakra-ui/react';

export default function Download() {
  return (
    <Box minH="80vh" py={12} px={4}>
      <Container maxW="container.md" color="gray.100">
        <VStack align="stretch" bg="rgba(0,0,0,0.56)" p={6} borderRadius="md" boxShadow="sm" style={{ gap: '24px' }}>
          <Heading as="h2" size="xl" mb={4} color="orange.300">
            Download Master Chef
          </Heading>

          <Text fontSize="lg" mb={6}>
            Download Master Chef for Android and enjoy the game on your mobile device.
          </Text>

          <Box p={4} bg="rgba(0,0,0,0.24)" borderRadius="md">
            <Heading as="h4" size="md" mb={2} color="gray.200">Android</Heading>
            <Text fontSize="sm" color="gray.300" mb={4}>Available on Google Play Store</Text>
            <Button colorScheme="orange" size="lg">
              Download for Android
            </Button>
          </Box>

          <Box mt={8} p={4} bg="rgba(0,0,0,0.36)" borderRadius="md">
            <Heading as="h4" size="md" mb={2} color="gray.200">System Requirements</Heading>
            <Text fontSize="sm" color="gray.300">
              Android 7.0 or higher. The game will be available on the Google Play Store.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}