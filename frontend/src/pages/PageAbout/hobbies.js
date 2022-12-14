import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PaletteIcon from '@mui/icons-material/Palette';
import SchoolIcon from '@mui/icons-material/School';

const generateHobbies = () => {

  const props = {
    fontSize: 'large',
    sx: {
      border: '2px solid whitesmoke',
      borderRadius: '50%'
    }
  }

  return [
    {
      text: 'As a child, I was always drawn to projects that were both visually stunning and intellectually stimulating. This passion has continued to drive me in my pursuit of knowledge and skill in the mediums I use to create these engaging visual experiences, be it through the medium of digital art or the precision of programming.',
      icon: <PaletteIcon {...props} />
    },
    {
      text: 'I am also incredibly passionate about game design. There is a unique thrill in creating an interactive medium that others can engage with and enjoy. It is incredibly satisfying to watch others play and interact with something I have designed, and this passion drives me to constantly seek out new and innovative ways to create engaging and immersive experiences for players.',
      icon: <SportsEsportsIcon {...props} />
    },
    {
      text: 'I have a passion for teaching. It is deeply satisfying to watch others learn and grow, and I take great pleasure in providing guidance and support to help them achieve their goals. Currently, I offer private tutoring services to friends and family members.',
      icon: <SchoolIcon {...props} />
    }
  ]
}

export default generateHobbies;
