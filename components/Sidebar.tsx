'use client';

import { Box, VStack, HStack, Text, Icon } from '@chakra-ui/react';
import { useRouter, usePathname } from 'next/navigation';
import { MdDashboard, MdPeople, MdHistory, MdSettings, MdLock, MdBackup, MdFileDownload, MdLogout, MdSportsEsports, MdNewspaper, MdBarChart, MdBlock, MdNotifications, MdRestaurant, MdEmojiEvents, MdExpandMore, MdChevronRight } from 'react-icons/md';
import { useAuth } from '../lib/authContext';
import { useState, useEffect } from 'react';

const sidebarStyles = `
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes navItemHover {
    from { transform: translateX(0); }
    to { transform: translateX(8px); }
  }

  .sidebar-wrapper {
    animation: slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .nav-section-header {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgba(217, 100, 46, 0.6);
    padding: 12px 16px 8px 16px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .nav-item {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    border-left: 3px solid transparent;
    position: relative;
  }

  .nav-item:hover {
    border-left-color: #D9642E;
    background: rgba(217, 100, 46, 0.08);
    animation: navItemHover 0.3s ease forwards;
  }

  .nav-item.active {
    border-left-color: #D9642E;
    background: rgba(217, 100, 46, 0.12);
    color: #D9642E;
  }

  .nav-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, #D9642E 0%, rgba(217, 100, 46, 0.3) 100%);
  }

  .nav-icon {
    transition: all 0.3s ease;
  }

  .nav-item:hover .nav-icon {
    filter: drop-shadow(0 0 8px rgba(217, 100, 46, 0.5));
    transform: scale(1.1);
  }

  .sidebar-footer {
    border-top: 1px solid rgba(217, 100, 46, 0.2);
    margin-top: auto;
    padding-top: 16px;
  }
`;

interface NavLink {
  label: string;
  path: string;
  icon: any;
}

interface NavSection {
  label: string;
  icon?: any;
  items: NavLink[];
}

const adminNavSections: NavSection[] = [
  {
    label: 'Main',
    icon: MdDashboard,
    items: [
      { label: 'Dashboard', path: '/admin-dashboard', icon: MdDashboard },
    ]
  },
  {
    label: 'User Management',
    icon: MdPeople,
    items: [
      { label: 'Users', path: '/admin-users', icon: MdPeople },
      { label: 'Moderation', path: '/admin-moderation', icon: MdBlock },
    ]
  },
  {
    label: 'Game Management',
    icon: MdSportsEsports,
    items: [
      { label: 'Game Modes', path: '/admin-game', icon: MdSportsEsports },
      { label: 'Recipes', path: '/admin-recipes', icon: MdRestaurant },
      { label: 'Tournaments', path: '/admin-tournaments', icon: MdEmojiEvents },
    ]
  },
  {
    label: 'Content & Analytics',
    icon: MdNewspaper,
    items: [
      { label: 'Content', path: '/admin-content', icon: MdNewspaper },
      { label: 'Analytics', path: '/admin-analytics', icon: MdBarChart },
      { label: 'Notifications', path: '/admin-notifications', icon: MdNotifications },
    ]
  },
  {
    label: 'System Tools',
    icon: MdSettings,
    items: [
      { label: 'Logs', path: '/admin-logs', icon: MdHistory },
      { label: 'Config', path: '/admin-config', icon: MdSettings },
      { label: 'Security', path: '/admin-security', icon: MdLock },
      { label: 'Backup', path: '/admin-backup', icon: MdBackup },
      { label: 'Reports', path: '/admin-reports', icon: MdFileDownload },
    ]
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  // Find which section contains the current active page
  const getCurrentSections = () => {
    const defaults = ['Main', 'User Management'];
    const currentSection = adminNavSections.find(section =>
      section.items.some(link => pathname.includes(link.path.split('/')[1]))
    );

    if (currentSection && !defaults.includes(currentSection.label)) {
      return [...defaults, currentSection.label];
    }
    return defaults;
  };

  const [expandedSections, setExpandedSections] = useState<string[]>(getCurrentSections());

  // Auto-expand section containing current active page
  useEffect(() => {
    setExpandedSections(getCurrentSections());
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <>
      <style suppressHydrationWarning>{sidebarStyles}</style>
      <Box
        className="sidebar-wrapper"
        position="fixed"
        left={0}
        top={0}
        h="100vh"
        w={{ base: '0', md: '300px' }}
        bg="rgba(0,0,0,0.7)"
        backdropFilter="blur(10px)"
        border="1px solid rgba(217,100,46,0.1)"
        display={{ base: 'none', md: 'flex' }}
        flexDirection="column"
        pt={8}
        pb={6}
        px={0}
        overflowY="auto"
        zIndex={100}
      >
        {/* Logo */}
        <VStack gap={1} px={4} mb={8}>
          <Text fontSize="24px" fontWeight="900" color="white">
            MC
          </Text>
          <Text fontSize="xs" color="gray.400" fontWeight="600">
            Admin Panel
          </Text>
        </VStack>

        {/* Navigation Sections */}
        <VStack align="stretch" gap={0} flex={1} px={0}>
          {adminNavSections.map((section, sectionIdx) => (
            <Box key={sectionIdx}>
              {/* Section Header */}
              <Box
                className="nav-section-header"
                cursor="pointer"
                onClick={() => toggleSection(section.label)}
                _hover={{ color: '#D9642E' }}
              >
                {section.icon && <Icon as={section.icon} fontSize="14px" />}
                {section.label}
                <Icon
                  as={MdChevronRight}
                  fontSize="16px"
                  ml="auto"
                  transition="transform 0.3s ease"
                  transform={expandedSections.includes(section.label) ? 'rotate(90deg)' : 'rotate(0deg)'}
                />
              </Box>

              {/* Section Items */}
              {expandedSections.includes(section.label) && (
                <VStack align="stretch" gap={1} px={3} py={1}>
                  {section.items.map((link, idx) => {
                    const isActive = pathname.includes(link.path.split('/')[1]);
                    return (
                      <Box
                        key={idx}
                        className={`nav-item ${isActive ? 'active' : ''}`}
                        p={3}
                        borderRadius="md"
                        cursor="pointer"
                        onClick={() => router.push(link.path)}
                        display="flex"
                        alignItems="center"
                        gap={3}
                      >
                        <Icon as={link.icon} className="nav-icon" fontSize="18px" color={isActive ? '#D9642E' : 'gray.400'} />
                        <Text fontSize="sm" fontWeight="600" color={isActive ? '#D9642E' : 'gray.300'}>
                          {link.label}
                        </Text>
                      </Box>
                    );
                  })}
                </VStack>
              )}

              {sectionIdx < adminNavSections.length - 1 && (
                <Box h="1px" bg="rgba(217,100,46,0.1)" my={2} />
              )}
            </Box>
          ))}
        </VStack>

        {/* Footer */}
        <VStack className="sidebar-footer" align="stretch" gap={3} px={3}>
          <Box
            className="nav-item"
            p={3}
            borderRadius="md"
            cursor="pointer"
            onClick={handleLogout}
            display="flex"
            alignItems="center"
            gap={3}
          >
            <Icon as={MdLogout} className="nav-icon" fontSize="18px" color="gray.400" />
            <Text fontSize="sm" fontWeight="600" color="gray.300">
              Logout
            </Text>
          </Box>
        </VStack>
      </Box>
    </>
  );
}


