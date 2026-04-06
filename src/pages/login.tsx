import { Box, Heading, Input, Button, VStack, Text, Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Login() {
  return (
    <Box py={10} px={6} maxW="md" mx="auto">
      <VStack align="stretch" style={{ gap: '32px' }}>
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={3} color="#D9642E">
            Welcome Back
          </Heading>
          <Text color="gray.600" fontSize="md">
            Login to your Master Chef account
          </Text>
        </Box>

        <VStack align="stretch" style={{ gap: '16px' }}>
          <VStack align="start" style={{ gap: '6px' }}>
            <Text fontWeight="600" fontSize="sm" color="gray.700">
              Email
            </Text>
            <Input
              placeholder="Enter your email"
              type="email"
              borderColor="gray.300"
              _focus={{ borderColor: '#D9642E', boxShadow: '0 0 0 3px rgba(217,100,46,0.1)' }}
              fontSize="md"
              py={3}
            />
          </VStack>

          <VStack align="start" style={{ gap: '6px' }}>
            <Text fontWeight="600" fontSize="sm" color="gray.700">
              Password
            </Text>
            <Input
              placeholder="Enter your password"
              type="password"
              borderColor="gray.300"
              _focus={{ borderColor: '#D9642E', boxShadow: '0 0 0 3px rgba(217,100,46,0.1)' }}
              fontSize="md"
              py={3}
            />
          </VStack>

          <Button
            width="full"
            bgGradient="linear(to-r, #FF8A3D, #D9642E)"
            color="white"
            fontSize="md"
            fontWeight="700"
            py={3}
            _hover={{ transform: 'translateY(-2px)', boxShadow: '0 12px 30px rgba(217,108,47,0.28)' }}
            transition="all 0.18s ease"
          >
            Login
          </Button>
        </VStack>

        <Box textAlign="center">
          <Text color="gray.600" fontSize="sm">
            Don&apos;t have an account?{' '}
            <ChakraLink
              as={NextLink}
              href="/register"
              color="#D9642E"
              fontWeight="600"
              _hover={{ textDecoration: 'underline' }}
            >
              Register here
            </ChakraLink>
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}