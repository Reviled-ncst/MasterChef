'use client';

import { Box, Container, Grid, Heading, Text, HStack, VStack, Button } from '@chakra-ui/react';

export default function Download() {
  return (
    <Box minH="100vh" py={12} color="gray.100">
      <Container maxW="container.lg">
        <VStack align="stretch" gap={8}>
          {/* Header */}
          <Box mb={4} textAlign="center">
            <Heading as="h1" size="xl" mb={2}>
              Download Master Chef
            </Heading>
            <Text color="gray.400" maxW="3xl" mx="auto">
              Join millions of players worldwide. Master recipes, compete with friends, and become the ultimate Master Chef.
            </Text>
          </Box>

          {/* Download Card */}
          <Box
            bg="rgba(0,0,0,0.36)"
            border="1px solid rgba(217,100,46,0.2)"
            borderRadius="md"
            p={8}
            transition="transform 180ms"
            _hover={{ transform: 'translateY(-6px)' }}
          >
            <VStack align="stretch" gap={4}>
              <Heading as="h2" size="lg" color="white">
                Android Version
              </Heading>
              <Text color="gray.300" fontSize="md">
                Download Master Chef on your Android device and enjoy the full cooking experience. High-quality graphics, smooth gameplay, and regular updates with new content.
              </Text>
              <Text color="orange.300" fontSize="sm" fontWeight="600">
                Now Available
              </Text>
              <Button
                as="a"
                href="https://drive.google.com/uc?export=download&id=1c-xytB42W8725qrS-o8pGUQ58Pdi30M6"
                target="_blank"
                rel="noopener noreferrer"
                bg="#D9642E"
                color="white"
                fontWeight="700"
                _hover={{ bg: '#C65525', transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(217, 100, 46, 0.3)' }}
                transition="all 0.2s"
                alignSelf="flex-start"
              >
                Download Now
              </Button>
            </VStack>
          </Box>

          {/* Features Grid */}
          <Box>
            <Heading as="h3" size="md" color="white" mb={4}>
              Why Master Chef?
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
              {[
                { title: 'Optimized for Mobile', desc: 'Built specifically for Android devices with touch controls' },
                { title: 'Regular Updates', desc: 'New recipes, events, and features added monthly' },
                { title: 'Play Offline', desc: 'Enjoy single-player content without internet' },
              ].map((feature, idx) => (
                <Box
                  key={idx}
                  bg="rgba(0,0,0,0.36)"
                  border="1px solid rgba(217,100,46,0.2)"
                  borderRadius="md"
                  p={5}
                  transition="transform 180ms"
                  _hover={{ transform: 'translateY(-6px)' }}
                >
                  <Heading as="h4" size="sm" color="white" mb={2}>
                    {feature.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.300">
                    {feature.desc}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Box>

          {/* Requirements Section */}
          <Box
            bg="rgba(0,0,0,0.36)"
            border="1px solid rgba(217,100,46,0.2)"
            borderRadius="md"
            p={6}
          >
            <Heading as="h3" size="md" color="white" mb={4}>
              System Requirements
            </Heading>
            <VStack align="start" gap={2}>
              <HStack gap={2}>
                <Text color="orange.300" fontWeight="700">→</Text>
                <Text color="gray.300">Android 7.0 or higher</Text>
              </HStack>
              <HStack gap={2}>
                <Text color="orange.300" fontWeight="700">→</Text>
                <Text color="gray.300">Minimum 2GB RAM</Text>
              </HStack>
              <HStack gap={2}>
                <Text color="orange.300" fontWeight="700">→</Text>
                <Text color="gray.300">500MB storage space</Text>
              </HStack>
              <HStack gap={2}>
                <Text color="orange.300" fontWeight="700">→</Text>
                <Text color="gray.300">Stable internet connection (optional for offline play)</Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
