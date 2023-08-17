import React from 'react';
import { Box, Link } from "@mui/material";
import { Fragment } from "react";
import PaletteIcon from '@mui/icons-material/Palette';
import GameControllerIcon from '@mui/icons-material/SportsEsports';
import CodeIcon from '@mui/icons-material/Code';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SparklezText from '../../components/Sparklez/SparklezText';
import { Location, NavigateFunction } from 'react-router';
import { IconTypes, ProjectData } from '../../types';

const dotpoint100Percent = (
  <Fragment>
    {'Achieved '}
    <SparklezText>{'100%'}</SparklezText>
    {' for this Assignment.'}
  </Fragment>
)

const generateProjects = (navigate: NavigateFunction, location: Location): ProjectData[]  => {
  const projects: ProjectData[] = [
    {
      title: 'Earth\'s Ephemeris',
      date: '(25/12/2018) → (28/08/2019)',
      type: new Set<IconTypes>(['Artwork', 'High School Project']),
      imgs: [
        '/images/hscbow/homesweethome_lowres.webp',
        '/images/hscbow/leaving_lowres.webp',
        '/images/hscbow/bonvoyage_lowres.webp',
        '/images/hscbow/rabureta_lowres.webp',
        '/images/hscbow/ruiji_lowres.webp',
        '/images/hscbow/homecoming_lowres.webp',
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
            navigate('earth-ephemeris', { state: { prevLocation: location.pathname } })
          },
        }
      ]
    },
    {
      title: 'Minecraft Recreation',
      date: '(10/12/2021)',
      type: new Set<IconTypes>(['University Project', 'Game', 'C++', 'OpenGL']),
      imgs: [
        '/images/minecraft-recreation/1.webp',
        '/images/minecraft-recreation/2.webp',
        '/images/minecraft-recreation/3.webp',
        '/images/minecraft-recreation/4.webp',
        '/images/minecraft-recreation/5.webp'
      ],
      body: [
        'Recreation of the base gameplay loop of Mojang\'s Minecraft with added features.',
        <Fragment>
          {'Created entirely from '}
          <Box component='span' sx={{ color: 'green.main' }}>
            {'OpenGL'}
          </Box>
          {' and '}
          <Box component='span' sx={{ color: 'green.main' }}>
            {'C++'}
          </Box>
          {'.'}
        </Fragment>,
        'Features Block placing, shadows, planar reflections, billboard particles, collision detection, real-time cube-map reflections...',
        'Features several post processing features such as kernel manipulation and HDR rendering that auto-adjusts to the game\'s environment brightness levels.',
        dotpoint100Percent
      ],
      buttons: [
        {
          text: 'View Project',
          icon: <VisibilityIcon />,
          onClick: () => {
            navigate('minecraft-recreation', { state: { prevLocation: location.pathname } })
          }
        },
        {
          text: 'View Source',
          icon: <CodeIcon />,
          disabled: 'Source Code can not be publicly shared.'
        }
      ]
    },
    {
      title: 'Tic-Tac-Toe: Capture',
      date: '(28/11/2022)',
      type: new Set<IconTypes>(['Game', 'Personal Project', 'React', 'JavaScript']),
      imgs: [
        '/images/covers/tic-tac-toe-capture.webp'
      ],
      body: [
        'The classic game of Tic Tac Toe with a new layer of strategy.',
        'Two-player game.',
        'Utilize effective strategies to negate your opponent\'s moves and gain an advantage in the game.',
        'Features options to reset game or undo a previous move.'
      ],
      buttons: [
        {
          text: 'Play Game',
          icon: <GameControllerIcon />,
          onClick: () => {
            navigate('showcase/tic-tac-toe-capture', { state: { prevLocation: location.pathname } })
          }
        },
        {
          text: 'View Source',
          icon: <CodeIcon />,
          onClick: () => {
            window.open('https://github.com/GHWang28/tic-tac-toe-capture', '_blank')?.focus();
          }
        }
      ]
    },
    {
      title: 'Spotter',
      date: '(30/11/2022)',
      type: new Set<IconTypes>(['Game', 'Personal Project', 'React', 'JavaScript', 'Firebase']),
      imgs: [
        '/images/covers/spotter.webp'
      ],
      body: [
        'Players must locate your character before the time runs out.',
        'Single player game.',
        'As they progress through the game, the levels will become increasingly challenging.',
        'Player scores are saved to locally, with the option to post their scores onto a public scoreboard.'
      ],
      buttons: [
        {
          text: 'Play Game',
          icon: <GameControllerIcon />,
          onClick: () => {
            navigate('showcase/spotter', { state: { prevLocation: location.pathname } })
          }
        },
        {
          text: 'View Source',
          icon: <CodeIcon />,
          onClick: () => {
            window.open('https://github.com/GHWang28/spotter', '_blank')?.focus();
          }
        }
      ]
    },
    {
      title: 'Xeno & Yova',
      date: '(21/9/2019)',
      type: new Set<IconTypes>(['Game', 'Personal Project']),
      imgs: [
        '/images/covers/xny.webp'
      ],
      body: [
        'Small puzzle game created with the RPG Maker MV Engine.',
        'Single player game.',
        'Control two characters simultaneously to solve a series of puzzles.'
      ],
      buttons: [
        {
          text: 'Play Game',
          icon: <GameControllerIcon />,
          onClick: () => {
            navigate('showcase/Xeno-and-Yova', { state: { prevLocation: location.pathname } })
          }
        },
        {
          text: 'View Source',
          icon: <CodeIcon />,
          onClick: () => {
            window.open('https://github.com/GHWang28/xeno-and-yova', '_blank')?.focus();
          }
        }
      ]
    },
    {
      title: 'Slackr',
      date: '(24/10/2022)',
      type: new Set<IconTypes>(['Frontend', 'University Project', 'JavaScript']),
      imgs: [
        '/images/comp6080/slackr-cover.webp'
      ],
      body: [
        <Fragment>
          {'Slackr Assignment work at COMP6080 '}
          <Box component='span' sx={{ color: 'yellow.main' }}>
            {'UNSW'}
          </Box>
          {'.'}
        </Fragment>,
        'A messaging website that has many features included.',
        <Fragment>
          {'Made entirely using '}
          <Box component='span' sx={{ color: 'green.main' }}>
            {'JavaScript'}
          </Box>
          {', DOM manipulations and the Bootstrap Framework.'}
        </Fragment>,
        dotpoint100Percent
      ],
      buttons: [
        {
          text: 'View Project',
          icon: <VisibilityIcon />,
          onClick: () => {
            navigate('slackr', { state: { prevLocation: location.pathname } })
          }
        },
        {
          text: 'View Source',
          icon: <CodeIcon />,
          disabled: 'Source Code can not be publicly shared.'
        }
      ]
    },
    {
      title: 'Minecraft Screensaver (Unofficial)',
      date: '(20/9/2021)',
      type: new Set<IconTypes>(['OpenGL', 'University Project', 'C++']),
      imgs: [
        '/images/minecraft-recreation/screensaver.webm'
      ],
      body: [
        'Based on Mojang\'s Minecraft.',
        'A simple interactable screensaver that randomly generates the scenery on a 2D plane.',
        <Fragment>
          {'Created entirely from '}
          <Box component='span' sx={{ color: 'green.main' }}>
            {'OpenGL'}
          </Box>
          {' and '}
          <Box component='span' sx={{ color: 'green.main' }}>
            {'C++'}
          </Box>
          {'.'}
        </Fragment>,
        'Showcases application of textures, drawing 2D shapes and shaders.',
        dotpoint100Percent
      ],
      buttons: [
        {
          text: 'View Project',
          icon: <VisibilityIcon />,
          onClick: () => {
            navigate('minecraft-screensaver', { state: { prevLocation: location.pathname } })
          }
        },
        {
          text: 'View Source',
          icon: <CodeIcon />,
          disabled: 'Source Code can not be publicly shared.'
        }
      ]
    },
    {
      title: 'Nutritious AirBnB',
      date: '(18/11/2022)',
      type: new Set<IconTypes>(['Frontend', 'University Project', 'JavaScript', 'React']),
      imgs: [
        '/images/comp6080/airbnb-cover.webp'
      ],
      body: [
        <Fragment>
          {'AirBnB Assignment work at COMP6080 '}
          <Box component='span' sx={{ color: 'yellow.main' }}>
            {'UNSW'}
          </Box>
          {'.'}
        </Fragment>,
        'An online marketplace website dedicated to connecting property owners with potential renters while facilitating the rental process for both parties.',
        <Fragment>
          {'Made using '}
          <Box component='span' sx={{ color: 'green.main' }}>
            {'React'}
          </Box>
          {' and Material UI.'}
        </Fragment>,
        dotpoint100Percent
      ],
      buttons: [
        {
          text: 'View Project',
          icon: <VisibilityIcon />,
          onClick: () => {
            navigate('airbnb', { state: { prevLocation: location.pathname } })
          }
        },
        {
          text: 'View Source',
          icon: <CodeIcon />,
          disabled: 'Source Code can not be publicly shared.'
        }
      ]
    },
    {
      title: 'Minesweeper Recreation',
      date: '(22/12/2022)',
      type: new Set<IconTypes>(['Game', 'Personal Project', 'React', 'JavaScript']),
      imgs: [
        '/images/covers/minesweeper.webm'
      ],
      body: [
        'Based on the classic Minesweeper game popularised by Microsoft.',
        'Single player game.',
        'Player gets to decide how many mines and the dimension of their grid to play with.',
        'Player scores are saved locally.',
        'Includes unique visuals and animations.',
      ],
      buttons: [
        {
          text: 'Play Game',
          icon: <GameControllerIcon />,
          onClick: () => {
            navigate('showcase/minesweeper', { state: { prevLocation: location.pathname } })
          }
        },
        {
          text: 'View Source',
          icon: <CodeIcon />,
          onClick: () => {
            window.open('https://github.com/GHWang28/minesweeper', '_blank')?.focus();
          }
        }
      ]
    },
    {
      title: 'Convo',
      date: '(03/01/2023) (Work in Progress)',
      type: new Set<IconTypes>(['Personal Project', 'React', 'JavaScript', 'Firebase', 'Frontend']),
      imgs: [
        '/images/covers/convo.webp'
      ],
      body: [
        'A passion project that I work on in my spare time.',
        'A messaging applet that allows users to create private/public channels to communicate with others in real-time.',
        <Fragment>
          {'Frontend created with '}
          <Box component='span' sx={{ color: 'green.main' }}>
            {'React'}
          </Box>
          {' and '}
          <Box component='span' sx={{ color: 'green.main' }}>
            {'JavaScript'}
          </Box>
          {'.'}
        </Fragment>,
        <Fragment>
          {'Backend managed with '}
          <Box component='span' sx={{ color: 'green.main' }}>
            {'Firebase'}
          </Box>
          {'.'}
        </Fragment>,
        'Currently has a plethora of features, including channel creation, channel customisation, infinite scrolling, image sharing and messages that can be edited and reacted to.',
        'More features are planned.'
      ],
      buttons: [
        {
          text: 'View Live',
          icon: <GameControllerIcon />,
          onClick: () => {
            window.open('https://convo-ghwang28.netlify.app/', '_blank')?.focus();
          }
        },
        {
          text: 'View Source',
          icon: <CodeIcon />,
          onClick: () => {
            window.open('https://github.com/GHWang28/convo', '_blank')?.focus();
          }
        }
      ]
    }
  ]

  return projects.sort((a, b) => a.title.localeCompare(b.title));
} 

export default generateProjects;
