import { Box, VStack, Button, Text, Badge } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdShield, MdDashboard, MdHistory, MdLock, MdStorage, MdSettings, MdFileDownload, MdPeople } from 'react-icons/md';

const ADMIN_SIDEBAR_WIDTH = '280px';

const MENU_ITEMS = [
  { label: 'Dashboard', href: '/admin-dashboard' },
  { label: 'Users', href: '/admin-users' },
  { label: 'Activity', href: '/admin-activity' },
  { label: 'Audit Logs', href: '/admin-logs' },
  { label: 'Security', href: '/admin-security' },
  { label: 'Settings', href: '/admin-settings' },
  { label: 'Backups', href: '/admin-backup' },
  { label: 'Reports', href: '/admin-reports' },
  { label: 'Configuration', href: '/admin-config' },
];

const getMenuIcon = (label: string) => {
  const iconProps = { size: 20, color: 'currentColor' };
  switch (label) {
    case 'Dashboard':
      return <MdDashboard {...iconProps} />;
    case 'Users':
      return <MdPeople {...iconProps} />;
    case 'Activity':
      return <MdHistory {...iconProps} />;
    case 'Audit Logs':
      return <MdHistory {...iconProps} />;
    case 'Security':
      return <MdLock {...iconProps} />;
    case 'Backups':
      return <MdStorage {...iconProps} />;
    case 'Reports':
      return <MdFileDownload {...iconProps} />;
    case 'Settings':
      return <MdSettings {...iconProps} />;
    case 'Configuration':
      return <MdSettings {...iconProps} />;
    default:
      return null;
  }
};

export default function AdminSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    onClose(); // Close sidebar on mobile after navigation
    router.push(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <Box
          position="fixed"
          inset={0}
          bg="rgba(0,0,0,0.5)"
          zIndex={30}
          display={{ base: 'block', md: 'none' }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <Box
        position="fixed"
        left={0}
        top={0}
        height="100vh"
        width={ADMIN_SIDEBAR_WIDTH}
        bg="linear-gradient(180deg, #1a1a1a 0%, #242424 100%)"
        color="white"
        borderRight="1px solid rgba(217,108,47,0.2)"
        zIndex={35}
        transform={{ base: isOpen ? 'translateX(0)' : 'translateX(-100%)', md: 'translateX(0)' }}
        transition="transform 0.3s ease"
        overflowY="auto"
        display="flex"
        flexDirection="column"
      >
        {/* Logo Area */}
        <Box p={6} borderBottom="1px solid rgba(217,108,47,0.15)">
          <VStack align="start" style={{ gap: '8px' }}>
            <MdShield size={24} color="#FF8A3D" />
            <Text fontSize="lg" fontWeight="700" color="#FF8A3D">
              Admin Panel
            </Text>
            <Text fontSize="xs" color="gray.400">
              Master Chef
            </Text>
          </VStack>
        </Box>

        {/* Navigation Menu */}
        <VStack
          align="stretch"
          style={{ gap: '4px' }}
          p={4}
          flex={1}
          overflowY="auto"
        >
          <Text fontSize="xs" fontWeight="700" textTransform="uppercase" color="gray.500" px={3} py={2} mt={2}>
            Main
          </Text>

          {MENU_ITEMS.map((item) => {
            const isActive = router.pathname === item.href;

            return (
              <Button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                variant="ghost"
                justifyContent="flex-start"
                w="100%"
                borderRadius="lg"
                px={4}
                py={3}
                bg={isActive ? 'rgba(217,108,47,0.15)' : 'transparent'}
                borderLeft={isActive ? '3px solid #FF8A3D' : '3px solid transparent'}
                color={isActive ? '#FF8A3D' : 'gray.300'}
                _hover={{
                  bg: 'rgba(217,108,47,0.1)',
                  color: '#FF8A3D',
                }}
                transition="all 0.2s"
                fontSize="sm"
                fontWeight={isActive ? '600' : '500'}
                cursor="pointer"
              >
                <Box mr={3}>{getMenuIcon(item.label)}</Box>
                {item.label}
              </Button>
            );
          })}
        </VStack>

        {/* Footer - Admin Profile */}
        <Box p={4} borderTop="1px solid rgba(217,108,47,0.15)">
          <Box bg="rgba(217,108,47,0.15)" p={3} borderRadius="lg" borderLeft="3px solid #FF8A3D">
            <Text fontSize="xs" fontWeight="700" textTransform="uppercase" color="gray.400" mb={2}>
              Logged In As
            </Text>
            <VStack align="start" style={{ gap: '4px' }}>
              <Text fontSize="sm" fontWeight="600" color="white">
                Admin Chef
              </Text>
              <Badge bg="#10b981" color="white" fontSize="xs">
                Administrator
              </Badge>
            </VStack>
          </Box>
        </Box>
      </Box>

      {/* Spacer for fixed sidebar */}
      <Box width={ADMIN_SIDEBAR_WIDTH} display={{ base: 'none', md: 'block' }} />
    </>
  );
}

export { ADMIN_SIDEBAR_WIDTH };
