import React from 'react';
import { Link } from "@mui/material";
import { Fragment } from "react";
import PaletteIcon from '@mui/icons-material/Palette';
import GameControllerIcon from '@mui/icons-material/SportsEsports';
import CodeIcon from '@mui/icons-material/Code';

const generateProjects = (navigate) => {
  return [
    {
      title: 'Earth\'s Ephemeris',
      date: '(25/12/2018) → (28/08/2019)',
      type: 'Artwork',
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
      title: 'Tic-Tac-Toe: Capture',
      date: '(28/11/2022)',
      type: 'Game',
      imgs: [
        '/images/tictactoe-capture/cover.jpg'
      ],
      body: [
        'Recreation of Tic Tac Toe with a twist.',
        'Two-player game',
        'Negate your opponent\'s move with the right strategy.',
        'Features options to reset game or undo previous move.'
      ],
      buttons: [
        {
          text: 'Play Game',
          icon: <GameControllerIcon />,
          onClick: () => {
            navigate('tic-tac-toe-capture')
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
    }
  ]
} 

export default generateProjects;
