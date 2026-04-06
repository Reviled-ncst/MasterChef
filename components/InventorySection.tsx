'use client';

import React, { useState } from 'react';
import { Box, HStack, VStack, Button, Text, Badge } from '@chakra-ui/react';
import { MdVpnKey, MdHandyman, MdKitchen, MdPalette } from 'react-icons/md';
import { InventoryItem } from '../lib/mockData';

interface InventorySectionProps {
  items: InventoryItem[];
  onEquip?: (id: string) => void;
}

const rarityColors: { [key: string]: string } = {
  common: '#95a5a6',
  rare: '#3498db',
  epic: '#9b59b6',
  legendary: '#f39c12',
};

export default function InventorySection({ items, onEquip }: InventorySectionProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  const equippedItems = items.filter(i => i.equipped);
  const unequippedItems = items.filter(i => !i.equipped);

  const ItemCard = ({ item }: { item: InventoryItem }) => (
    <Box
      p={3}
      borderRadius="md"
      bg="white"
      border={`2px solid ${rarityColors[item.rarity]}`}
      textAlign="center"
      _hover={{ transform: 'scale(1.05)', boxShadow: `0 8px 16px ${rarityColors[item.rarity]}40` }}
      transition="all 0.2s"
      cursor="pointer"
    >
      <VStack gap={2}>
          <Box
          w="80px"
          h="80px"
          borderRadius="md"
          bg={rarityColors[item.rarity]}
          opacity={0.2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          mx="auto"
        >
          <Box fontSize="32px" color={rarityColors[item.rarity]}>
            {item.type === 'equipment' ? <MdHandyman /> : item.type === 'ingredient' ? <MdKitchen /> : <MdPalette />}
          </Box>
        </Box>
        <VStack gap={0}>
          <Text fontSize="sm" fontWeight="600">
            {item.name}
          </Text>
          <Badge fontSize="9px" colorScheme={item.rarity === 'legendary' ? 'yellow' : item.rarity === 'epic' ? 'purple' : 'gray'}>
            {item.rarity}
          </Badge>
        </VStack>
        <Text fontSize="10px" color="gray.600">
          Qty: {item.quantity}
        </Text>
        <Button size="xs" bg="#D9642E" color="white" w="100%" onClick={() => onEquip?.(item.id)}>
          {item.equipped ? 'Equipped' : 'Equip'}
        </Button>
      </VStack>
    </Box>
  );

  return (
    <Box width="100%">
      <VStack align="stretch" gap={0}>
        {/* Tab Navigation */}
        <HStack pb={4} overflowX="auto" overflowY="hidden" display="flex" gap={2} borderBottom="1px solid rgba(217,108,47,0.1)">
          <Button
            flex={1}
            fontSize="sm"
            fontWeight="600"
            onClick={() => setSelectedTab(0)}
            bg={selectedTab === 0 ? 'orange.100' : 'transparent'}
            color={selectedTab === 0 ? '#D9642E' : 'gray.600'}
            borderBottom={selectedTab === 0 ? '2px solid #D9642E' : 'none'}
            borderRadius={0}
            _hover={{ bg: selectedTab === 0 ? 'orange.100' : 'gray.50' }}
          >
            Equipped ({equippedItems.length})
          </Button>
          <Button
            flex={1}
            fontSize="sm"
            fontWeight="600"
            onClick={() => setSelectedTab(1)}
            bg={selectedTab === 1 ? 'orange.100' : 'transparent'}
            color={selectedTab === 1 ? '#D9642E' : 'gray.600'}
            borderBottom={selectedTab === 1 ? '2px solid #D9642E' : 'none'}
            borderRadius={0}
            _hover={{ bg: selectedTab === 1 ? 'orange.100' : 'gray.50' }}
          >
            Inventory ({unequippedItems.length})
          </Button>
        </HStack>

        {/* Tab Content */}
        <Box pt={4}>
          {selectedTab === 0 && (
            equippedItems.length > 0 ? (
              <Box display="grid" gridTemplateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }} gap={4}>
                {equippedItems.map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </Box>
            ) : (
              <Box p={8} textAlign="center" bg="gray.50" borderRadius="md">
                <Text color="gray.500" fontSize="sm">
                  No equipped items
                </Text>
              </Box>
            )
          )}

          {selectedTab === 1 && (
            unequippedItems.length > 0 ? (
              <Box display="grid" gridTemplateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }} gap={4}>
                {unequippedItems.map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </Box>
            ) : (
              <Box p={8} textAlign="center" bg="gray.50" borderRadius="md">
                <Text color="gray.500" fontSize="sm">
                  No unequipped items
                </Text>
              </Box>
            )
          )}
        </Box>
      </VStack>
    </Box>
  );
}
