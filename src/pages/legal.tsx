import React from 'react';
import Head from 'next/head';
import { Box, Container, Heading, Text, VStack, Link } from '@chakra-ui/react';

export default function Legal(): JSX.Element {
  const effectiveDate = 'March 30, 2026';

  return (
    <Box as="main">
      <Head>
        <title>Legal — Terms & Conditions — Master Chef</title>
      </Head>

      <Container maxW="container.md" py={12} color="gray.100">
        <Box bg="rgba(0,0,0,0.36)" p={6} borderRadius="md" boxShadow="md">
          <Heading as="h1" size="xl" mb={2} color="white">
            Terms & Conditions
          </Heading>
          <Text color="gray.300" mb={6}>
            Effective date: {effectiveDate}
          </Text>

          <VStack align="stretch" style={{ gap: '24px' }}>
            <Box>
              <Heading as="h2" size="md" mb={2} color="white">
                1. Acceptance of Terms
              </Heading>
              <Text color="gray.300">
                By accessing or using the Master Chef website (the "Service"), you agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree to these terms, please do not use the Service.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2} color="white">
                2. Your Account
              </Heading>
              <Text color="gray.300">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2} color="white">
                3. License
              </Heading>
              <Text color="gray.300">Master Chef grants you a limited, non-exclusive, non-transferable license to access and use the Service for personal, non-commercial purposes.</Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2} color="white">
                4. Acceptable Use
              </Heading>
              <Text color="gray.300">You agree not to use the Service to post illegal, offensive, or infringing content. We may remove content and suspend accounts that violate these terms.</Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2} color="white">
                5. User Content
              </Heading>
              <Text color="gray.300">You retain ownership of content you submit, but you grant Master Chef a worldwide license to use, modify, and display it in connection with the Service.</Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2} color="white">
                6. Intellectual Property
              </Heading>
              <Text color="gray.300">All materials on the Service, including logos, text, and images, are owned by Master Chef or its licensors and are protected by intellectual property laws.</Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2} color="white">
                7. Disclaimers
              </Heading>
              <Text color="gray.300">THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. TO THE FULLEST EXTENT PERMITTED BY LAW, MASTER CHEF DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED.</Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2} color="white">
                8. Limitation of Liability
              </Heading>
              <Text color="gray.300">IN NO EVENT WILL MASTER CHEF BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICE.</Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2} color="white">
                9. Indemnification
              </Heading>
              <Text color="gray.300">You agree to indemnify and hold Master Chef harmless from claims arising from your use of the Service or violation of these Terms.</Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2} color="white">
                10. Governing Law
              </Heading>
              <Text color="gray.300">These Terms are governed by the laws of your jurisdiction without regard to conflict of laws principles.</Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2} color="white">
                11. Changes to Terms
              </Heading>
              <Text color="gray.300">We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the updated Terms.</Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2} color="white">
                12. Contact
              </Heading>
              <Text color="gray.300">If you have questions about these Terms, contact us at <Link color="orange.300" href="mailto:support@masterchef.example">support@masterchef.example</Link>.</Text>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
