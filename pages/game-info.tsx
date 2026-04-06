import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const FALLBACK_AVATAR = 'https://res.cloudinary.com/djnzwvb2t/image/upload/v1774440372/Character_rtlfvv.png';

export default function GameInfo() {
  const features = [
    { title: 'Cook Battles', desc: 'Compete in timed cook-offs with players worldwide.' },
    { title: 'Collect Ingredients', desc: 'Explore the map to gather rare spices and artifacts.' },
    { title: 'Upgrade Kitchen', desc: 'Unlock equipment, recipes, and permanent bonuses.' },
  ];

  const stats = [
    { label: 'Players', value: '1,243,912' },
    { label: 'Events', value: '124' },
    { label: 'Trophies', value: '3,482' },
  ];

  return (
    <>
      <Head>
        <title>Game Info — Master Chef</title>
      </Head>

      <section style={{ padding: '36px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24 }}>
          <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: 12, padding: 22, boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <img src={FALLBACK_AVATAR} alt="character" style={{ width: 120, height: 120, borderRadius: 12, objectFit: 'cover' }} />
              <div>
                <h1 style={{ margin: 0, color: 'var(--mc-primary)', fontSize: 28 }}>Master Chef</h1>
                <p style={{ marginTop: 8, color: '#444' }}>A playful cooking game where you craft recipes, compete, and climb the leaderboards.</p>
                <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
                  <button onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('mc:open-register'))} style={{ background: 'linear-gradient(180deg,#ff8a3d,#D9642E)', color: '#fff', padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>Register</button>
                  <Link href="/leaderboards" style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid #ECECEC', background: '#fff', display: 'inline-block' }}>View Leaderboards</Link>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 20 }}>
              {features.map((f) => (
                <div key={f.title} style={{ padding: 16, background: 'var(--mc-surface)', borderRadius: 10 }}>
                  <h3 style={{ margin: 0, color: 'var(--mc-primary)', fontSize: 16 }}>{f.title}</h3>
                  <p style={{ marginTop: 8, color: '#555' }}>{f.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
              {stats.map((s) => (
                <div key={s.label} style={{ flex: 1, padding: 16, background: 'rgba(255,255,255,0.98)', borderRadius: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 18, color: 'var(--mc-primary)', fontWeight: 700 }}>{s.value}</div>
                  <div style={{ marginTop: 6, color: '#666' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
