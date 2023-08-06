import React, {useContext, useEffect} from 'react';
import {useAuthApi} from '../../hooks/apis/useAuthApi';
import {LoadingContext} from '../../hooks/contexts/LoadingContext';
import {warningSnackbar} from '../../utils/showSnackbar';
import {useNavigate} from 'react-router-dom';

const VerifyAccount = () => {
  const {verifyAccount} = useAuthApi();
  const {setLoadingPage} = useContext(LoadingContext);
  const urlParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  useEffect(() => {
    if (urlParams.get('userUuid')) {
      setLoadingPage(true);
      verifyAccount(urlParams.get('userUuid')!)
        .then((response) => {
          if (response.status === 204) {
            setTimeout(() => {
              setLoadingPage(false);
              navigate('/verify-account-successful');
            }, 5000);
          } else {
            warningSnackbar('Tài khoản này đã được kích hoạt!');
            setLoadingPage(false);
            navigate('/login');
          }
        })
        .catch((e) => {});
    }
    // eslint-disable-next-line
  }, []);

  return <React.Fragment></React.Fragment>;
};

export default VerifyAccount;
