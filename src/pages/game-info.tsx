import { Box, Heading, Text, VStack, Grid, GridItem, Progress, Badge, Button } from '@chakra-ui/react';
import { MdEmojiEvents, MdStar, MdLock } from 'react-icons/md';
import CustomProgress from '../../components/CustomProgress';

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <Box
      bg="white"
      p={{ base: 4, md: 6 }}
      borderRadius="lg"
      boxShadow="0 2px 8px rgba(0,0,0,0.06)"
      border="1px solid rgba(217,108,47,0.08)"
      _hover={{ boxShadow: '0 8px 20px rgba(217,108,47,0.12)', transform: 'translateY(-2px)' }}
      transition="all 0.18s ease"
    >
      <Heading as="h3" size={{ base: 'sm', md: 'md' }} mb={3} style={{ color: '#000000' }}>
        {title}
      </Heading>
      <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }} lineHeight="tall">
        {description}
      </Text>
    </Box>
  );
}

export default function GameInfo() {
  return (
    <Box py={{ base: 6, md: 10 }} px={{ base: 4, md: 6 }} minH="100vh" width="100%" overflowX="hidden">
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <img src="https://res.cloudinary.com/djnzwvb2t/image/upload/v1774440372/Background_htozsp.png" alt="background" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 1 }} />
      <Box position="relative" zIndex={2} maxW="1200px" mx="auto" width="100%">
      <VStack align="stretch" gap={{ base: 6, md: 8, lg: 12 }} width="100%">
        {/* Hero Section */}
        <VStack align="center" gap={{ base: 3, md: 4 }} textAlign="center">
          <Heading as="h1" size={{ base: 'lg', md: '2xl', lg: '3xl' }} style={{ color: '#FFFFFF !important' }}>
            Master Chef Game
          </Heading>
          <Text fontSize={{ base: 'sm', md: 'lg' }} color="#FFFFFF" maxW="2xl">
            Experience the ultimate cooking adventure! Master recipes, compete with players worldwide, and become the ultimate Master Chef.
          </Text>
        </VStack>

        {/* Features Section */}
        <VStack align="stretch" gap={{ base: 3, md: 4 }} width="100%">
          <Heading as="h2" size={{ base: 'md', md: 'lg' }} style={{ color: '#FFFFFF !important' }}>
            Game Features
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={{ base: 3, md: 6 }} width="100%">
            <GridItem>
              <FeatureCard
                title="Recipe Mastery"
                description="Learn and master hundreds of recipes from around the world. Perfect your cooking techniques and unlock new dishes as you progress."
              />
            </GridItem>
            <GridItem>
              <FeatureCard
                title="Competitive Gameplay"
                description="Challenge players worldwide in timed cooking competitions. Test your skills and climb the leaderboards to become the ultimate Master Chef."
              />
            </GridItem>
            <GridItem>
              <FeatureCard
                title="Ingredient Discovery"
                description="Explore exotic ingredients and learn their properties. Combine them creatively to discover unique recipes and hidden rewards."
              />
            </GridItem>
            <GridItem>
              <FeatureCard
                title="Restaurant Management"
                description="Build and manage your own virtual restaurant. Hire staff, upgrade equipment, and create a culinary empire."
              />
            </GridItem>
          </Grid>
        </VStack>

        {/* Battle Pass Section */}
        <VStack align="stretch" gap={{ base: 3, md: 4 }} width="100%">
          <Heading as="h2" size={{ base: 'md', md: 'lg' }} style={{ color: '#FFFFFF !important' }} display="flex" alignItems="center" gap={2} flexWrap="wrap">
            <Box fontSize={{ base: '18px', md: '24px' }}><MdStar /></Box>
            Battle Pass System
          </Heading>
          <Box bg="linear-gradient(135deg, rgba(217,100,46,0.15) 0%, rgba(255,184,77,0.08) 100%)" p={{ base: 3, md: 8 }} borderRadius="lg" border="2px solid #FFFFFF" width="100%" overflowX="hidden">
            <VStack align="stretch" gap={4} width="100%">
              <Box>
                <Text fontSize="sm" fontWeight="600" mb={2} color="#FFFFFF">
                  Current Progress
                </Text>
                <CustomProgress value={49} colorScheme="orange" height="8px" />
                <Text fontSize="xs" color="#FFFFFF" mt={2}>
                  49/100 levels unlocked
                </Text>
              </Box>
              <Heading as="h3" size={{ base: 'sm', md: 'md' }} style={{ color: '#FFFFFF !important' }}>
                Reward Tiers
              </Heading>
              <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: 'repeat(5, 1fr)' }} gap={{ base: 3, md: 4 }}>
                {/* Unlocked Rewards */}
                <Box borderRadius="lg" border="2px solid #FFFFFF" p={{ base: 3, md: 4 }} textAlign="center" bg="white">
                  <Box fontSize={{ base: '24px', md: '32px' }} mb={2} style={{ color: '#D9642E !important' }}>
                    <MdStar />
                  </Box>
                  <Text fontWeight="700" fontSize={{ base: 'xs', md: 'sm' }} mb={1} color="gray.700">Gold</Text>
                  <Text fontSize={{ base: '10px', md: 'xs' }} style={{ color: '#D9642E' }} fontWeight="600">500 Coins</Text>
                </Box>
                <Box borderRadius="lg" border="2px solid #FFFFFF" p={{ base: 3, md: 4 }} textAlign="center" bg="white">
                  <Box fontSize={{ base: '24px', md: '32px' }} mb={2} style={{ color: '#D9642E !important' }}>
                    <MdStar />
                  </Box>
                  <Text fontWeight="700" fontSize={{ base: 'xs', md: 'sm' }} mb={1} color="gray.700">Golden Knife</Text>
                  <Text fontSize={{ base: '10px', md: 'xs' }} style={{ color: '#D9642E' }} fontWeight="600">Equipment</Text>
                </Box>
                <Box borderRadius="lg" border="2px solid #FFFFFF" p={{ base: 3, md: 4 }} textAlign="center" bg="white">
                  <Box fontSize={{ base: '24px', md: '32px' }} mb={2} style={{ color: '#D9642E !important' }}>
                    <MdStar />
                  </Box>
                  <Text fontWeight="700" fontSize={{ base: 'xs', md: 'sm' }} mb={1} color="gray.700">Epic Cosmetic</Text>
                  <Text fontSize={{ base: '10px', md: 'xs' }} style={{ color: '#D9642E' }} fontWeight="600">Exclusive Skin</Text>
                </Box>
                {/* Locked Rewards */}
                <Box borderRadius="lg" border="1px solid #ccc" p={{ base: 3, md: 4 }} textAlign="center" bg="gray.50" opacity={0.6}>
                  <Box fontSize={{ base: '24px', md: '32px' }} mb={2} color="gray.400">
                    <MdLock />
                  </Box>
                  <Text fontWeight="700" fontSize={{ base: 'xs', md: 'sm' }} mb={1} color="gray.500">Lvl 50</Text>
                  <Text fontSize={{ base: '10px', md: 'xs' }} color="gray.500">Legendary Item</Text>
                </Box>
                <Box borderRadius="lg" border="1px solid #ccc" p={{ base: 3, md: 4 }} textAlign="center" bg="gray.50" opacity={0.6}>
                  <Box fontSize={{ base: '24px', md: '32px' }} mb={2} color="gray.400">
                    <MdLock />
                  </Box>
                  <Text fontWeight="700" fontSize={{ base: 'xs', md: 'sm' }} mb={1} color="gray.500">Lvl 100</Text>
                  <Text fontSize={{ base: '10px', md: 'xs' }} color="gray.500">Ultimate Reward</Text>
                </Box>
              </Grid>
            </VStack>
          </Box>
        </VStack>

        {/* Featured Tournament Section */}
        <VStack align="stretch" gap={{ base: 3, md: 4 }} width="100%">
          <Heading as="h2" size={{ base: 'md', md: 'lg' }} style={{ color: '#FFFFFF !important' }} display="flex" alignItems="center" gap={2} flexWrap="wrap">
            <Box fontSize={{ base: '18px', md: '24px' }}><MdEmojiEvents /></Box>
            Featured Tournament
          </Heading>
          <Box bg="linear-gradient(135deg, rgba(217,100,46,0.15) 0%, rgba(255,184,77,0.08) 100%)" p={{ base: 3, md: 8 }} borderRadius="lg" border="2px solid #FFFFFF" width="100%" overflowX="hidden">
            <VStack align="stretch" gap={4} width="100%">
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2} flexWrap="wrap" gap={2}>
                <h3 style={{ color: '#FFFFFF', fontSize: 'clamp(14px, 5vw, 18px)', fontWeight: 700, margin: 0 }}>
                  Spring Championship 2024
                </h3>
                <Badge bg="#D9642E" color="white" fontWeight="700" fontSize={{ base: 'xs', md: 'sm' }}>
                  FEATURED
                </Badge>
              </Box>
              <Text color="#FFFFFF" fontSize={{ base: 'xs', md: 'sm' }}>
                Featured Tournament
              </Text>
              <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
                <Box>
                  <Text fontSize="xs" color="#FFFFFF" fontWeight="600" mb={1}>
                    Prize Pool
                  </Text>
                  <Text fontSize="lg" fontWeight="700" style={{ color: '#FFFFFF !important' }}>
                    100,000 coins
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="#FFFFFF" fontWeight="600" mb={1}>
                    Entry Fee
                  </Text>
                  <Text fontSize="lg" fontWeight="700" style={{ color: '#FFFFFF !important' }}>
                    500 coins
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="#FFFFFF" fontWeight="600" mb={1}>
                    Participants
                  </Text>
                  <Text fontSize="lg" fontWeight="700" style={{ color: '#FFFFFF !important' }}>
                    73/120
                  </Text>
                </Box>
              </Grid>
              <Box>
                <Text fontSize="xs" color="#FFFFFF" fontWeight="600" mb={2}>
                  Participants Filled
                </Text>
                <CustomProgress value={60} colorScheme="orange" height="8px" />
              </Box>
              <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="lg">
                <Heading as="h4" size={{ base: 'xs', md: 'sm' }} color="gray.700" mb={3}>
                  TOP REWARDS
                </Heading>
                <Grid templateColumns={{ base: '1fr', sm: 'repeat(3, 1fr)' }} gap={{ base: 2, md: 4 }} textAlign="center">
                  <Box>
                    <Box fontSize={{ base: '24px', md: '32px' }} mb={2} color="#FFD700">
                      <MdEmojiEvents />
                    </Box>
                    <Text fontWeight="700" fontSize={{ base: 'xs', md: 'sm' }} mb={1}>1st</Text>
                    <Text fontSize={{ base: '10px', md: 'sm' }} style={{ color: '#D9642E' }} fontWeight="600">50,000 coins</Text>
                  </Box>
                  <Box>
                    <Box fontSize={{ base: '24px', md: '32px' }} mb={2} color="#C0C0C0">
                      <MdEmojiEvents />
                    </Box>
                    <Text fontWeight="700" fontSize={{ base: 'xs', md: 'sm' }} mb={1}>2nd</Text>
                    <Text fontSize={{ base: '10px', md: 'sm' }} style={{ color: '#D9642E' }} fontWeight="600">30,000 coins</Text>
                  </Box>
                  <Box>
                    <Box fontSize={{ base: '24px', md: '32px' }} mb={2} color="#CD7F32">
                      <MdEmojiEvents />
                    </Box>
                    <Text fontWeight="700" fontSize={{ base: 'xs', md: 'sm' }} mb={1}>3rd</Text>
                    <Text fontSize={{ base: '10px', md: 'sm' }} style={{ color: '#D9642E' }} fontWeight="600">20,000 coins</Text>
                  </Box>
                </Grid>
              </Box>
              <Button bg="#D9642E" color="white" fontWeight="700" width="100%" py={{ base: 4, md: 6 }} fontSize={{ base: 'sm', md: 'lg' }} _hover={{ bg: '#C55527' }}>
                Register Now
              </Button>
            </VStack>
          </Box>
        </VStack>
        <VStack align="stretch" gap={{ base: 3, md: 4 }} width="100%">
          <Heading as="h2" size={{ base: 'md', md: 'lg' }} style={{ color: '#FFFFFF !important' }}>
            The Story
          </Heading>
          <Box bg="rgba(217,100,46,0.04)" p={{ base: 4, md: 6 }} borderRadius="lg" borderLeft={{ base: '3px', md: '4px' }} borderLeftColor="#FFFFFF">
            <Text fontSize={{ base: 'sm', md: 'md' }} lineHeight="tall" color="#FFFFFF">
              Begin your culinary journey in a vibrant cooking world where talent, creativity, and strategy determine your success.
              From humble kitchen beginnings to running world-renowned restaurants, your decisions shape your path to become the Master Chef.
              <br /><br />
              Collaborate with friends, compete in tournaments, and prove your worth in the most prestigious cooking competitions.
              Every dish you create brings you closer to culinary greatness.
            </Text>
          </Box>
        </VStack>

        {/* Requirements Section */}
        <VStack align="stretch" gap={{ base: 3, md: 4 }} width="100%">
          <Heading as="h2" size={{ base: 'md', md: 'lg' }} style={{ color: '#FFFFFF !important' }}>
            System Requirements
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={{ base: 3, md: 6 }} width="100%">
            <Box>
              <Heading as="h3" size={{ base: 'sm', md: 'md' }} mb={3} color="#FFFFFF">
                Minimum
              </Heading>
              <VStack align="start" gap={{ base: 2, md: 2 }}>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="#FFFFFF">OS: Windows 10 / macOS 10.14+</Text>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="#FFFFFF">RAM: 4 GB</Text>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="#FFFFFF">Storage: 2 GB available space</Text>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="#FFFFFF">Processor: Intel Core i5</Text>
              </VStack>
            </Box>
            <Box>
              <Heading as="h3" size={{ base: 'sm', md: 'md' }} mb={3} color="#FFFFFF">
                Recommended
              </Heading>
              <VStack align="start" gap={{ base: 2, md: 2 }}>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="#FFFFFF">OS: Windows 11 / macOS 12+</Text>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="#FFFFFF">RAM: 8 GB</Text>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="#FFFFFF">Storage: 4 GB available space</Text>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="#FFFFFF">Processor: Intel Core i7 or equivalent</Text>
              </VStack>
            </Box>
          </Grid>
        </VStack>
      </VStack>
      </Box>
    </Box>
  );
}