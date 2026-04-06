'use client';

import { Box, Heading, Text, VStack, HStack, Button, Grid, Badge, Input } from '@chakra-ui/react';
import { MdShoppingCart, MdLocalFireDepartment, MdEmojiEvents, MdOutlineCurrencyYen, MdHandyman, MdPalette, MdStar } from 'react-icons/md';
import { GiDiamonds } from 'react-icons/gi';
import { useCurrentUser } from '../../lib/authHooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { generateShopItems } from '../../lib/mockData';

export default function PlayerShop() {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'gamer') {
      router.push('/');
    } else {
      setIsHydrated(true);
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== 'gamer' || !isHydrated) {
    return null;
  }

  const shopItems = generateShopItems();
  const categories = ['all', 'equipment', 'cosmetic', 'pass'];

  const rarityColors: { [key: string]: string } = {
    common: '#95a5a6',
    rare: '#3498db',
    epic: '#9b59b6',
    legendary: '#f39c12',
  };

  return (
    <Box py={{ base: 4, md: 8 }} px={{ base: 3, md: 8 }}>
      <VStack align="stretch" gap={8}>
        {/* HEADER */}
        <Box>
          <HStack gap={2} mb={4}>
            <Box fontSize="lg" color="#D9642E">
              <MdShoppingCart />
            </Box>
            <Heading as="h1" size={{ base: 'lg', md: '2xl' }} color="#D9642E">
              Shop
            </Heading>
          </HStack>
          <Text color="#D9642E" fontSize={{ base: 'md', md: 'lg' }}>
            Discover equipment, cosmetics, and seasonal items
          </Text>
        </Box>

        {/* FEATURED CAROUSEL */}
        <Box bg="linear-gradient(135deg, rgba(217,100,46,0.2) 0%, rgba(255,184,77,0.1) 100%)" p={{ base: 6, md: 8 }} borderRadius="2xl" border="2px solid #D9642E" textAlign="center">
          <Badge bg="#D9642E" color="white" mb={4} fontSize="sm" px={3} py={1}>
            FEATURED THIS WEEK
          </Badge>
          <Heading as="h2" size={{ base: 'lg', md: '2xl' }} color="white" mb={3}>
            Premium Battle Pass
          </Heading>
          <Text color="white" fontSize={{ base: 'md', md: 'lg' }} mb={6} fontWeight="600">
            Unlock exclusive rewards, cosmetics, and faster progression through 100 levels of seasonal content
          </Text>
          <HStack justify="center" gap={4} flexDirection={{ base: 'column', sm: 'row' }}>
            <Text fontWeight="700" fontSize="xl" color="#FFB84D">
              1,200 coins
            </Text>
            <Button bg="#D9642E" color="white" fontWeight="700" size="lg">
              Buy Now
            </Button>
          </HStack>
        </Box>

        {/* FILTERS & SORT */}
        <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(217,108,47,0.1)">
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr 1fr' }} gap={4}>
            <Box>
              <Text fontSize="sm" fontWeight="600" mb={2} color="#D9642E">
                Category
              </Text>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', borderColor: '#D9642E', border: '1px solid #D9642E', fontSize: '14px' }}>
                <option value="all">All Items</option>
                <option value="equipment">Equipment</option>
                <option value="cosmetic">Cosmetics</option>
                <option value="ingredient">Ingredients</option>
                <option value="pass">Battle Pass</option>
              </select>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="600" mb={2} color="#D9642E">
                Sort by
              </Text>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', borderColor: '#D9642E', border: '1px solid #D9642E', fontSize: '14px' }}>
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="600" mb={2} color="#D9642E">
                Price Range
              </Text>
              <select style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', borderColor: '#D9642E', border: '1px solid #D9642E', fontSize: '14px' }}>
                <option>Any Price</option>
                <option>Under 500 coins</option>
                <option>500 - 1000 coins</option>
                <option>1000+ coins</option>
              </select>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="600" mb={2} color="#D9642E">
                Search
              </Text>
              <Input placeholder="Find item..." borderColor="#D9642E" _focus={{ borderColor: '#D9642E' }} />
            </Box>
          </Grid>
        </Box>

        {/* RARITY FILTER */}
        <Box bg="white" p={4} borderRadius="lg" border="1px solid rgba(217,108,47,0.1)">
          <Text fontSize="sm" fontWeight="600" mb={3} color="#D9642E">
            Filter by Rarity
          </Text>
          <Grid templateColumns={{ base: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }} gap={4}>
            <HStack gap={2}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              <HStack gap={2} flex={1}>
                <Box w={3} h={3} borderRadius="full" bg="#95a5a6" />
                <Text>Common</Text>
              </HStack>
            </HStack>
            <HStack gap={2}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              <HStack gap={2} flex={1}>
                <Box w={3} h={3} borderRadius="full" bg="#3498db" />
                <Text>Rare</Text>
              </HStack>
            </HStack>
            <HStack gap={2}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              <HStack gap={2} flex={1}>
                <Box w={3} h={3} borderRadius="full" bg="#9b59b6" />
                <Text>Epic</Text>
              </HStack>
            </HStack>
            <HStack gap={2}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              <HStack gap={2} flex={1}>
                <Box w={3} h={3} borderRadius="full" bg="#f39c12" />
                <Text>Legendary</Text>
              </HStack>
            </HStack>
          </Grid>
        </Box>

        {/* SHOP GRID */}
        <Box>
          <Heading as="h2" size="lg" color="#D9642E" mb={4}>
            All Items
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }} gap={4}>
            {shopItems.slice(0, 12).map((item) => (
              <Box
                key={item.id}
                bg="white"
                borderRadius="lg"
                overflow="hidden"
                border={`2px solid ${rarityColors[item.rarity] || '#95a5a6'}40`}
                _hover={{
                  boxShadow: `0 12px 24px ${rarityColors[item.rarity] || '#95a5a6'}20`,
                  transform: 'translateY(-4px)',
                  borderColor: rarityColors[item.rarity] || '#95a5a6',
                }}
                transition="all 0.2s"
              >
                {/* Item Image/Icon Area */}
                <Box bg={`${rarityColors[item.rarity] || '#95a5a6'}15`} p={8} textAlign="center">
                  <Box fontSize="48px" color={rarityColors[item.rarity] || '#95a5a6'}>
                    {item.type === 'equipment'
                      ? <MdHandyman />
                      : item.type === 'pass'
                      ? <MdEmojiEvents />
                      : item.type === 'cosmetic'
                      ? <MdPalette />
                      : <MdStar />}
                  </Box>
                </Box>

                {/* Item Details */}
                <Box p={4}>
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="700" fontSize="sm">
                      {item.name}
                    </Text>
                    {item.type === 'pass' && <Badge bg="#FFB84D" color="white" fontSize="9px" fontWeight="700">NEW</Badge>}
                  </HStack>

                  <Text fontSize="xs" color="#D9642E" mb={3} fontWeight="500">
                    {item.description}
                  </Text>

                  <Badge
                    fontSize="9px"
                    colorScheme={
                      item.rarity === 'common'
                        ? 'gray'
                        : item.rarity === 'rare'
                        ? 'blue'
                        : item.rarity === 'epic'
                        ? 'purple'
                        : 'yellow'
                    }
                    mb={3}
                  >
                    {item.rarity.toUpperCase()}
                  </Badge>

                  <HStack justify="space-between">
                    <VStack align="start" gap={0}>
                      <HStack gap={1}>
                        {item.currency === 'coins' ? (
                          <Box color="#FFB84D" fontSize="16px">
                            <MdOutlineCurrencyYen />
                          </Box>
                        ) : (
                          <Box color="#FF6B9D" fontSize="16px">
                            <GiDiamonds />
                          </Box>
                        )}
                        <Text fontWeight="700" color="#D9642E">
                          {item.price}
                        </Text>
                      </HStack>
                    </VStack>
                    <Button size="sm" bg="#D9642E" color="white" fontWeight="600" _hover={{ bg: '#C55527' }}>
                      {item.type === 'pass' ? 'Unlock' : 'Buy'}
                    </Button>
                  </HStack>
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>

        {/* BEST SELLERS */}
        <Box>
          <HStack gap={2} mb={4}>
            <Box fontSize="lg" color="#D9642E">
              <MdLocalFireDepartment />
            </Box>
            <Heading as="h2" size="lg" color="#D9642E">
              Best Sellers
            </Heading>
          </HStack>
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={4}>
            {shopItems
              .slice(0, 3)
              .map((item, idx) => (
                <Box key={item.id} bg="white" borderRadius="lg" border="1px solid rgba(217,108,46,0.2)" p={4} position="relative">
                  {/* Rank Badge */}
                  <Box
                    position="absolute"
                    top={-2}
                    left={4}
                    bg={idx === 0 ? '#FFB84D' : idx === 1 ? '#C0C0C0' : '#CD7F32'}
                    color="white"
                    w={8}
                    h={8}
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="700"
                    fontSize="sm"
                  >
                    {idx === 0 ? '1st' : idx === 1 ? '2nd' : '3rd'}
                  </Box>

                  <VStack align="start" gap={3} pt={4}>
                    <Text fontWeight="700" fontSize="lg">
                      {item.name}
                    </Text>
                    <Badge colorScheme={item.rarity === 'legendary' ? 'yellow' : 'orange'}>
                      {item.rarity.toUpperCase()}
                    </Badge>
                    <Text fontSize="sm" color="#D9642E" fontWeight="500">
                      {item.description}
                    </Text>
                    <HStack width="100%" justify="space-between">
                      <HStack gap={1}>
                        <Text fontWeight="700" color="#D9642E" fontSize="lg">
                          {item.price}
                        </Text>
                        {item.currency === 'coins' ? (
                          <Box color="#FFB84D">
                            <MdOutlineCurrencyYen />
                          </Box>
                        ) : (
                          <Box color="#FF6B9D">
                            <GiDiamonds />
                          </Box>
                        )}
                      </HStack>
                      <Button size="sm" bg="#D9642E" color="white" fontWeight="600">
                        Buy
                      </Button>
                    </HStack>
                  </VStack>
                </Box>
              ))}
          </Grid>
        </Box>
      </VStack>
    </Box>
  );
}

PlayerShop.title = 'Shop - Master Chef';
