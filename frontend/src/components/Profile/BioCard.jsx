import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import Map from  '../Map/Map';
import { NavLink } from 'react-router-dom';

export default function BioCard(data) {
  
  const {name, description, imgUrl, latitude, longitude, instagram, facebook} = data;
  
  return (
    <Card
      sx={{
        width: 250,
        maxWidth: '100%',
        boxShadow: 'lg',
      }}
    >
      <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Avatar src={imgUrl} sx={{ '--Avatar-size': '4rem' }} />
        <Chip
          size="sm"
          variant="soft"
          color="primary"
          sx={{
            mt: -1,
            mb: 1,
            border: '3px solid',
            borderColor: 'background.surface',
          }}
        >
          PRO
        </Chip>
        <Typography level="title-lg">{name}</Typography>
        <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
         {description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mt: 2,
            '& > button': { borderRadius: '2rem' },
          }}
        >
          <a href={facebook} target="_blank" rel="noopener noreferrer">
            <IconButton size="sm" variant="plain" color="neutral">
              <FacebookIcon />
            </IconButton>
          </a>
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            <IconButton size="sm" variant="plain" color="neutral">
              <InstagramIcon />
            </IconButton>
          </a>
          <IconButton size="sm" variant="plain" color="neutral">
            <TwitterIcon />
          </IconButton>
          <IconButton size="sm" variant="plain" color="neutral">
            <NavLink to='/map'>
              <AddLocationAltIcon render={() =>  <Map latitude={latitude} longitude={longitude} />} /> 
            </NavLink>
          </IconButton>
        </Box>
      </CardContent>
      <CardOverflow sx={{ bgcolor: 'background.level1' }}>
        <CardActions buttonFlex="1">
          <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
            <Button>Message</Button>
            <Button>Connect</Button>
          </ButtonGroup>
        </CardActions>
      </CardOverflow>
    </Card>
  );
}
