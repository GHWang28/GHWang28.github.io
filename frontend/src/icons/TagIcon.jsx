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

export default function TagIcon ({ label, sx }) {
  switch (label.toLowerCase()) {
    case 'artwork': return <PaletteIcon sx={sx}/>;
    case 'react': return <ReactIcon sx={sx} />;
    case 'c++': return <CppIcon sx={sx} />;
    case 'game': return <SportsEsportsIcon sx={sx} />;
    case 'opengl': return <CreateIcon sx={sx}/>
    case 'javascript': return <JavascriptIcon sx={{ ...sx, scale: '2' }} />
    case 'frontend': return <WebIcon sx={sx} />
    case 'personal project': return <FaceIcon sx={sx} />
    case 'university project': return <SchoolIcon sx={sx} />
    case 'high school project': return <HighschoolIcon sx={sx} />
    default: return null;
  }
}
