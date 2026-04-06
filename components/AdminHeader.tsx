import { Box, HStack, VStack, Input, Button, Badge, Text } from '@chakra-ui/react';
import { useCurrentUser } from '../lib/authHooks';
import { useAuth } from '../lib/authContext';
import { useState } from 'react';
import { MdNotifications, MdPerson, MdLock } from 'react-icons/md';
import { FaSignOutAlt } from 'react-icons/fa';

const ADMIN_HEADER_HEIGHT = '64px';

export default function AdminHeader() {
  const currentUser = useCurrentUser();
  const { logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    console.log('Admin logout clicked');
    logout();
    setShowUserMenu(false);
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={{ base: 0, md: '280px' }}
      right={0}
      height={ADMIN_HEADER_HEIGHT}
      bg="white"
      borderBottom="1px solid rgba(0,0,0,0.08)"
      boxShadow="0 2px 8px rgba(0,0,0,0.06)"
      zIndex={40}
      transition="all 0.3s ease"
    >
      <HStack
        h="100%"
        px={6}
        justify="space-between"
        align="center"
        style={{ gap: '24px' }}
      >
        {/* Logo/Branding */}
        <Box display={{ base: 'none', md: 'block' }} fontWeight="700" color="#D9642E" fontSize="lg">
          Master Chef Admin
        </Box>

        {/* Search Bar */}
        <Box flex={1} maxW="400px" display={{ base: 'none', lg: 'block' }}>
          <Input
            placeholder="Search users, content, logs..."
            border="1px solid #e6e6e6"
            borderRadius="lg"
            fontSize="sm"
            _focus={{ borderColor: '#D9642E', boxShadow: '0 0 0 3px rgba(217,108,47,0.1)' }}
          />
        </Box>

        {/* Right Section: Notifications + User Menu */}
        <HStack style={{ gap: '16px' }} align="center">
          {/* Notifications */}
          <Box position="relative" cursor="pointer" display="flex" alignItems="center">
            <MdNotifications size={20} />
            <Badge
              position="absolute"
              top="-4px"
              right="-4px"
              bg="#ef4444"
              color="white"
              borderRadius="full"
              fontSize="xs"
              w="20px"
              h="20px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              2
            </Badge>
          </Box>

          {/* User Menu */}
          <Box position="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              _hover={{ bg: 'gray.100' }}
            >
              <HStack style={{ gap: '8px' }}>
                <MdPerson size={20} />
                <VStack align="start" style={{ gap: 0 }} display={{ base: 'none', md: 'flex' }}>
                  <Text fontSize="sm" fontWeight="600" color="#1a1a1a">
                    {currentUser?.name}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {currentUser?.role}
                  </Text>
                </VStack>
              </HStack>
            </Button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <Box
                position="absolute"
                top="100%"
                right={0}
                mt={1}
                bg="white"
                border="1px solid #e6e6e6"
                borderRadius="lg"
                boxShadow="0 4px 12px rgba(0,0,0,0.1)"
                zIndex={50}
                minW="180px"
                overflow="hidden"
              >
                <VStack align="stretch" style={{ gap: 0 }}>
                  <Box px={4} py={3} borderBottom="1px solid #f0f0f0" bg="gray.50">
                    <Text fontSize="xs" fontWeight="600" color="gray.600" textTransform="uppercase">
                      Account
                    </Text>
                  </Box>
                  <Button variant="ghost" justifyContent="flex-start" size="sm" borderRadius={0}>
                    <MdPerson size={16} style={{ marginRight: '8px' }} />
                    Profile Settings
                  </Button>
                  <Button variant="ghost" justifyContent="flex-start" size="sm" borderRadius={0}>
                    <MdLock size={16} style={{ marginRight: '8px' }} />
                    Change Password
                  </Button>
                  <Box borderTop="1px solid #f0f0f0">
                    <Button
                      variant="ghost"
                      justifyContent="flex-start"
                      size="sm"
                      borderRadius={0}
                      color="crimson"
                      _hover={{ bg: 'rgba(220,53,69,0.05)' }}
                      w="100%"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt size={16} style={{ marginRight: '8px' }} />
                      Logout
                    </Button>
                  </Box>
                </VStack>
              </Box>
            )}
          </Box>
        </HStack>
      </HStack>
    </Box>
  );
}

export { ADMIN_HEADER_HEIGHT };
