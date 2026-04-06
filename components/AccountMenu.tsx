'use client';

import React, { useState } from 'react';
import { useAuth } from '../lib/authContext';
import { useCurrentUser, useIsAdmin } from '../lib/authHooks';
import { MdPerson, MdExpandLess, MdExpandMore } from 'react-icons/md';

export default function AccountMenu() {
  const currentUser = useCurrentUser();
  const isAdmin = useIsAdmin();
  const { logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  if (!currentUser) {
    return null;
  }

  const handleLogout = () => {
    console.log('Logout clicked');
    console.log('Current user before logout:', currentUser);
    logout();
    console.log('Logout called, refreshing page...');
    // Force page reload to ensure UI updates
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        style={{
          padding: '8px 12px',
          borderRadius: '6px',
          background: 'rgba(217, 100, 46, 0.08)',
          border: '1px solid rgba(217, 100, 46, 0.2)',
          color: '#D9642E',
          fontWeight: '600',
          fontSize: '13px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <MdPerson size={18} />
        <span>{currentUser.name}</span>
        {isAdmin && <span style={{ background: '#D9642E', color: 'white', padding: '2px 6px', borderRadius: '3px', fontSize: '11px', fontWeight: '700' }}>ADMIN</span>}
        {showMenu ? <MdExpandLess size={18} /> : <MdExpandMore size={18} />}
      </button>

      {showMenu && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            minWidth: '200px',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            zIndex: 1000,
          }}
        >
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #e6e6e6' }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Logged in as:</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c' }}>{currentUser.email}</div>
            <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>Role: {currentUser.role.toUpperCase()}</div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'none',
              border: 'none',
              color: '#D9642E',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background 0.12s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(217, 100, 46, 0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
          >
            Logout ✓
          </button>
        </div>
      )}

      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
        />
      )}
    </div>
  );
}
