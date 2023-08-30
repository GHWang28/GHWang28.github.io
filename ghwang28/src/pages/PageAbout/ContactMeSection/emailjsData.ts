const generateEmailJSPackage = (senderName: string, senderEmail: string, mailContent: string) => JSON.stringify({
  service_id: 'portfolio_contact',
  template_id: 'portfolio_template',
  user_id: 'M7U9pILuqj7qs-rZu',
  template_params: {
    senderName, senderEmail, mailContent
  }
})

export default generateEmailJSPackage;
