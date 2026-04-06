"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const Leaderboard = dynamic(() => import('../components/LeaderboardClient'), { ssr: false });

function LeaderboardsPage() {
  return <Leaderboard />;
}

(LeaderboardsPage as any).title = 'Leaderboards';

export default LeaderboardsPage;
