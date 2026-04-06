"use client";
import React, { useEffect, useState } from 'react';
// Player data (kept untyped to avoid parser issues in the dev toolchain)
const mockPlayers = [
  { id: '1', rank: 1, name: 'Ava Stone', score: 15980, points: 15980, achievements: 12, country: 'US' },
  { id: '2', rank: 2, name: 'Liam Park', score: 14820, points: 14820, achievements: 10, country: 'KR' },
  { id: '3', rank: 3, name: 'Noah Smith', score: 14250, points: 14250, achievements: 9, country: 'GB' },
  { id: '4', rank: 4, name: 'Olivia Chen', score: 13640, points: 13640, achievements: 8, country: 'CN' },
  { id: '5', rank: 5, name: 'Mason Lee', score: 12990, points: 12990, achievements: 7, country: 'CA' },
  { id: '6', rank: 6, name: 'Sofia Rossi', score: 12540, points: 12540, achievements: 6, country: 'IT' },
  { id: '7', rank: 7, name: 'Lucas Silva', score: 12010, points: 12010, achievements: 5, country: 'BR' },
  { id: '8', rank: 8, name: 'Emma Müller', score: 11800, points: 11800, achievements: 4, country: 'DE' },
];

const FALLBACK_AVATAR = 'https://res.cloudinary.com/djnzwvb2t/image/upload/v1774440372/Character_rtlfvv.png';

// Homepage assets & palette
const BACKGROUND = 'https://res.cloudinary.com/djnzwvb2t/image/upload/v1774440372/Background_htozsp.png';
const PRIMARY = '#D9642E';
const GRADIENT_START = '#FF8A3D';
const GRADIENT_END = '#D9642E';
const ACCENT = '#D96C2F';
const MUTED_TEXT = '#4a2f1a';
const CARD_BORDER = 'rgba(217,108,47,0.06)';

