import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { MAFSTATS_SERVER_URL } from '../utils/constants';

function TournamentStatsPage({ tournamentTitle, tournamentId, roleExtraFetching }) {
  const [playersList, setPlayersList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`${MAFSTATS_SERVER_URL}/api/stats/getExtraPointsList`, {
        tournamentId: tournamentId,
        role: roleExtraFetching,
      })
      .then((response) => {
        setPlayersList(response.data.playersList);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Paper>
        <Header title={tournamentTitle} color="#000" />
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Игрок</TableCell>
                <TableCell align="right">Доп. баллы</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playersList.map((player, index) => (
                <TableRow
                  key={player + index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{player[0]}</TableCell>
                  <TableCell align="right">{player[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '10px',
        }}>
        <Button
          align="center"
          variant="outlined"
          style={{
            color: WebApp.themeParams.text_color,
            borderColor: WebApp.themeParams.text_color,
          }}
          onClick={() => navigate('/tournamentStats', { replace: true })}>
          Назад
        </Button>
      </div>
    </>
  );
}

export default TournamentStatsPage;
