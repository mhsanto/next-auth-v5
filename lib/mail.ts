import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// send a verification email
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink: string = `http://localhost:3000/auth/new-password?token=${token}`;
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email address",
    html: `<p><a href="${resetLink}"> Click Here</a><strong>to confirm it's you</strong>!</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
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
