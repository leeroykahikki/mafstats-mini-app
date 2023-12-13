import { Button, List, ListItem, ListItemText } from '@mui/material';
import WebApp from '@twa-dev/sdk';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function TournamentStatsPage({ tournamentTitle, setRoleExtraFetching }) {
  const navigate = useNavigate();

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
        <Header title={tournamentTitle} />
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: WebApp.backgroundColor,
            color: WebApp.themeParams.text_color,
          }}>
          <ListItem
            disableGutters
            secondaryAction={
              <Button
                variant="outlined"
                style={{
                  color: WebApp.themeParams.text_color,
                  borderColor: WebApp.themeParams.text_color,
                }}
                onClick={() => {
                  setRoleExtraFetching('Маф');
                  navigate('/tournamentExtraPoints', { replace: true });
                }}>
                Открыть
              </Button>
            }>
            <ListItemText primary="Доп.баллы ~ Мафия" />
          </ListItem>
          <ListItem
            disableGutters
            secondaryAction={
              <Button
                variant="outlined"
                style={{
                  color: WebApp.themeParams.text_color,
                  borderColor: WebApp.themeParams.text_color,
                }}
                onClick={() => {
                  setRoleExtraFetching('Дон');
                  navigate('/tournamentExtraPoints', { replace: true });
                }}>
                Открыть
              </Button>
            }>
            <ListItemText primary="Доп.баллы ~ Дон" />
          </ListItem>
        </List>
        <Button
          align="center"
          variant="outlined"
          style={{
            color: WebApp.themeParams.text_color,
            borderColor: WebApp.themeParams.text_color,
          }}
          onClick={() => navigate('/', { replace: true })}>
          Назад
        </Button>
      </div>
    </>
  );
}

export default TournamentStatsPage;
