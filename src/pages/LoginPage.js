import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../firebase'
import { loginAPI } from '../common/axios/signinAxios'
import { getRole } from '../common/axios/authorizeAxios'
import { UserAuth } from '../context/AuthContext'
import { login, loginGoogle } from '../features/authSlice';
// ----------------------------------------------------------------------


const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const LoginPage = () => {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate()

  const isAuthenticated = localStorage.getItem('user') ? true : false
  const dispatch = useDispatch();
  // const googleAuth = new GoogleAuthProvider();
  const handleSignIn = async () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      try {
        await dispatch(loginGoogle())
        navigate('/dashboard');
      } catch (error) {
        console.error(error);
      }

    }
    // const result = await signInWithPopup(auth, googleAuth);
    // const token = result.user.getIdToken().then((token) => {
    //   loginAPI(token).then(data => {
    //     getRole(data.acesstoken).then(role => {
    //       console.log(role);
    //     })
    //   })
    //   console.log("token: ", token)
    // })
    // // }
  }

  //login gmail password
  const [username, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
        navigate('/dashboard');
      } else {
        try {
          console.log("password100:", username, password)

          await dispatch(login({username, password}));
          navigate('/dashboard');
        } catch (error) {
          console.error(error);
        }  
      }
  }
  return (
    <>
      <Helmet>
        <title> Login | VZS hehe </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to VZS
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don't have an account? {''}
              <Link variant="subtitle2">Get started</Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleSignIn}>
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm handleSubmit={handleSubmit} setEmail={setEmail} setPassword={setPassword} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
};
export default LoginPage;