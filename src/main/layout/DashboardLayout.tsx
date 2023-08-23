import LogoDevIcon from '@mui/icons-material/LogoDev';
import React, {ReactNode, useContext} from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DiscountIcon from '@mui/icons-material/Discount';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import StoreIcon from '@mui/icons-material/Store';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CategoryIcon from '@mui/icons-material/Category';
import MovieIcon from '@mui/icons-material/Movie';
import {AuthContext} from '../hooks/contexts/AuthContext';
import {UserRole} from '../models/enums/UserRole';
import {styled} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import Footer from '../components/common/Footer';

const Navbar = () => {
  const {LoginUser} = useContext(AuthContext);

  const clientItems = [
    {
      href: '/client/home',
      icon: <HomeIcon />,
      title: 'Trang chủ',
    },
    {
      href: '/client/tickets',
      icon: <DiscountIcon />,
      title: 'Vé đã mua',
    },
    {
      href: '/client/profile',
      icon: <AccountCircleIcon />,
      title: 'Thông tin cá nhân',
    },
    {
      href: '/client/logout',
      icon: <LogoutIcon />,
      title: 'Đăng xuất',
    },
  ];

  const adminItems = [
    {
      href: '/admin/manage-user',
      icon: <ManageAccountsIcon />,
      title: 'Quản lý người dùng',
    },
    {
      href: '/admin/manage-branch',
      icon: <StoreIcon />,
      title: 'Quản lý chi nhánh',
    },
    {
      href: '/admin/movies',
      icon: <LiveTvIcon />,
      title: 'Quản lý phim',
    },
    {
      href: '/admin/categories',
      icon: <CategoryIcon />,
      title: 'Quản lý thể loại',
    },
    {
      href: '/admin/profile',
      icon: <AccountCircleIcon />,
      title: 'Thông tin cá nhân',
    },
    {
      href: '/admin/logout',
      icon: <LogoutIcon />,
      title: 'Đăng xuất',
    },
  ];

  const branchItems = [
    {
      href: '/branch/movies',
      icon: <MovieIcon />,
      title: 'Chọn phim phát hành',
    },
    {
      href: '/branch/public-movies/',
      icon: <LiveTvIcon />,
      title: 'Quản lý phim',
    },
    {
      href: '/branch/profile',
      icon: <AccountCircleIcon />,
      title: 'Thông tin cá nhân',
    },
    {
      href: '/branch/logout',
      icon: <LogoutIcon />,
      title: 'Đăng xuất',
    },
  ];

  return (
    <React.Fragment>
      {LoginUser.role === UserRole.CLIENT &&
        clientItems.map((item) => (
          <NavItem
            href={item.href}
            key={item.title}
            title={item.title}
            icon={item.icon}
          />
        ))}
      {LoginUser.role === UserRole.BRANCH &&
        branchItems.map((item) => (
          <NavItem
            href={item.href}
            key={item.title}
            title={item.title}
            icon={item.icon}
          />
        ))}
      {LoginUser.role === UserRole.ADMIN &&
        adminItems.map((item) => (
          <NavItem
            href={item.href}
            key={item.title}
            title={item.title}
            icon={item.icon}
          />
        ))}
    </React.Fragment>
  );
};

const NavItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: ReactNode;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {setLoginUser, setRefreshToken, setAccessToken} =
    useContext(AuthContext);

  let onClickBtn = undefined;
  if (href.includes('/logout')) {
    onClickBtn = () => {
      localStorage.removeItem('login');
      setLoginUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      navigate('/');
    };
  } else {
    onClickBtn = () => {
      navigate(href);
    };
  }

  return (
    <ListItemButton onClick={onClickBtn}>
      <ListItemIcon
        style={{
          color: location.pathname.includes(href) ? '#004d40' : '',
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        style={{
          color: location.pathname.includes(href) ? '#004d40' : '',
          textDecoration: location.pathname.includes(href) ? 'underline' : '',
        }}
        primary={title}
      />
    </ListItemButton>
  );
};

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function DashboardLayout() {
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && {display: 'none'}),
            }}
          >
            <MenuIcon />
          </IconButton>
          <LogoDevIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: {xs: 'none', md: 'flex'},
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CINEMA PGV
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <Navbar />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
          <Outlet />
        </Container>
        {location.pathname.includes('/client') && <Footer />}
      </Box>
    </Box>
  );
}
