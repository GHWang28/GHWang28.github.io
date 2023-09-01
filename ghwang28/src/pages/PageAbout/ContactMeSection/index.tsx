import React, { forwardRef } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import MailIcon from '@mui/icons-material/Mail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import ContactMeIcon from './ContactMeIcon';
import { ContactData } from '../../../types';
import ContactForm from './ContactForm';

const ContactMeSection = forwardRef<HTMLDivElement>((_, ref) => {
  const [inViewRef, inView] = useInView({
    rootMargin: '9999999px 0px 0px 0px'
  });

  const contacts: ContactData[] = [
    {
      label: 'E-mail',
      info: 'gordon.wang280801@gmail.com',
      extraInfo: 'Copied E-mail to Clipboard!',
      icon: <MailIcon fontSize='large' />,
      onClick: () => {
        navigator.clipboard.writeText('gordon.wang280801@gmail.com');
      },
      tooltip: 'Copy E-mail Address to Clipboard',
    },
    {
      label: 'LinkedIn',
      icon: <LinkedInIcon fontSize='large' />,
      onClick: () => {
        window?.open('https://www.linkedin.com/in/gordon-wang-6b9403232', '_blank')?.focus();
      },
      tooltip: 'Go to my LinkedIn'
    },
    {
      label: 'GitHub',
      info: 'github.com/GHWang28',
      icon: <GitHubIcon fontSize='large' />,
      onClick: () => {
        window?.open('https://github.com/GHWang28', '_blank')?.focus();
      },
      tooltip: 'Go to my GitHub'
    },
  ]

  return (
    <Box
      ref={inViewRef}
      sx={{
        opacity: (inView) ? '1' : '0',
        transition: 'translate 0.5s ease-in-out, opacity 0.5s ease-in-out',
      }}
    >
      <Typography ref={ref} mt={5} variant='h4' fontWeight='bold' align='center'>
        {'Want to get in touch?'}
      </Typography>
      <Typography mb={5} variant='subtitle1' fontWeight='bold' align='center' color='text.secondary'>
        {'Contact me through these...'}
      </Typography>

      <Grid container rowSpacing={2} justifyContent='center'>
        {contacts.map((contact, index) => (
          <Grid item key={`contact-${index}`} xs={12} sm={(6 / contacts.length)}>
            <ContactMeIcon contact={contact} />
          </Grid>
        ))}
      </Grid>

      <Typography mt={5} variant='subtitle1' fontWeight='bold' align='center' color='text.secondary'>
        {'...or fill out this form if you wish to stay anonymous.'}
      </Typography>

      <ContactForm />
    </Box>
  )
});

export default ContactMeSection;
