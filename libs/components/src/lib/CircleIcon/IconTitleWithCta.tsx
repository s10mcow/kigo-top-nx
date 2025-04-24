import { SvgIconComponent } from '@mui/icons-material';
import { Box, Typography, TypographyTypeMap } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { CircleIcon } from './CircleIcon';

type TypographyVariant = TypographyTypeMap['props']['variant'];

type ImgIcon = {
  variant: 'img-icon';
  src: string;
  alt: string;
  width: number;
  height: number;
};

type CircleIconType = {
  variant: 'circle-icon';
  innerIcon: SvgIconComponent;
};

type IconTitleWithCtaProps = {
  typography: {
    contents: {
      title: string;
      body: string | React.ReactNode;
    };
    variants?: {
      title?: TypographyVariant;
      body?: TypographyVariant;
    };
  };
  icon: ImgIcon | CircleIconType;
  cta?: React.ReactElement;
};

export default function IconTitleWithCta({
  typography: {
    contents: { title, body },
    variants = { title: 'titleMd', body: 'bodyMd' },
  },
  icon,
  cta,
}: IconTitleWithCtaProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {icon.variant === 'img-icon' ? (
        <Image
          src={icon.src}
          alt={icon.alt}
          width={icon.width}
          height={icon.height}
        />
      ) : (
        <CircleIcon InnerIcon={icon.innerIcon} />
      )}
      <Typography
        variant={variants.title}
        component="h3"
        sx={{ textAlign: 'center', mt: '24px' }}
      >
        {title}
      </Typography>
      <Typography
        variant={variants.body}
        component="p"
        sx={{ textAlign: 'center', mt: '8px' }}
      >
        {body}
      </Typography>
      {cta}
    </Box>
  );
}
