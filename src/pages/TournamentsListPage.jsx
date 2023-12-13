import { Box, Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ThreeDot } from 'react-loading-indicators';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { MAFSTATS_SERVER_URL } from '../utils/constants';

// добавить возможность посмотреть турик по ID
function TournamentsListPage({ setTournamentTitle, setTournamentId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tournamentsList, setTournamentsList] = useState([]);
  const [num, setNum] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${MAFSTATS_SERVER_URL}/api/stats/getTournamentsList`)
      .then((response) => setTournamentsList(response.data))
      .catch((error) => console.log(error));
  }, []);

  const onClickButton = (tournamentTitle, tournamentId) => {
    setTournamentTitle(tournamentTitle);
    setTournamentId(tournamentId);
    navigate('/tournamentStats', { replace: true });
  };

  const handleChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      setNum(e.target.value);
    }
  };

  const getTournamentInfo = async (tournamentId) => {
    setIsLoading(true);
    axios
      .post(`${MAFSTATS_SERVER_URL}/api/stats/getTournamentInfo`, {
        tournamentId: tournamentId,
      })
      .then((response) => {
        setTournamentTitle(response.data.title);
        setTournamentId(response.data.id);
        navigate('/tournamentStats', { replace: true });
      })
      .catch(() => WebApp.showAlert('Турнир не найден'))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Header title="Список турниров" />
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: WebApp.backgroundColor,
            color: WebApp.themeParams.text_color,
          }}>
          {tournamentsList.map((tournament, index) => (
            <ListItem
              key={index}
              disableGutters
              secondaryAction={
                <Button
                  variant="outlined"
                  style={{
                    color: WebApp.themeParams.text_color,
                    borderColor: WebApp.themeParams.text_color,
                  }}
                  onClick={() => onClickButton(tournament.title, tournament.id)}>
                  Открыть
                </Button>
              }>
              <ListItemText sx={{ maxWidth: '250px' }} primary={tournament.title} />
            </ListItem>
          ))}
        </List>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': {
              m: 1,
              width: '25ch',
            },
          }}
          autoComplete="off">
          <TextField
            sx={{
              '& .MuiFormLabel-root': {
                color: WebApp.themeParams.text_color,
              },
            }}
            InputProps={{
              sx: {
                '& input': {
                  color: WebApp.themeParams.text_color,
                },
              },
            }}
            type="text"
            id="outlined"
            label="ID Турнира"
            onChange={(e) => handleChange(e)}
            value={num}
          />
        </Box>
        <Button
          align="center"
          variant="outlined"
          style={{
            color: WebApp.themeParams.text_color,
            borderColor: WebApp.themeParams.text_color,
          }}
          onClick={() => (num ? getTournamentInfo(num) : WebApp.showAlert('Введите ID турнира'))}>
          {isLoading ? <ThreeDot color={WebApp.themeParams.text_color} /> : 'Поиск'}
        </Button>
      </div>
    </>
  );
}

export default TournamentsListPage;
