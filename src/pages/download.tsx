import { Box, Heading, Text, Button, Container, VStack, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { MdAndroid, MdVerified } from 'react-icons/md';

export default function Download() {
  return (
    <Box minH="100vh" py={16} px={4} position="relative">
      <Container maxW="container.lg">
        <VStack align="stretch" style={{ gap: '48px' }}>
          {/* Header Section */}
          <VStack align="center" style={{ gap: '16px' }} textAlign="center">
            <Heading as="h1" size="2xl" color="white">
              Download Master Chef
            </Heading>
            <Text fontSize="lg" color="gray.300" maxW="600px">
              Join millions of players worldwide. Master recipes, compete with friends, and become the ultimate Master Chef.
            </Text>
          </VStack>

          {/* Android Download Section */}
          <Box
            bg="linear-gradient(135deg, rgba(217,100,46,0.2) 0%, rgba(217,100,46,0.05) 100%)"
            border="2px solid rgba(217,100,46,0.3)"
            borderRadius="2xl"
            p={8}
            position="relative"
            overflow="hidden"
          >
            <Box position="absolute" top={-20} right={-20} opacity={0.1} fontSize="200px">
              <MdAndroid />
            </Box>

            <VStack align="stretch" style={{ gap: '24px' }} position="relative" zIndex={2}>
              <HStack style={{ gap: '12px' }} justify="flex-start">
                <Box fontSize="48px" color="#D9642E">
                  <MdAndroid />
                </Box>
                <VStack align="start" style={{ gap: '0px' }}>
                  <Heading as="h2" size="xl" color="white">
                    Android
                  </Heading>
                  <Text color="orange.300" fontWeight="600" fontSize="sm">
                    Now Available
                  </Text>
                </VStack>
              </HStack>

              <Text fontSize="md" color="gray.200" lineHeight="tall">
                Download Master Chef on your Android device and enjoy the full cooking experience. High-quality graphics, smooth gameplay, and regular updates with new content.
              </Text>

              <HStack style={{ gap: '16px' }} flexWrap="wrap">
                <a
                  href="https://drive.google.com/uc?export=download&id=1c-xytB42W8725qrS-o8pGUQ58Pdi30M6"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 32px',
                    fontSize: '16px',
                    fontWeight: '700',
                    backgroundColor: '#D9642E',
                    color: 'white',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#C65525';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(217, 100, 46, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#D9642E';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Download Now
                </a>
              </HStack>
            </VStack>
          </Box>

          {/* Features Grid */}
          <VStack style={{ gap: '24px' }} align="stretch">
            <Heading as="h3" size="lg" color="white" textAlign="center">
              Why Master Chef?
            </Heading>
            <HStack style={{ gap: '24px' }} align="start" flexWrap="wrap" justify="center">
              {[
                { title: 'Optimized for Mobile', desc: 'Built specifically for Android devices with touch controls' },
                { title: 'Regular Updates', desc: 'New recipes, events, and features added monthly' },
                { title: 'Play Offline', desc: 'Enjoy single-player content without internet' },
              ].map((feature, idx) => (
                <Box
                  key={idx}
                  flex={{ base: '1', md: '1' }}
                  minW={{ base: '100%', sm: '250px' }}
                  bg="rgba(217,100,46,0.08)"
                  border="1px solid rgba(217,100,46,0.2)"
                  borderRadius="lg"
                  p={5}
                  textAlign="center"
                >
                  <HStack justify="center" mb={3} style={{ gap: '8px' }}>
                    <MdVerified color="#D9642E" size={24} />
                  </HStack>
                  <Heading as="h4" size="sm" color="white" mb={2}>
                    {feature.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.300">
                    {feature.desc}
                  </Text>
                </Box>
              ))}
            </HStack>
          </VStack>

          {/* Requirements Section */}
          <Box
            bg="rgba(0,0,0,0.4)"
            border="1px solid rgba(217,100,46,0.15)"
            borderRadius="lg"
            p={6}
          >
            <Heading as="h3" size="md" color="white" mb={4}>
              System Requirements
            </Heading>
            <VStack align="start" style={{ gap: '12px' }}>
              <HStack>
                <Text color="orange.300" fontWeight="700">→</Text>
                <Text color="gray.200">Android 7.0 or higher</Text>
              </HStack>
              <HStack>
                <Text color="orange.300" fontWeight="700">→</Text>
                <Text color="gray.200">Minimum 2GB RAM</Text>
              </HStack>
              <HStack>
                <Text color="orange.300" fontWeight="700">→</Text>
                <Text color="gray.200">500MB storage space</Text>
              </HStack>
              <HStack>
                <Text color="orange.300" fontWeight="700">→</Text>
                <Text color="gray.200">Stable internet connection (optional for offline play)</Text>
              </HStack>
            </VStack>
          </Box>

          {/* Support Section */}
          <Box textAlign="center" py={6}>
            <Text color="gray.400" mb={3}>
              Need help? Check our support or community resources
            </Text>
            <HStack justify="center" style={{ gap: '16px' }}>
              <Button variant="ghost" color="orange.300" _hover={{ color: 'orange.200' }}>
                FAQ
              </Button>
              <Button variant="ghost" color="orange.300" _hover={{ color: 'orange.200' }}>
                Support
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}