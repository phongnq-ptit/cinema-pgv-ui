import React, {useEffect, useState} from 'react';
import usePaymentApi from '../../../hooks/apis/usePaymentApi';
import {useParams} from 'react-router-dom';
import {Purchase} from '../../../models/Purchase';
import {Box, Button, Divider, Grid, Paper, Typography} from '@mui/material';
import {
  formatDate,
  formatter,
  makeid,
  removeVietnameseTones,
} from '../../../utils/CommonUtils';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import DownloadIcon from '@mui/icons-material/Download';

const PurchaseDetail = () => {
  const {getPurchase, updatePurchaseDownload} = usePaymentApi();
  const [purchase, setPurchase] = useState<Purchase>();
  const [reload, setReload] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (params.purchaseUuid) {
      getPurchase(params.purchaseUuid as string)
        .then((response) => {
          setPurchase(response.data);
        })
        .catch((e) => console.log(e));
    }
    // eslint-disable-next-line
  }, [params.purchaseUuid, reload]);

  const getImageSrc = (content: string) => {
    const URL = `https://chart.googleapis.com/chart?chs=300&cht=qr&chl=${content}&choe=UTF-8`;
    return URL;
  };

  const downloadPDF = () => {
    if (purchase) {
      updatePurchaseDownload(purchase.uuid)
        .then((response) => {})
        .catch((e) => {})
        .finally(() => {
          const doc = new jsPDF();

          // Add title
          doc.setFont('courier', 'normal');
          doc.setFontSize(18);
          doc.text('Cinema ticket', 105, 20, {align: 'center'});

          let imageData = new Image(300, 300);
          imageData.src = getImageSrc(JSON.stringify(purchase));
          doc.addImage(imageData, 'PNG', 56, 25, 100, 100);

          // Add details
          doc.setFontSize(12);
          doc.text(
            `Movie: ${removeVietnameseTones(
              purchase?.moviePublic.movie.name
                ? purchase?.moviePublic.movie.name
                : ''
            )}`,
            38,
            130
          );
          doc.text(
            `Branch: ${removeVietnameseTones(
              purchase?.moviePublic.branch.userName
                ? purchase?.moviePublic.branch.userName
                : ''
            )}`,
            38,
            140
          );
          doc.text(`Price: ${purchase?.moviePublic.price}`, 38, 150);
          doc.text(
            `Date: ${formatDate(
              purchase?.moviePublic.startDate
                ? purchase.moviePublic.startDate
                : new Date(),
              purchase?.moviePublic.endDate
                ? purchase.moviePublic.endDate
                : new Date()
            )}`,
            38,
            160
          );

          doc.save(
            `${removeVietnameseTones(
              purchase?.moviePublic.movie.name
                ? purchase?.moviePublic.movie.name
                : ''
            )}_${formatDate(
              purchase?.moviePublic.startDate
                ? purchase.moviePublic.startDate
                : new Date(),
              purchase?.moviePublic.endDate
                ? purchase.moviePublic.endDate
                : new Date()
            )}_${makeid(5)}.pdf`
          );

          setReload(!reload);
        });
    }
  };

  return (
    <React.Fragment>
      <Box sx={{minHeight: '80vh'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              sx={{
                width: '100%',
                fontSize: '2rem',
                fontWeight: 600,
                my: 3,
                textAlign: 'center',
              }}
            >{`Thông tin chi tiết lịch sử mua`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Paper sx={{p: 6, width: '60%'}}>
                <Typography
                  component="h3"
                  sx={{fontSize: '20px', mt: 2, fontWeight: 600, mb: 1}}
                >
                  Thông tin người mua:
                </Typography>
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={6}>
                    <Typography component="span" sx={{fontWeight: 600}}>
                      Họ tên:
                    </Typography>
                    <span>{` ${purchase?.user.userName}`}</span>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="span" sx={{fontWeight: 600}}>
                      Email:
                    </Typography>
                    <span>{` ${purchase?.user.email}`}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component="span" sx={{fontWeight: 600}}>
                      Địa chỉ:
                    </Typography>
                    <span>{` ${purchase?.user.address}`}</span>
                  </Grid>
                </Grid>
                <Divider />
                <Typography
                  component="h3"
                  sx={{fontSize: '20px', mt: 2, fontWeight: 600, mb: 1}}
                >
                  Thông tin bộ phim:
                </Typography>
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={6}>
                    <Typography component="span" sx={{fontWeight: 600}}>
                      Tên phim:
                    </Typography>
                    <span>{` ${purchase?.moviePublic.movie.name}`}</span>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="span" sx={{fontWeight: 600}}>
                      Thời lượng phim:
                    </Typography>
                    <span>{` ${purchase?.moviePublic.movie.duration} phút`}</span>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="span" sx={{fontWeight: 600}}>
                      Tác giả:
                    </Typography>
                    <span>{` ${purchase?.moviePublic.movie.author}`}</span>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="span" sx={{fontWeight: 600}}>
                      Ngày phát hành:
                    </Typography>
                    <span>{` ${dayjs(
                      purchase?.moviePublic.movie.releaseDate
                    ).format('DD/MM/YYYY')}`}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component="span" sx={{fontWeight: 600}}>
                      Thể loại:
                    </Typography>
                    <span>{` ${purchase?.moviePublic.movie.categories
                      .map((item) => item.name)
                      .join(', ')}`}</span>
                  </Grid>
                </Grid>
                <Divider />
                <Typography
                  component="h3"
                  sx={{fontSize: '20px', mt: 2, fontWeight: 600, mb: 1}}
                >
                  Thông tin vé mua:
                </Typography>
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={6}>
                    <Typography component="span" sx={{fontWeight: 600}}>
                      Ngày công chiếu:
                    </Typography>
                    <Typography>{`${formatDate(
                      purchase?.moviePublic.startDate
                        ? purchase.moviePublic.startDate
                        : new Date(),
                      purchase?.moviePublic.endDate
                        ? purchase.moviePublic.endDate
                        : new Date()
                    )}`}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="span" sx={{fontWeight: 600}}>
                      Số vé mua:
                    </Typography>
                    <span>{` ${purchase?.quantityOfTickets} vé`}</span>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="span" sx={{fontWeight: 600}}>
                      Chinh nhánh đến:
                    </Typography>
                    <Typography>{` ${purchase?.moviePublic.branch.userName}`}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="span" sx={{fontWeight: 600}}>
                      Thành tiền:
                    </Typography>
                    <span>{` ${formatter.format(
                      purchase?.moviePublic.price && purchase?.quantityOfTickets
                        ? purchase.moviePublic.price *
                            purchase.quantityOfTickets
                        : 0
                    )}`}</span>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container justifyContent="space-between" mt={2}>
                  <Grid item xs={6}>
                    <Typography>{`Số lượt tải vé còn lại: ${purchase?.downloads} lượt`}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      disabled={
                        purchase?.downloads ? purchase.downloads <= 0 : true
                      }
                      variant="outlined"
                      sx={{float: 'right'}}
                      onClick={downloadPDF}
                      startIcon={<DownloadIcon />}
                    >
                      Tải vé xuống
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default PurchaseDetail;
