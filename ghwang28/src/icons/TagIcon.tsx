import React from 'react';
import PaletteIcon from '@mui/icons-material/Palette';
import CppIcon from './CppIcon';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ReactIcon from './ReactIcon';
import CreateIcon from '@mui/icons-material/Create';
import JavascriptIcon from '@mui/icons-material/Javascript';
import SchoolIcon from '@mui/icons-material/School';
import FaceIcon from '@mui/icons-material/Face';
import WebIcon from '@mui/icons-material/Web';
import HighschoolIcon from './HighschoolIcon';
import FirebaseIcon from './FirebaseIcon';
import { SxProps } from '@mui/material';
import { IconTypes } from '../types';

type ComponentProps = {
  label: IconTypes,
  sx?: SxProps
}

const TagIcon = ({ label, sx }: ComponentProps) => {
  switch (label) {
    case 'Artwork': return <PaletteIcon sx={sx}/>;
    case 'React': return <ReactIcon sx={sx} />;
    case 'C++': return <CppIcon sx={sx} />;
    case 'Game': return <SportsEsportsIcon sx={sx} />;
    case 'OpenGL': return <CreateIcon sx={sx}/>
    case 'JavaScript': return <JavascriptIcon sx={{ ...sx, scale: '2' }} />
    case 'Frontend': return <WebIcon sx={sx} />
    case 'Personal Project': return <FaceIcon sx={sx} />
    case 'University Project': return <SchoolIcon sx={sx} />
    case 'High School Project': return <HighschoolIcon sx={sx} />
    case 'Firebase': return <FirebaseIcon sx={sx} />
    default: return null;
  }
}

export default TagIcon;
