import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import {useNavigate} from 'react-router-dom';
import Footer from '../Footer';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.facebook.com/phongnq.a4">
        Phong Nguyen Quoc
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function LandingPage() {
  const navigate = useNavigate();

  const onClickAction = (path: string) => {
    navigate(path);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <LogoDevIcon sx={{mr: 2}} />
          <Typography variant="h6" color="inherit" noWrap>
            CINEMA PGV
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 20,
            pb: 6,
            backgroundImage:
              'url("https://i.pinimg.com/564x/e0/f4/ba/e0f4baaf2bf43934f69db75d4726f9fb.jpg")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '70vh',
          }}
        >
          <Container
            maxWidth="sm"
            sx={{
              backgroundColor: 'rgba(207, 207, 207, 0.7)',
              p: 4,
              borderRadius: 10,
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              fontWeight="700"
              gutterBottom
            >
              Cinema PGV
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Chúng tôi không ngừng nâng cao chất lượng dịch vụ và đa dạng hóa
              lịch chiếu để đáp ứng mọi nhu cầu của khán giả yêu điện ảnh. Hãy
              cùng chúng tôi tạo nên những kỷ niệm đáng nhớ và thú vị từ mỗi
              buổi chiếu tại PGV Cinema!
            </Typography>
            <Stack
              sx={{pt: 4}}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                onClick={() => onClickAction('/login')}
              >
                Đăng nhập
              </Button>
              <Button
                variant="contained"
                onClick={() => onClickAction('/register')}
              >
                Đăng ký
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{py: 8}} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{flexGrow: 1}}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}
