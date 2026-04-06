import { Box, Heading, Text, Button, Image, VStack, Flex, Stack, Container } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCurrentUser } from '../../lib/authHooks';

const LOGO = 'https://res.cloudinary.com/djnzwvb2t/image/upload/v1774440374/Master_chef_logo_uhwzq3.png';
const CHARACTER = 'https://res.cloudinary.com/djnzwvb2t/image/upload/v1774440372/Character_rtlfvv.png';
const BACKGROUND = 'https://res.cloudinary.com/djnzwvb2t/image/upload/v1774440372/Background_htozsp.png';

function Home() {
  const router = useRouter();
  const currentUser = useCurrentUser();

  useEffect(() => {
    // Redirect logged-in users to their dashboard
    if (currentUser) {
      if (currentUser.role === 'admin') {
        router.push('/admin-dashboard');
      } else {
        router.push('/gamer-dashboard');
      }
    }
  }, [currentUser, router]);

  // Show nothing while checking auth status
  if (currentUser) {
    return null;
  }

  return (
    <Box minH="100vh" position="relative" overflow="hidden" py={12} px={4}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <NextImage
          src={BACKGROUND}
          alt="background"
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
          priority
          quality={75}
        />
      </div>
      <Box position="absolute" inset={0} bg="rgba(0,0,0,0.35)" zIndex={1} />
      <Container maxW="container.lg" position="relative" zIndex={2}>
        <Flex align="center" justify="center" gap={8}>
          <VStack
            align="center"
            style={{ gap: '24px', backdropFilter: 'blur(6px) saturate(120%)' }}
            bg="linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,245,235,0.65))"
            p={{ base: 8, md: 12 }}
            borderRadius="lg"
            maxW={{ base: '100%', md: '50%' }}
            boxShadow="0 20px 60px rgba(0,0,0,0.45)"
            border="1px solid rgba(217,108,47,0.12)"
            textAlign="center"
          >
            <div style={{ position: 'relative', width: '240px', height: '240px' }}>
              <NextImage
                src={LOGO}
                alt="Master Chef Logo"
                fill
                sizes="(max-width: 768px) 100vw, 240px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <Heading as="h1" fontSize={{ base: '2xl', md: '4xl' }} color="#D9642E" fontWeight="800" textAlign="center">
              Master Chef
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg', lg: 'xl' }} color="#4a2f1a" lineHeight="tall" textAlign="center">
              Welcome to the official Master Chef game website! Download the game, explore features, and join our cooking community.
            </Text>
            <Stack direction="row" pt={2} position="relative" align="center" style={{ gap: '16px' }}>
              <NextLink href="/download" legacyBehavior>
                <Button as="a" bgGradient="linear(to-r, #FF8A3D, #D9642E)" color="white" size="lg" px={12} py={6} _hover={{ transform: 'translateY(-2px)', boxShadow: '0 20px 40px rgba(217,108,47,0.32)' }} transition="all 0.18s ease" borderRadius="full" boxShadow="0 12px 30px rgba(217,108,47,0.28)" id="download-cta">Download Now</Button>
              </NextLink>

              <NextLink href="/game-info" legacyBehavior>
                <Button as="a" variant="outline" borderColor="#D96C2F" color="#D96C2F" size="lg" fontSize={{ base: 'sm', md: 'md' }} px={6} borderRadius="lg">Learn More</Button>
              </NextLink>
            </Stack>
          </VStack>
          <Box
            display={{ base: 'none', md: 'block' }}
            position="absolute"
            top={{ md: '8%' }}
            right={{ md: 0 }}
            width={{ md: '480px' }}
            maxW={{ md: '480px' }}
            zIndex={3}
          >
            <div style={{ position: 'relative', width: '460px', height: '460px' }}>
              <NextImage
                src={CHARACTER}
                alt="Chef Character"
                fill
                sizes="(max-width: 768px) 100vw, 460px"
                style={{
                  objectFit: 'contain',
                  transform: 'translateY(-6px) rotate(-6deg)',
                  filter: 'drop-shadow(0 28px 40px rgba(0,0,0,0.55))',
                }}
                priority
              />
            </div>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

(Home as any).fullWidth = true;

export default Home;