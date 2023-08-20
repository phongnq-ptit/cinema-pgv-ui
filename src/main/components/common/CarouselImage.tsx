import React from 'react';
import Carousel from 'react-material-ui-carousel';
import {Box} from '@mui/material';

interface SettingsT {
  autoPlay: boolean;
  animation: 'fade' | 'slide';
  indicators: boolean;
  duration: number;
  navButtonsAlwaysVisible: boolean;
  navButtonsAlwaysInvisible: boolean;
  fullHeightHover: boolean;
  cycleNavigation: boolean;
  swipe: boolean;
  [key: string]: any;
}

const DefaultSettingsT: SettingsT = {
  autoPlay: true,
  animation: 'slide',
  indicators: true,
  duration: 400,
  navButtonsAlwaysVisible: true,
  navButtonsAlwaysInvisible: false,
  cycleNavigation: true,
  fullHeightHover: true,
  swipe: true,
};

interface BaseProps {
  images: Array<string>;
  sx?: any;
}

const CarouselImage = ({props}: {props: BaseProps}) => {
  return (
    <Carousel {...DefaultSettingsT}>
      {props.images.map((item, index) => (
        <Box>
          <Box
            component="img"
            src={item}
            alt="..."
            loading="lazy"
            sx={
              props.sx
                ? props.sx
                : {
                    width: '100%',
                    height: '500px',
                    objectFit: 'cover',
                  }
            }
            key={index + 'abcde'}
          />
        </Box>
      ))}
    </Carousel>
  );
};

export default CarouselImage;
