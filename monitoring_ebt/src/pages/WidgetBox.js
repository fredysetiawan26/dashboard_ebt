import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';
// ----------------------------------------------------------------------

WidgetBox.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  waktu: PropTypes.string,
  sx: PropTypes.object,
};

export default function WidgetBox({ title, number, waktu, color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        py: 3,
        boxShadow: 3,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].light,
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h3">{(waktu)} {(number)}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.80 }}>
        {title}
      </Typography>
    </Card>
  );
}
