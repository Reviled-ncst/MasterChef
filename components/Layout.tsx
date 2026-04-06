import React, { ReactNode, useEffect } from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  Container,
  Text,
  Image,
  IconButton,
  VStack,
  Separator,
  Icon,
  CloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { MdMenu, MdShield, MdDashboard, MdShoppingCart, MdBackpack, MdEmojiEvents } from 'react-icons/md';
import styles from './Layout.module.css';
import { setToasterInstance } from '../lib/toast';
import { useCurrentUser, useIsAdmin } from '../lib/authHooks';
import { useAuth } from '../lib/authContext';
import AccountMenu from './AccountMenu';
import dynamic from 'next/dynamic';

const LoginModal = dynamic(() => import('./AuthModal').then((mod) => mod.LoginModal), { ssr: false });
const RegisterModal = dynamic(() => import('./AuthModal').then((mod) => mod.RegisterModal), { ssr: false });

type Props = {
  children?: ReactNode;
  title?: string;
  fullWidth?: boolean;
};

const LOGO = 'https://res.cloudinary.com/djnzwvb2t/image/upload/v1774440374/Master_chef_logo_uhwzq3.png';

function NavLink({ href, children, onClick }: { href: string; children: ReactNode; onClick?: () => void }) {
  return (
    <ChakraLink
      as={NextLink}
      href={href}
      px={3}
      py={2}
      borderRadius="md"
      color="orange.600"
      fontWeight="600"
      fontSize={{ base: 'sm', md: 'md' }}
      _hover={{ textDecoration: 'none', bg: 'rgba(217,108,47,0.06)' }}
      onClick={onClick}
    >
      {children}
    </ChakraLink>
  );
}

