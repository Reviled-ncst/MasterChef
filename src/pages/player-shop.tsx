'use client';

import { Box, Heading, Text, VStack, HStack, Button, Grid, Badge, Input } from '@chakra-ui/react';
import { MdShoppingCart, MdLocalFireDepartment, MdEmojiEvents, MdOutlineCurrencyYen, MdHandyman, MdPalette, MdStar } from 'react-icons/md';
import { GiDiamonds } from 'react-icons/gi';
import { useCurrentUser } from '../../lib/authHooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { generateShopItems } from '../../lib/mockData';

const animationStyles = `
  /* ENTRANCE ANIMATIONS */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes bounceIn {
    0% { opacity: 0; transform: scale(0.8); }
    50% { transform: scale(1.08); }
    100% { opacity: 1; transform: scale(1); }
  }

  @keyframes popIn {
    0% { opacity: 0; transform: scale(0.5) rotate(-10deg); }
    50% { transform: scale(1.12) rotate(5deg); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
  }

  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes rotateIn {
    from { opacity: 0; transform: scale(0.8) rotate(-20deg); }
    to { opacity: 1; transform: scale(1) rotate(0deg); }
  }

  /* INTERACTIVE ANIMATIONS */
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(217,100,46,0.3), 0 8px 32px rgba(217,100,46,0.15); }
    50% { box-shadow: 0 0 40px rgba(217,100,46,0.5), 0 16px 48px rgba(217,100,46,0.25); }
  }

  @keyframes glowRarity {
    0%, 100% { filter: drop-shadow(0 0 8px currentColor); }
    50% { filter: drop-shadow(0 0 20px currentColor); }
  }

  @keyframes iconSpin {
    0% { transform: rotate(0deg) scale(1); filter: hue-rotate(0deg); }
    50% { transform: rotate(180deg) scale(1.1); }
    100% { transform: rotate(360deg) scale(1); filter: hue-rotate(45deg); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(8deg); }
  }

  @keyframes itemGlow {
    0%, 100% { box-shadow: 0 0 15px rgba(217,100,46,0.2); }
    50% { box-shadow: 0 0 30px rgba(217,100,46,0.4); }
  }

  /* STATE ANIMATIONS */
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }

  @keyframes breathing {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.9; transform: scale(1.02); }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.88); }
    to { opacity: 1; transform: scale(1); }
  }

  .shop-header {
    animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .featured-banner {
    animation: popIn 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s backwards;
    position: relative;
    background: linear-gradient(135deg, #D9642E 0%, #FF8A3D 50%, #FFB84D 100%);
    background-size: 200% 100%;
    transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .featured-banner:hover {
    box-shadow: 0 0 60px rgba(217,100,46,0.5), 0 24px 80px rgba(217,100,46,0.3);
    transform: translateY(-4px) scale(1.01);
  }

  .featured-badge {
    animation: shimmer 2s linear infinite;
  }

  .filter-section {
    animation: slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s backwards;
    background: rgba(255,255,255,0.06) !important;
    backdrop-filter: blur(8px) !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
  }

  .rarity-filter {
    animation: slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s backwards;
  }

  /* SHOP GRID ITEMS WITH VARIED EASING */
  .shop-item {
    animation: bounceIn 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }

  .shop-item:nth-child(1) { animation-delay: 0.5s; animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
  .shop-item:nth-child(2) { animation-delay: 0.58s; animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
  .shop-item:nth-child(3) { animation-delay: 0.66s; animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
  .shop-item:nth-child(4) { animation-delay: 0.74s; animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
  .shop-item:nth-child(5) { animation-delay: 0.82s; animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
  .shop-item:nth-child(6) { animation-delay: 0.9s; animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }

  .shop-item:hover {
    transform: translateY(-12px) scale(1.06);
    box-shadow: 0 0 40px rgba(217,100,46,0.4), 0 20px 60px rgba(217,100,46,0.25);
  }

  .shop-item-icon {
    animation: float 3.5s ease-in-out infinite;
    transition: all 0.3s ease;
  }

  .shop-item:hover .shop-item-icon {
    animation: iconSpin 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
    filter: drop-shadow(0 0 20px rgba(217,100,46,0.6));
  }

  .bestseller-item {
    animation: rotateIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .bestseller-item:nth-child(1) { animation-delay: 1.2s; }
  .bestseller-item:nth-child(2) { animation-delay: 1.38s; }
  .bestseller-item:nth-child(3) { animation-delay: 1.56s; }

  .bestseller-item:hover {
    transform: translateY(-8px) scale(1.04);
    box-shadow: 0 0 30px rgba(217,100,46,0.3), 0 12px 36px rgba(217,100,46,0.2);
  }

  .rarity-border {
    animation: glowRarity 2s ease-in-out infinite;
    transition: border 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* PRICE TAG ANIMATION */
  .price-tag {
    animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
  }

  /* CATEGORY TABS */
  .category-tab {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
  }

  .category-tab::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #D9642E, #FFB84D);
    border-radius: 2px;
    transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .category-tab.active::after {
    width: 100%;
  }

  .category-tab:hover {
    transform: translateY(-2px);
    color: #D9642E;
  }
`;

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
    <>
      <style>{animationStyles}</style>
      <Box py={{ base: 4, md: 8 }} px={{ base: 3, md: 8 }}>
        <VStack align="stretch" gap={8}>
          {/* HEADER */}
          <Box className="shop-header" bg="linear-gradient(135deg, rgba(217,100,46,0.35) 0%, rgba(168,85,247,0.25) 100%)" borderRadius="3xl" p={{ base: 6, md: 8 }} border="2px solid rgba(217,100,46,0.5)">
          <HStack gap={3}>
            <Box fontSize="40px" color="white">
              <MdShoppingCart />
            </Box>
            <VStack align="start" gap={0}>
              <Heading as="h1" size={{ base: 'lg', md: '2xl' }} color="white">
                Master Chef Shop
              </Heading>
              <Text color="rgba(255,255,255,0.95)" fontSize={{ base: 'sm', md: 'md' }}>
                Discover equipment, cosmetics, and seasonal items
              </Text>
            </VStack>
          </HStack>
        </Box>

        {/* FEATURED CAROUSEL */}
        <Box className="featured-banner" bg="linear-gradient(135deg, #D9642E 0%, #FF8A3D 50%, #FFB84D 100%)" p={{ base: 6, md: 10 }} borderRadius="3xl" border="2px solid rgba(255,255,255,0.3)" textAlign="center" position="relative" overflow="hidden" boxShadow="0 12px 40px rgba(217, 100, 46, 0.3)">
          <Box position="absolute" top={-40} right={-40} fontSize="200px" opacity={0.1}>
            <MdStar />
          </Box>
          <VStack gap={4} position="relative" zIndex={2}>
            <Badge bg="rgba(255,255,255,0.3)" color="white" mb={2} fontSize="sm" px={4} py={2} fontWeight="700">
              ✨ FEATURED THIS WEEK
            </Badge>
            <Heading as="h2" size={{ base: 'xl', md: '3xl' }} color="white" mb={2}>
              Premium Battle Pass
            </Heading>
            <Text color="white" fontSize={{ base: 'md', md: 'lg' }} mb={6} maxW="600px" lineHeight="tall">
              Unlock exclusive rewards, cosmetics, and faster progression through 100 levels of seasonal content. Limited time offer!
            </Text>
            <HStack justify="center" gap={4} flexDirection={{ base: 'column', sm: 'row' }}>
              <Box bg="white" color="#D9642E" fontWeight="700" fontSize="2xl" px={6} py={3} borderRadius="xl">
                1,200 coins
              </Box>
              <Button bg="white" color="#D9642E" fontWeight="700" size="lg" borderRadius="xl" _hover={{ transform: 'scale(1.05)', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }} transition="all 0.2s">
                Buy Now
              </Button>
            </HStack>
          </VStack>
        </Box>

        {/* FILTERS & SORT */}
        <Box className="filter-section" bg="white" p={6} borderRadius="lg" border="1px solid rgba(217,108,47,0.1)">
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
        <Box className="rarity-filter" bg="white" p={4} borderRadius="lg" border="1px solid rgba(217,108,47,0.1)">
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
                className="shop-item"
                bg="white"
                borderRadius="lg"
                overflow="hidden"
                border={`2px solid ${rarityColors[item.rarity] || '#95a5a6'}40`}
                _hover={{
                  boxShadow: `0 12px 24px ${rarityColors[item.rarity] || '#95a5a6'}20`,
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
                <Box key={item.id} className="bestseller-item" bg="white" borderRadius="lg" border="1px solid rgba(217,108,46,0.2)" p={4} position="relative">
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
    </>
  );
}

PlayerShop.title = 'Shop - Master Chef';
