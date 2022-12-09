import React from 'react';
import { Link } from "@mui/material";
import { Fragment } from "react";
import PaletteIcon from '@mui/icons-material/Palette';
import GameControllerIcon from '@mui/icons-material/SportsEsports';
import CodeIcon from '@mui/icons-material/Code';
import VisibilityIcon from '@mui/icons-material/Visibility';

const generateProjects = (navigate) => {
  const projects = [
    {
      title: 'Earth\'s Ephemeris',
      date: '(25/12/2018) → (28/08/2019)',
      type: ['Artwork', 'High School Project'],
      imgs: [
        '/images/hscbow/homesweethome.jpg',
        '/images/hscbow/leaving.jpg',
        '/images/hscbow/bonvoyage.jpg',
        '/images/hscbow/rabureta.jpg',
        '/images/hscbow/ruiji.jpg',
        '/images/hscbow/homecoming.jpg',
      ],
      body: [
        'A Body of Work consisting of 6 artworks.',
        'Created for HSC Visual Arts.',
        <Fragment>
          {'Featured in '}
          <Link href='https://www.artgallery.nsw.gov.au/art/insideartexpress/2020/gordon-wang/' target='_blank' >
            {'2020 ArtExpress at the Art Gallery of NSW'}
          </Link>
          {'.'}
        </Fragment>,
        <Fragment>
          {'Featured in the '}
          <Link href='http://newslocal.smedia.com.au/canterbury-bankstown-express/?href=NLCBE-2020-02-19' target='_blank' >
            {'"Canterbury-Bankstown Express"'}
          </Link >
          {' and '} 
          <Link href='https://www.localnewsplus.com.au/brushed-up-way-to-artexpress/' target='_blank' >
            {'"Torch Publishing"'}
          </Link >
          {'.'}
        </Fragment>
      ],
      buttons: [
        {
          text: 'View Artworks',
          icon: <PaletteIcon />,
          onClick: () => {
            navigate('earth-ephemeris')
          },
        }
      ]
    },
    {
      title: 'Minecraft Recreation',
      date: '(10/12/2021)',
      type: ['University Project', 'Game'],
      imgs: [
        '/images/minecraft-recreation/1.png',
        '/images/minecraft-recreation/2.png',
        '/images/minecraft-recreation/3.png',
        '/images/minecraft-recreation/4.png',
        '/images/minecraft-recreation/5.png'
      ],
      body: [
        'Recreation of Mojang\'s Minecraft with OpenGL C++.',
        'Created during my first exposure to OpenGL in UNSW.',
        'Features Block placing, shadows, planar reflections, billboard particles, collision detection...',
        'Features several post processing features such as kernel manipulation and HDR rendering that auto-adjusts to the game\'s environment brightness levels.',
      ],
      buttons: [
        {
          text: 'View Project',
          icon: <VisibilityIcon />,
          onClick: () => {
            navigate('minecraft-recreation')
          }
        },
        {
          text: 'View Code',
          icon: <CodeIcon />,
          disabled: 'Source Code can not be publicly shared.'
        }
      ]
    },
    {
      title: 'Tic-Tac-Toe: Capture',
      date: '(28/11/2022)',
      type: ['Game', 'Personal Project'],
      imgs: [
        '/images/covers/tic-tac-toe-capture.jpg'
      ],
      body: [
        'Recreation of Tic Tac Toe with a twist.',
        'Two-player game.',
        'Negate your opponent\'s move with the right strategy.',
        'Features options to reset game or undo previous move.'
      ],
      buttons: [
        {
          text: 'Play Game',
          icon: <GameControllerIcon />,
          onClick: () => {
            navigate('showcase/tic-tac-toe-capture')
          }
        },
        {
          text: 'View Code',
          icon: <CodeIcon />,
          onClick: () => {
            window.open('https://github.com/GHWang28/tic-tac-toe-capture', '_blank').focus();
          }
        }
      ]
    },
    {
      title: 'Spotter',
      date: '(30/11/2022)',
      type: ['Game', 'Personal Project'],
      imgs: [
        '/images/covers/spotter.jpg'
      ],
      body: [
        'Find your character before the time runs out.',
        'Single player game.',
        'Levels get progressively more difficult.',
        'Player scores are saved.'
      ],
      buttons: [
        {
          text: 'Play Game',
          icon: <GameControllerIcon />,
          onClick: () => {
            navigate('showcase/spotter')
          }
        },
        {
          text: 'View Code',
          icon: <CodeIcon />,
          onClick: () => {
            window.open('https://github.com/GHWang28/spotter', '_blank').focus();
          }
        }
      ]
    },
    {
      title: 'Xeno and Yova',
      date: '(21/9/2019)',
      type: ['Game', 'High School Project'],
      imgs: [
        '/images/covers/xny.png'
      ],
      body: [
        'Small puzzle game created with the RPG Maker MV Engine.',
        'Single player game.'
      ],
      buttons: [
        {
          text: 'Play Game',
          icon: <GameControllerIcon />,
          onClick: () => {
            navigate('showcase/Xeno-and-Yova')
          }
        },
        {
          text: 'View Code',
          icon: <CodeIcon />,
          onClick: () => {
            window.open('https://github.com/GHWang28/xeno-and-yova', '_blank').focus();
          }
        }
      ]
    },
    {
      title: 'Slackr',
      date: '(24/10/2022)',
      type: ['Frontend', 'University Project'],
      imgs: [
        '/images/covers/slackr.png'
      ],
      body: [
        'My Slackr Assignment work at COMP6080 UNSW.',
        'A messaging website that has many features included.',
        'Made entirely from JavaScript and DOM manipulations.',
        'Achieved 100% for this Assignment.',
      ],
      buttons: [
        {
          text: 'View Project',
          icon: <VisibilityIcon />,
          onClick: () => {
            navigate('slackr')
          }
        },
        {
          text: 'View Code',
          icon: <CodeIcon />,
          disabled: 'Source Code can not be publicly shared.'
        }
      ]
    },
  ]

  return projects.sort((a, b) => {
    if ( a.title < b.title ){
      return -1;
    } else if ( a.title > b.title ){
      return 1;
    }
    return 0;
  });
} 

export default generateProjects;
