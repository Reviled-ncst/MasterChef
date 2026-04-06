import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import AdminSidebar, { ADMIN_SIDEBAR_WIDTH } from './AdminSidebar';
import AdminHeader, { ADMIN_HEADER_HEIGHT } from './AdminHeader';
import { AdminProvider } from '../lib/adminContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Box minH="100vh" bg="linear-gradient(135deg, #f5f1e8 0%, #faf8f3 100%)">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Header */}
      <AdminHeader />

      {/* Main Content */}
      <Box
        ml={{ base: 0, md: ADMIN_SIDEBAR_WIDTH }}
        mt={ADMIN_HEADER_HEIGHT}
        minH={`calc(100vh - ${ADMIN_HEADER_HEIGHT})`}
        p={{ base: 4, md: 6 }}
        transition="all 0.3s ease"
      >
        {children}
      </Box>

      {/* Mobile Hamburger Button */}
      <Box
        position="fixed"
        bottom={6}
        right={6}
        display={{ base: 'block', md: 'none' }}
        zIndex={25}
      >
        <Box
          bg="#D9642E"
          color="white"
          borderRadius="full"
          w="56px"
          h="56px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          fontSize="20px"
          boxShadow="0 4px 12px rgba(217,108,47,0.3)"
          onClick={toggleSidebar}
          transition="all 0.2s"
          _hover={{
            bg: '#c55527',
            boxShadow: '0 6px 16px rgba(217,108,47,0.4)',
            transform: 'scale(1.05)',
          }}
        >
          {isSidebarOpen ? '✕' : '☰'}
        </Box>
      </Box>
    </Box>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  );
}
