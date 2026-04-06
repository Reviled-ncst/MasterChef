import { Box, Heading, Text, Button, VStack, HStack, Input, Switch, Grid } from '@chakra-ui/react';
import { MdSettings, MdSave } from 'react-icons/md';
import AdminLayout from '../../components/AdminLayout';
import { useState } from 'react';

function AdminSettingsContent() {
  const [settings, setSettings] = useState({
    siteName: 'Master Chef',
    maintenanceMode: false,
    enableRegistration: true,
    maxLoginAttempts: 5,
    sessionTimeout: 30,
    emailNotifications: true,
    apiRateLimit: 1000,
    backupFrequency: 'daily',
    enableTwoFactor: false,
  });

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <VStack align="stretch" style={{ gap: '24px' }} maxW="900px">
      {/* Header */}
      <Box>
        <Heading as="h1" size="2xl" fontWeight="800" color="#1a1a1a" display="flex" alignItems="center" gap={3} mb={2}>
          <MdSettings size={32} />
          System Settings
        </Heading>
        <Text fontSize="sm" color="gray.600">
          Configure system-wide settings and preferences
        </Text>
      </Box>

      {/* General Settings */}
      <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
        <Heading as="h3" size="md" fontWeight="700" color="#1a1a1a" mb={6}>
          General Settings
        </Heading>

        <VStack align="stretch" style={{ gap: '20px' }}>
          <Box>
            <Text fontWeight="600" fontSize="sm" color="#1a1a1a" mb={2}>Site Name</Text>
            <Input
              value={settings.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
              placeholder="Master Chef"
              borderColor="rgba(0,0,0,0.1)"
            />
          </Box>

          <Box>
            <HStack justify="space-between">
              <Box>
                <Text fontWeight="600" fontSize="sm" color="#1a1a1a">Maintenance Mode</Text>
                <Text fontSize="xs" color="gray.600">Disable access for all users except admins</Text>
              </Box>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                style={{ cursor: 'pointer', width: '20px', height: '20px' }}
              />
            </HStack>
          </Box>

          <Box>
            <HStack justify="space-between">
              <Box>
                <Text fontWeight="600" fontSize="sm" color="#1a1a1a">Enable Registration</Text>
                <Text fontSize="xs" color="gray.600">Allow new users to create accounts</Text>
              </Box>
              <input
                type="checkbox"
                checked={settings.enableRegistration}
                onChange={(e) => handleChange('enableRegistration', e.target.checked)}
                style={{ cursor: 'pointer', width: '20px', height: '20px' }}
              />
            </HStack>
          </Box>
        </VStack>
      </Box>

      {/* Security Settings */}
      <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
        <Heading as="h3" size="md" fontWeight="700" color="#1a1a1a" mb={6}>
          Security Settings
        </Heading>

        <VStack align="stretch" style={{ gap: '20px' }}>
          <Box>
            <Text fontWeight="600" fontSize="sm" color="#1a1a1a" mb={2}>Max Login Attempts</Text>
            <Input
              type="number"
              value={settings.maxLoginAttempts}
              onChange={(e) => handleChange('maxLoginAttempts', parseInt(e.target.value))}
              borderColor="rgba(0,0,0,0.1)"
            />
            <Text fontSize="xs" color="gray.600" mt={2}>Lock account after this many failed attempts</Text>
          </Box>

          <Box>
            <Text fontWeight="600" fontSize="sm" color="#1a1a1a" mb={2}>Session Timeout (minutes)</Text>
            <Input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
              borderColor="rgba(0,0,0,0.1)"
            />
            <Text fontSize="xs" color="gray.600" mt={2}>Auto-logout duration for inactive users</Text>
          </Box>

          <Box>
            <HStack justify="space-between">
              <Box>
                <Text fontWeight="600" fontSize="sm" color="#1a1a1a">Two-Factor Authentication</Text>
                <Text fontSize="xs" color="gray.600">Require 2FA for all admin accounts</Text>
              </Box>
              <input
                type="checkbox"
                checked={settings.enableTwoFactor}
                onChange={(e) => handleChange('enableTwoFactor', e.target.checked)}
                style={{ cursor: 'pointer', width: '20px', height: '20px' }}
              />
            </HStack>
          </Box>
        </VStack>
      </Box>

      {/* API & Performance Settings */}
      <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
        <Heading as="h3" size="md" fontWeight="700" color="#1a1a1a" mb={6}>
          API & Performance
        </Heading>

        <VStack align="stretch" style={{ gap: '20px' }}>
          <Box>
            <Text fontWeight="600" fontSize="sm" color="#1a1a1a" mb={2}>API Rate Limit (requests/hour)</Text>
            <Input
              type="number"
              value={settings.apiRateLimit}
              onChange={(e) => handleChange('apiRateLimit', parseInt(e.target.value))}
              borderColor="rgba(0,0,0,0.1)"
            />
          </Box>

          <Box>
            <HStack justify="space-between">
              <Box>
                <Text fontWeight="600" fontSize="sm" color="#1a1a1a">Email Notifications</Text>
                <Text fontSize="xs" color="gray.600">Send alerts for system events</Text>
              </Box>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                style={{ cursor: 'pointer', width: '20px', height: '20px' }}
              />
            </HStack>
          </Box>
        </VStack>
      </Box>

      {/* Backup & Maintenance */}
      <Box bg="white" p={6} borderRadius="lg" border="1px solid rgba(0,0,0,0.08)">
        <Heading as="h3" size="md" fontWeight="700" color="#1a1a1a" mb={6}>
          Backup & Maintenance
        </Heading>

        <VStack align="stretch" style={{ gap: '20px' }}>
          <Box>
            <Text fontWeight="600" fontSize="sm" color="#1a1a1a" mb={2}>Backup Frequency</Text>
            <select
              value={settings.backupFrequency}
              onChange={(e) => handleChange('backupFrequency', e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(0,0,0,0.1)',
                fontSize: '14px',
                fontFamily: 'inherit',
                backgroundColor: 'white',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </Box>

          <HStack style={{ gap: '12px' }}>
            <Button variant="outline" borderColor="rgba(0,0,0,0.2)" color="#1a1a1a">
              Run Backup Now
            </Button>
            <Button variant="outline" borderColor="rgba(0,0,0,0.2)" color="#1a1a1a">
              View Backups
            </Button>
          </HStack>
        </VStack>
      </Box>

      <Box height="1px" bg="rgba(0,0,0,0.08)" my={6} />

      {/* Save Button */}
      <HStack justify="flex-end">
        <Button variant="ghost" color="gray.600">
          Cancel
        </Button>
        <Button bg="#D9642E" color="white" _hover={{ bg: '#c55527' }} display="flex" alignItems="center" gap={2} onClick={handleSave}>
          <MdSave size={18} />
          Save Settings
        </Button>
      </HStack>
    </VStack>
  );
}

export default function AdminSettings() {
  return (
    <AdminLayout>
      <AdminSettingsContent />
    </AdminLayout>
  );
}
