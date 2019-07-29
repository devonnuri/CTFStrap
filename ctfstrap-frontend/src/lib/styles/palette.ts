const palette = {
  primary50: '#E8EAF6',
  primary100: '#C5CAE9',
  primary200: '#9FA8DA',
  primary300: '#7986CB',
  primary400: '#5C6BC0',
  primary500: '#3F51B5',
  primary600: '#3949AB',
  primary700: '#303F9F',
  primary800: '#283593',
  primary900: '#1A237E',

  secondary50: '#FFEBEE',
  secondary100: '#FFCDD2',
  secondary200: '#EF9A9A',
  secondary300: '#E57373',
  secondary400: '#EF5350',
  secondary500: '#F44336',
  secondary600: '#E53935',
  secondary700: '#D32F2F',
  secondary800: '#C62828',
  secondary900: '#B71C1C',

  gray50: '#ECEFF1',
  gray100: '#CFD8DC',
  gray200: '#B0BEC5',
  gray300: '#90A4AE',
  gray400: '#78909C',
  gray500: '#607D8B',
  gray600: '#546E7A',
  gray700: '#455A64',
  gray800: '#37474F',
  gray900: '#263238',
};

export const buttonColors: {
  [color: string]: {
    background: string;
    color: string;
    hoverBackground: string;
  };
} = {
  primary: {
    background: palette.primary600,
    color: 'white',
    hoverBackground: palette.primary500,
  },
  lightGray: {
    background: palette.gray200,
    color: palette.gray700,
    hoverBackground: palette.gray100,
  },
  gray: {
    background: palette.gray600,
    color: 'white',
    hoverBackground: palette.gray500,
  },
  darkGray: {
    background: palette.gray800,
    color: 'white',
    hoverBackground: palette.gray600,
  },
};

export default palette;
