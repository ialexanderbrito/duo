import { Route, Routes } from 'react-router-dom';

import { GamedAd } from 'pages/GameAd';
import { Homepage } from 'pages/Home';

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="game/:id" element={<GamedAd />} />
    </Routes>
  );
}
