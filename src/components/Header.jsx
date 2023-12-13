import { Toolbar, Typography } from '@mui/material';
import WebApp from '@twa-dev/sdk';

function Header({ title, color = WebApp.themeParams.text_color }) {
  return (
    <Toolbar>
      <Typography
        align="center"
        sx={{ flex: '1 1 100%', color }}
        variant="h6"
        id="tableTitle"
        component="div">
        {title}
      </Typography>
    </Toolbar>
  );
}

export default Header;
