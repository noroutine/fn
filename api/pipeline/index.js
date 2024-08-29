function domainFromEmail(email) {
  const match = email.match(/@([^@]+)$/);
  return match ? match[1].toLowerCase() : null;
}

export function index(req, res) {
  if (req.body.session) {
    let counter = domainFromEmail(req.body.session.envelope.mailFrom.address)
    console.log(`Running pipeline for ${counter}`)
    const startTime = performance.now();
    let responseStatus;

    fetch(`https://nrtn.me/${counter}`)
      .then(response => {
        responseStatus = response.status;
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`Status code: ${responseStatus || 'N/A'}, Request duration: ${duration.toFixed(2)} ms`);
      });

  }
  res.json({ 'status': 'ok' });
}