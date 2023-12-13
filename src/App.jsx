import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import TournamentExtraPointsPage from './pages/TournamentExtraPointsPage';
import TournamentStatsPage from './pages/TournamentStatsPage';
import TournamentsListPage from './pages/TournamentsListPage';

function App() {
  const [tournamentTitle, setTournamentTitle] = useState('');
  const [tournamentId, setTournamentId] = useState();
  const [roleExtraFetching, setRoleExtraFetching] = useState('');

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <TournamentsListPage
              setTournamentTitle={setTournamentTitle}
              setTournamentId={setTournamentId}
            />
          }
        />
        <Route
          path="tournamentStats"
          element={
            <TournamentStatsPage
              tournamentTitle={tournamentTitle}
              setRoleExtraFetching={setRoleExtraFetching}
            />
          }
        />
        <Route
          path="tournamentExtraPoints"
          element={
            <TournamentExtraPointsPage
              tournamentTitle={tournamentTitle}
              tournamentId={tournamentId}
              roleExtraFetching={roleExtraFetching}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
