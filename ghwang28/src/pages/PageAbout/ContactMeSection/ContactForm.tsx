import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Alert, Button, LinearProgress, Snackbar, styled } from '@mui/material';
import Box from '@mui/material/Box';
import generateEmailJSPackage from './emailjsData';
import { useInView } from 'react-intersection-observer';

enum Response {
  SUCCESS,
  FAIL,
  DEFAULT
}

const ContactForm = () => {
  const [ref, inView] = useInView({
    rootMargin: '9999999px 0px 0px 0px'
  });

  const [senderName, setSenderName] = useState<string>('');
  const [senderEmail, setSenderEmail] = useState<string>('');
  const [mailContent, setMailContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [sent, setSent] = useState<Response>(Response.DEFAULT);
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleToastClose = () => { setShowToast(false) }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    handleToastClose();

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: generateEmailJSPackage(senderName || 'Anonymous', senderEmail || 'anon@anon.com', mailContent)
    }).then((res) => {
      // Check that the response was fine
      setSent((res.ok) ? Response.SUCCESS : Response.FAIL);
    }).catch(() => {
      // Catch any errors
      setSent(Response.FAIL);
    }).finally(() => {
      // Remove loading state and set the toast to true
      setLoading(false);
      setShowToast(true);
    })
  }

  return (
    <Box ref={ref} style={{ opacity: (inView) ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }} onSubmit={onSubmit} component='form' sx={{ width: '900px', maxWidth: '95%', display: 'flex', flexDirection: 'column' }} mx='auto' my={5}>
      <LinearProgress variant={(loading) ? 'indeterminate' : 'determinate'} value={0}/>
      <ContactFormTextField
        sx={{ borderBottom: '1px solid black' }}
        type='text'
        variant='filled'
        label='Your preferred name'
        placeholder='John Doe'
        InputProps={{ disableUnderline: true }}
        onChange={(e) => { setSenderName(e.target.value) }}
        fullWidth
      />
      <ContactFormTextField
        sx={{ mb: 1 }}
        type='email'
        variant='filled'
        label='Your e-mail'
        placeholder='johndoe@mail.com'
        InputProps={{ disableUnderline: true }}
        onChange={(e) => { setSenderEmail(e.target.value) }}
        fullWidth
      />
      <ContactFormTextField
        type='text'
        sx={{ my: 1 }}
        variant='filled'
        label='Mail Content'
        fullWidth
        multiline
        minRows={5}
        required
        placeholder='Can we keep in touch?'
        InputProps={{ disableUnderline: true }}
        onChange={(e) => { setMailContent(e.target.value) }}
        helperText={'* marked fields are required.'}
      />
      <Button disabled={loading} type='submit' variant='contained' sx={{ mx: 'auto' }}>
        {'Submit'}
      </Button>
      {/* Snackbar */}
      <Snackbar
        open={showToast}
        autoHideDuration={5000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleToastClose} severity={sent === Response.SUCCESS ? 'success' : 'error'} sx={{ width: '100%' }}>
          {(sent === Response.SUCCESS) ? (
            'Email sent! Thank you for getting in contact!'
          ) : (
            'Something went wrong. If problem persists, please try through your Email Service Provider!'
          )}
        </Alert>
      </Snackbar>
    </Box>
  );
}

const ContactFormTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.contrastColor.main,
    fontWeight: 'bold'
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.contrastColor.main,
    opacity: 0.6,
    textDecoration: 'underline',
    fontWeight: 'bold'
  },
  '& .MuiInputBase-root': {
    borderRadius: '0px',
    backgroundColor: (theme.palette.mode === 'light') ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
    '&:hover': {
      backgroundColor: (theme.palette.mode === 'light') ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)',
    }
  },
  '& .MuiInputBase-root.Mui-focused': {
    backgroundColor: (theme.palette.mode === 'light') ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
  },
  '& .MuiFormHelperText-root': {
    color: theme.palette.contrastColor.main,
    fontWeight: 'bold'
  }
}))

export default ContactForm;
