# Email Functionality Setup Guide

This portfolio uses **Netlify Functions** to handle contact form submissions via email.

## Setup Instructions

### 1. Gmail App Password

The contact form uses Gmail to send emails. You need to generate a Gmail App Password:

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (enable if not already enabled)
3. Scroll down to **App passwords**: https://myaccount.google.com/apppasswords
4. Select **Mail** and **Other (Custom name)**, enter "Portfolio Contact Form"
5. Click **Generate** and copy the 16-character password

### 2. Local Development

For local testing with Netlify CLI:

```bash
# Install Netlify CLI globally (if not already installed)
npm install -g netlify-cli

# Create .env file from example
cp .env.example .env

# Add your credentials to .env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password

# Start local development server with Netlify Functions
netlify dev
```

This will start your app on `http://localhost:8888` with Netlify Functions available.

### 3. Netlify Deployment

#### Set Environment Variables on Netlify:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail App Password

#### Deploy:

```bash
# Build and deploy
npm run build

# Or push to your connected Git repository
git add .
git commit -m "Add Netlify Functions for contact form"
git push
```

Netlify will automatically detect the `netlify.toml` configuration and deploy your functions.

## How It Works

1. **User submits contact form** → Form data is sent to `/.netlify/functions/contact`
2. **Netlify Function processes request** → Validates data and sends email via Nodemailer
3. **Email sent to** → `pvenkatraman1400@gmail.com`
4. **User receives confirmation** → Success or error message displayed

## File Structure

```
Portfoliov2/
├── netlify/
│   └── functions/
│       └── contact.ts          # Serverless function for email
├── src/
│   └── components/
│       └── Contact.tsx          # Contact form component
├── netlify.toml                 # Netlify configuration
├── .env.example                 # Environment variables template
└── EMAIL_SETUP.md              # This file
```

## Troubleshooting

### "Failed to send email" error

1. **Check environment variables** are set correctly in Netlify dashboard
2. **Verify Gmail App Password** is valid (not your regular Gmail password)
3. **Check Netlify Function logs** in the Netlify dashboard under Functions tab
4. **Ensure 2-Step Verification** is enabled on your Google account

### Local development not working

1. Make sure you're using `netlify dev` instead of `npm run dev`
2. Verify `.env` file exists with correct variables
3. Check that `@netlify/functions` and `nodemailer` are installed

### Email not received

1. Check spam/junk folder
2. Verify recipient email (`pvenkatraman1400@gmail.com`) in `contact.ts:46`
3. Check Netlify Function logs for errors

## Security Notes

- ✅ Environment variables stored securely in Netlify
- ✅ `.env` file excluded from Git via `.gitignore`
- ✅ Input validation on both client and server
- ✅ Rate limiting handled by Netlify (free tier: 125k function invocations/month)

## Alternative Email Services

If you prefer a different email service, modify `netlify/functions/contact.ts`:

**SendGrid:**
```typescript
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
```

**Mailgun, Postmark, etc.** → Update transporter configuration accordingly.
