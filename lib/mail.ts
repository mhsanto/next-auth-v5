import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URI
// send a verification email
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink: string = `${domain}/auth/new-password?token=${token}`;
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email address",
    html: `<p><a href="${resetLink}"> Click Here</a><strong>to confirm it's you</strong>!</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email address",
    html: `<p><a href="${confirmLink}"> Click Here</a><strong>to confirm it's you</strong>!</p>`,
  });
};
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email address",
    html: `<p>Here is your Two Factor Code : ${token} </a><strong>to confirm it's you</strong>!</p>`,
  });
};
