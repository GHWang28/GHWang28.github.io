import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PaletteIcon from '@mui/icons-material/Palette';
import SchoolIcon from '@mui/icons-material/School';

const generateHobbies = () => {
  const props = {
    fontSize: 'large',
    sx: {
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'borderColor.main',
      borderRadius: '50%'
    }
  }

  return [
    {
      text: 'I am incredibly interested in game design. I find a unique thrill and satisfaction in creating an interactive medium that others can engage with and explore. Incorporating user\'s feedback to further improve the game\'s design adds to the satisfaction as it further fuels my creative thinking. This passion drives me to constantly seek out new and innovative ways to create engaging and interesting experiences for players. Currently I am learning how to program with Unity and Godot to create an indie game.',
      icon: <SportsEsportsIcon {...props} />
    },
    {
      text: 'I have always been drawn to projects that are visually stunning. This passion has continued to drive me in my pursuit of knowledge and skill in the mediums I use to create these engaging visual experiences, be it through the medium of digital art or the precision of programming.',
      icon: <PaletteIcon {...props} />
    },
    {
      text: 'I have a passion for teaching as it is deeply satisfying to watch others learn and grow. I take great pleasure in providing guidance and support to help them achieve their goals. Currently, I offer private tutoring services to friends and family members and am also a tutor for Frontend Programming at UNSW.',
      icon: <SchoolIcon {...props} />
    }
  ]
}

export default generateHobbies;
