import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import {Facebook, Instagram, Twitter} from '@mui/icons-material';
import {Box} from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bottom: 0,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Về Chúng Tôi
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Với sứ mệnh mang đến những trải nghiệm điện ảnh tuyệt vời nhất,
              chúng tôi không ngừng nâng cao chất lượng dịch vụ và đa dạng hóa
              lịch chiếu để đáp ứng mọi nhu cầu của khán giả yêu điện ảnh. Hãy
              cùng chúng tôi tạo nên những kỷ niệm đáng nhớ và thú vị từ mỗi
              buổi chiếu tại PGV Cinema!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Liên hệ
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Nguyễn Quốc Phong
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@cinema-pgv.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Theo dõi chúng tôi
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{pl: 1, pr: 1}}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://your-website.com/">
              Phong - B19DCPT176
            </Link>
            {' - 08/'}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