export default function LeaderboardClient({ initialData }: { initialData?: any } = {}) {
  const [players, setPlayers] = useState(initialData || []);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [sortBy, setSortBy] = useState('rank');
  const [sortDir, setSortDir] = useState('desc');
  const [minPoints, setMinPoints] = useState(undefined);
  const [minAchievements, setMinAchievements] = useState(undefined);

  useEffect(() => {
    if (!initialData) {
      setLoading(true);
      const t = setTimeout(() => {
        setPlayers(mockPlayers);
        setLoading(false);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [initialData]);

  const filtered = players.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.country?.toLowerCase().includes(query.toLowerCase()));

  const items = filtered
    .map((p) => ({ ...p, points: p.points ?? p.score, achievements: p.achievements ?? 0 }))
    .filter((p) => (minPoints == null ? true : p.points >= minPoints))
    .filter((p) => (minAchievements == null ? true : p.achievements >= minAchievements))
    .sort((a, b) => {
      let av = 0;
      let bv = 0;
      if (sortBy === 'rank') {
        av = a.rank;
        bv = b.rank;
      } else if (sortBy === 'points') {
        av = a.points ?? a.score;
        bv = b.points ?? b.score;
      } else {
        av = a.achievements ?? 0;
        bv = b.achievements ?? 0;
      }
      if (av === bv) return 0;
      if (sortDir === 'asc') return av < bv ? -1 : 1;
      return av > bv ? -1 : 1;
    });

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <img src={BACKGROUND} alt="background" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 1 }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(1rem, 5vw, 2rem)', position: 'relative', zIndex: 2 }}>
        <h1 style={{ marginBottom: 16, color: '#FFFFFF !important', fontSize: 'clamp(24px, 8vw, 32px)', fontWeight: 'bold' }}>Leaderboards</h1>

        <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 12px)', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', width: '100%' }}>
          <input placeholder="Search by name or country" value={query} onChange={(e) => setQuery(e.target.value)} style={{ flex: 1, minWidth: 'clamp(160px, 100%, 300px)', padding: '10px 12px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.2)', fontSize: 'clamp(12px, 2vw, 14px)', background: 'rgba(255,255,255,0.95)', color: '#4a2f1a' }} />

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} style={{ padding: '10px 8px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.2)', fontSize: 'clamp(12px, 2vw, 14px)', fontWeight: '600', color: '#4a2f1a', background: 'rgba(255,255,255,0.95)', minWidth: 'auto', flex: '1 0 clamp(120px, 25%, 150px)' }}>
            <option value="rank">Rank</option>
            <option value="points">Points</option>
            <option value="achievements">Achv</option>
          </select>
          <select value={sortDir} onChange={(e) => setSortDir(e.target.value as any)} style={{ padding: '10px 8px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.2)', fontSize: 'clamp(12px, 2vw, 14px)', fontWeight: '600', color: '#4a2f1a', background: 'rgba(255,255,255,0.95)', minWidth: 'auto', flex: '1 0 clamp(80px, 20%, 100px)' }}>
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>

          <input type="number" placeholder="Min pts" value={minPoints ?? ''} onChange={(e) => setMinPoints(e.target.value === '' ? undefined : Number(e.target.value))} style={{ minWidth: 'clamp(100px, 18%, 140px)', padding: '10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.2)', fontSize: 'clamp(12px, 2vw, 14px)', background: 'rgba(255,255,255,0.95)', color: '#4a2f1a' }} />
          <input type="number" placeholder="Min achv" value={minAchievements ?? ''} onChange={(e) => setMinAchievements(e.target.value === '' ? undefined : Number(e.target.value))} style={{ minWidth: 'clamp(100px, 18%, 140px)', padding: '10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.2)', fontSize: 'clamp(12px, 2vw, 14px)', background: 'rgba(255,255,255,0.95)', color: '#4a2f1a' }} />

          <button onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')} style={{ padding: '10px clamp(8px, 2vw, 16px)', borderRadius: 6, border: `1px solid #FFFFFF`, background: 'transparent', color: '#FFFFFF !important', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', fontSize: 'clamp(11px, 2vw, 14px)', whiteSpace: 'nowrap' }}>{viewMode === 'cards' ? 'Table' : 'Cards'}</button>
          <button onClick={() => { setQuery(''); setMinPoints(undefined); setMinAchievements(undefined); setSortBy('rank'); setSortDir('desc'); }} style={{ padding: '10px clamp(8px, 2vw, 16px)', borderRadius: 6, background: PRIMARY, color: 'white', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', border: 'none', fontSize: 'clamp(11px, 2vw, 14px)', whiteSpace: 'nowrap' }}>Reset</button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 32 }}>Loading...</div>
        ) : (
          viewMode === 'cards' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
              {items.map((p) => (
                <div key={p.id} style={{ borderRadius: 8, padding: 16, background: '#fff', border: `1px solid ${CARD_BORDER}`, boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <img src={p.avatar || FALLBACK_AVATAR} alt={p.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <strong style={{ color: MUTED_TEXT }}>{p.name}</strong>
                        <span style={{ background: 'rgba(217,108,47,0.08)', color: PRIMARY, padding: '2px 8px', borderRadius: 6 }}>#{p.rank}</span>
                      </div>
                      <div style={{ fontSize: 13, color: MUTED_TEXT }}>Points: {p.points?.toLocaleString()}</div>
                      <div style={{ fontSize: 13, color: MUTED_TEXT }}>Achievements: {p.achievements}</div>
                      <div style={{ fontSize: 12, color: ACCENT }}>{p.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: 8, padding: 12, border: `1px solid ${CARD_BORDER}`, overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(217,100,46,0.05)', borderBottom: `2px solid ${PRIMARY}` }}>
                    <th style={{ textAlign: 'left', padding: 12, fontWeight: '700', color: PRIMARY }}>Rank</th>
                    <th style={{ textAlign: 'left', padding: 12, fontWeight: '700', color: PRIMARY }}>Player</th>
                    <th style={{ textAlign: 'right', padding: 12, fontWeight: '700', color: PRIMARY }}>Points</th>
                    <th style={{ textAlign: 'right', padding: 12, fontWeight: '700', color: PRIMARY }}>Achievements</th>
                    <th style={{ textAlign: 'left', padding: 12, fontWeight: '700', color: PRIMARY }}>Country</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p, idx) => (
                    <tr key={p.id} style={{ borderBottom: `1px solid rgba(217,108,47,0.1)`, transition: 'background 0.2s', background: idx % 2 === 0 ? 'transparent' : 'rgba(217,100,46,0.02)' }}>
                      <td style={{ padding: 12, fontWeight: '700', color: PRIMARY }}>{p.rank}</td>
                      <td style={{ padding: 12 }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                          <img src={p.avatar || FALLBACK_AVATAR} alt={p.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                          <span style={{ fontWeight: '600', color: MUTED_TEXT }}>{p.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: 12, textAlign: 'right', fontWeight: '600', color: MUTED_TEXT }}>{p.points?.toLocaleString()}</td>
                      <td style={{ padding: 12, textAlign: 'right', fontWeight: '600', color: MUTED_TEXT }}>{p.achievements}</td>
                      <td style={{ padding: 12, fontWeight: '600', color: ACCENT }}>{p.country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}