export default function Layout({ children, title = 'Master Chef', fullWidth = false }: Props) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith('/admin-');
  const currentUser = useCurrentUser();
  const isAdmin = useIsAdmin();
  const { logout } = useAuth();
  const { open: isDrawerOpen, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure();
  const { open: isLoginOpen, onOpen: openLogin, onClose: closeLogin } = useDisclosure();
  const { open: isRegisterOpen, onOpen: openRegister, onClose: closeRegister } = useDisclosure();
  useEffect(() => {
    // Fallback toast system for when Chakra toast isn't available (e.g., early SSR renders)
    if (typeof document === 'undefined') return;

    const containerId = 'mc-toast-container';
    let container = document.getElementById(containerId) as HTMLDivElement | null;

    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.style.cssText = 'position:fixed;top:1rem;right:1rem;z-index:9999;display:flex;flex-direction:column;gap:8px;';
      document.body.appendChild(container);
    }

    const toastImpl = {
      create: (opts: any) => {
        const text = opts?.title || opts?.message || opts?.description || 'Notification';
        const el = document.createElement('div');
        el.textContent = text;
        el.style.cssText = 'background:rgba(255,255,255,0.96);color:#1a202c;padding:8px 12px;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,0.08);max-width:320px;font-size:14px;opacity:1;';
        container!.appendChild(el);

        setTimeout(() => {
          el.style.transition = 'opacity 240ms ease';
          el.style.opacity = '0';
          setTimeout(() => el.parentNode?.removeChild(el), 260);
        }, opts?.duration || 4000);
      },
      success: (opts: any) => toastImpl.create(opts),
      error: (opts: any) => toastImpl.create(opts),
      info: (opts: any) => toastImpl.create(opts),
      warning: (opts: any) => toastImpl.create(opts),
    };

    setToasterInstance(toastImpl);

    return () => {
      if (container?.parentNode) container.parentNode.removeChild(container);
      setToasterInstance(null);
    };
  }, []);

  useEffect(() => {
    // Allow other parts of the app to request modals open via custom events
    const onOpenLogin = () => openLogin();
    const onOpenRegister = () => openRegister();
    if (typeof window !== 'undefined') {
      window.addEventListener('mc:open-login', onOpenLogin as EventListener);
      window.addEventListener('mc:open-register', onOpenRegister as EventListener);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mc:open-login', onOpenLogin as EventListener);
        window.removeEventListener('mc:open-register', onOpenRegister as EventListener);
      }
    };
  }, [openLogin, openRegister]);

  return (
    <Box>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Box
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={40}
        style={{ backdropFilter: 'saturate(130%) blur(6px)' }}
        bg="rgba(10,10,10,0.66)"
        borderBottom="1px solid rgba(255,255,255,0.04)"
        suppressHydrationWarning
        display={isAdminPage ? 'none' : 'block'}
      >
        <Container maxW="container.lg">
          <Flex py={3} align="center" width="100%">
            <Box display="flex" alignItems="center">
              <ChakraLink as={NextLink} href="/" display="flex" alignItems="center">
                <div style={{ position: 'relative', width: '64px', height: '64px', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                  <NextImage src={LOGO} alt="Master Chef" fill sizes="64px" style={{ objectFit: 'contain' }} />
                </div>
                <Text display={{ base: 'none', md: 'block' }} fontWeight="700" color="#D9642E" fontSize={{ base: 'md', md: 'lg' }} ml={3}>
                  Master Chef
                </Text>
              </ChakraLink>
            </Box>

            <Box flex={1} textAlign="center" display={{ base: 'none', md: 'block' }}>
              <HStack justify="center" style={{ gap: '24px' }}>
                <NavLink href="/">Home</NavLink>
                {!currentUser && (
                  <>
                    <NavLink href="/game-info">Game Info</NavLink>
                    <NavLink href="/leaderboards">Leaderboards</NavLink>
                    <NavLink href="/news">News</NavLink>
                    <NavLink href="/community">Community</NavLink>
                    <NavLink href="/download">Download</NavLink>
                  </>
                )}
                {currentUser && isAdmin && (
                  <>
                    <ChakraLink as={NextLink} href="/admin-dashboard" px={3} py={2} borderRadius="md" color="orange.600" fontWeight="600" _hover={{ textDecoration: 'none', bg: 'rgba(217,100,46,0.1)' }} display="flex" alignItems="center" gap="8px">
                      <MdShield size={18} />
                      <Text>Admin Panel</Text>
                    </ChakraLink>
                    <NavLink href="/community">Community</NavLink>
                  </>
                )}
                {currentUser && !isAdmin && (
                  <>
                    <ChakraLink as={NextLink} href="/gamer-dashboard" px={3} py={2} borderRadius="md" color="orange.600" fontWeight="600" _hover={{ textDecoration: 'none', bg: 'rgba(217,100,46,0.1)' }} display="flex" alignItems="center" gap="8px">
                      <MdDashboard size={18} />
                      <Text>Dashboard</Text>
                    </ChakraLink>
                    <ChakraLink as={NextLink} href="/player-inventory" px={3} py={2} borderRadius="md" color="orange.600" fontWeight="600" _hover={{ textDecoration: 'none', bg: 'rgba(217,100,46,0.1)' }} display="flex" alignItems="center" gap="8px">
                      <MdBackpack size={18} />
                      <Text>Inventory</Text>
                    </ChakraLink>
                    <ChakraLink as={NextLink} href="/player-tournaments" px={3} py={2} borderRadius="md" color="orange.600" fontWeight="600" _hover={{ textDecoration: 'none', bg: 'rgba(217,100,46,0.1)' }} display="flex" alignItems="center" gap="8px">
                      <MdEmojiEvents size={18} />
                      <Text>Tournaments</Text>
                    </ChakraLink>
                    <ChakraLink as={NextLink} href="/player-shop" px={3} py={2} borderRadius="md" color="orange.600" fontWeight="600" _hover={{ textDecoration: 'none', bg: 'rgba(217,100,46,0.1)' }} display="flex" alignItems="center" gap="8px">
                      <MdShoppingCart size={18} />
                      <Text>Shop</Text>
                    </ChakraLink>
                    <NavLink href="/leaderboards">Leaderboards</NavLink>
                    <NavLink href="/community">Community</NavLink>
                  </>
                )}
              </HStack>
            </Box>

                      <Box display="flex" alignItems="center" gap={3} ml={{ md: 4 }} pl={{ md: 4 }} borderLeft={{ md: '1px solid rgba(200,150,100,0.06)' }}>
                        <HStack display={{ base: 'none', md: 'flex' }} style={{ gap: '16px' }}>
                          {currentUser ? (
                            <AccountMenu />
                          ) : (
                            <>
                              <ChakraLink as="button" px={3} py={2} borderRadius="md" color="orange.600" fontWeight="600" onClick={openLogin}>
                                Login
                              </ChakraLink>
                              <ChakraLink as="button" px={3} py={2} borderRadius="md" color="orange.600" fontWeight="600" onClick={openRegister}>
                                Register
                              </ChakraLink>
                            </>
                          )}
                        </HStack>

                        <Box as="button" aria-label="Open menu" onClick={openDrawer} display={{ base: 'inline-flex', md: 'none' }} bg="transparent" border="none" p={0}>
                          <MdMenu size={24} color="white" />
                        </Box>
                      </Box>
          </Flex>
        </Container>

        {isDrawerOpen && (
          <>
            <div className={styles.drawerOverlay} onClick={closeDrawer} />
            <Box className={styles.drawer} p={{ base: 3, sm: 4 }} maxW="100%">
              <Box position="absolute" top={3} right={3} zIndex={10}>
                <CloseButton onClick={closeDrawer} size="sm" />
              </Box>
              <VStack align="stretch" mt={10} style={{ gap: '12px' }}>
                <NavLink href="/" onClick={closeDrawer}>Home</NavLink>
                <Separator />
                {!currentUser && (
                  <>
                    <NavLink href="/game-info" onClick={closeDrawer}>Game Info</NavLink>
                    <NavLink href="/leaderboards" onClick={closeDrawer}>Leaderboards</NavLink>
                    <NavLink href="/news" onClick={closeDrawer}>News</NavLink>
                    <NavLink href="/community" onClick={closeDrawer}>Community</NavLink>
                    <NavLink href="/download" onClick={closeDrawer}>Download</NavLink>
                  </>
                )}
                {currentUser && isAdmin && (
                  <>
                    <ChakraLink as={NextLink} href="/admin-dashboard" onClick={closeDrawer} px={3} py={2} borderRadius="md" color="orange.600" fontWeight="600" _hover={{ textDecoration: 'none', bg: 'rgba(217,100,46,0.1)' }} display="flex" alignItems="center" gap="8px">
                      <MdShield size={18} />
                      <Text>Admin Panel</Text>
                    </ChakraLink>
                    <NavLink href="/community" onClick={closeDrawer}>Community</NavLink>
                  </>
                )}
                {currentUser && !isAdmin && (
                  <>
                    <ChakraLink as={NextLink} href="/gamer-dashboard" onClick={closeDrawer} px={3} py={2} borderRadius="md" color="orange.600" fontWeight="600" _hover={{ textDecoration: 'none', bg: 'rgba(217,100,46,0.1)' }} display="flex" alignItems="center" gap="8px">
                      <MdDashboard size={18} />
                      <Text>Dashboard</Text>
                    </ChakraLink>
                    <ChakraLink as={NextLink} href="/player-inventory" onClick={closeDrawer} px={3} py={2} borderRadius="md" color="orange.600" fontWeight="600" _hover={{ textDecoration: 'none', bg: 'rgba(217,100,46,0.1)' }} display="flex" alignItems="center" gap="8px">
                      <MdBackpack size={18} />
                      <Text>Inventory</Text>
                    </ChakraLink>
                    <ChakraLink as={NextLink} href="/player-tournaments" onClick={closeDrawer} px={3} py={2} borderRadius="md" color="orange.600" fontWeight="600" _hover={{ textDecoration: 'none', bg: 'rgba(217,100,46,0.1)' }} display="flex" alignItems="center" gap="8px">
                      <MdEmojiEvents size={18} />
                      <Text>Tournaments</Text>
                    </ChakraLink>
                    <ChakraLink as={NextLink} href="/player-shop" onClick={closeDrawer} px={3} py={2} borderRadius="md" color="orange.600" fontWeight="600" _hover={{ textDecoration: 'none', bg: 'rgba(217,100,46,0.1)' }} display="flex" alignItems="center" gap="8px">
                      <MdShoppingCart size={18} />
                      <Text>Shop</Text>
                    </ChakraLink>
                    <NavLink href="/leaderboards" onClick={closeDrawer}>Leaderboards</NavLink>
                    <NavLink href="/community" onClick={closeDrawer}>Community</NavLink>
                  </>
                )}
                <Separator />
                {currentUser ? (
                  <>
                    <div style={{ padding: '8px 0', color: '#D9642E', fontWeight: '600', fontSize: '14px' }}>Logged in as: {currentUser.email}</div>
                    <ChakraLink as="button" px={3} py={2} borderRadius="md" color="crimson" fontWeight="600" onClick={() => {
                      logout();
                      closeDrawer();
                    }}>
                      Logout
                    </ChakraLink>
                  </>
                ) : (
                  <>
                    <ChakraLink as="button" px={3} py={2} borderRadius="md" color="orange.600" fontWeight="600" onClick={() => { closeDrawer(); openLogin(); }}>
                      Login
                    </ChakraLink>
                    <ChakraLink as="button" px={3} py={2} borderRadius="md" color="orange.600" fontWeight="600" onClick={() => { closeDrawer(); openRegister(); }}>
                      Register
                    </ChakraLink>
                  </>
                )}
              </VStack>
            </Box>
          </>
        )}
      </Box>

      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} onSwitch={() => { closeLogin(); openRegister(); }} />
      <RegisterModal isOpen={isRegisterOpen} onClose={closeRegister} onSwitch={() => { closeRegister(); openLogin(); }} />

      {/* Chakra's `useToast` provides the UI; no external Toaster component needed. */}

      <Box as="main" className={styles.pageBackground} pt={isAdminPage ? 0 : { base: 20, md: 24 }} pb={isAdminPage ? 0 : { base: 28, md: 32 }}>
        {fullWidth ? children : <Container maxW="container.lg">{children}</Container>}
      </Box>

      {!isAdminPage && (
        <>
          <Separator />
          <Box
            as="footer"
            py={8}
            bg="rgba(20,20,20,0.92)"
            color="white"
            borderTop="1px solid rgba(217,108,47,0.08)"
            position="relative"
            zIndex={10}
            style={{ backdropFilter: 'saturate(120%) blur(6px)' }}
            boxShadow="0 -6px 24px rgba(0,0,0,0.3)"
          >
            <Container maxW="container.lg">
              <Flex align="center" justify="space-between" py={4}>
                <HStack align="center" style={{ gap: '12px' }}>
                  <div style={{ position: 'relative', width: '48px', height: '48px', flexShrink: 0 }}>
                    <NextImage src={LOGO} alt="Master Chef" fill sizes="48px" style={{ objectFit: 'contain' }} />
                  </div>
                  <Text fontWeight="600" fontSize={{ base: 'sm', md: 'md' }}>
                    © {new Date().getFullYear()} Master Chef
                  </Text>
                </HStack>

                <HStack display={{ base: 'none', md: 'flex' }} style={{ gap: '16px' }}>
                  <ChakraLink as={NextLink} href="/" color="gray.200" fontSize={{ base: 'sm', md: 'md' }}>Home</ChakraLink>
                  <ChakraLink as={NextLink} href="/download" color="gray.200" fontSize={{ base: 'sm', md: 'md' }}>Download</ChakraLink>
                  <ChakraLink as={NextLink} href="/community" color="gray.200" fontSize={{ base: 'sm', md: 'md' }}>Community</ChakraLink>
                  <ChakraLink as={NextLink} href="/legal" color="gray.200" fontSize={{ base: 'sm', md: 'md' }}>Legal</ChakraLink>
                </HStack>
              </Flex>
            </Container>
          </Box>
        </>
      )}
    </Box>
  );
}
