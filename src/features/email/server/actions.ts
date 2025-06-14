"use server";

import React from "react";
import { Resend } from "resend";

type TSendEmailProps = {
  to: string;
  subject: string;
  react: React.JSX.Element | null;
};

export async function sendEmail({ to, subject, react }: TSendEmailProps) {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  console.log("props-send-email", { to, subject, apikey: process.env.RESEND_API_KEY! });

  try {
    const data = await resend.emails.send({
      from: "Centsense Finance <onboarding@resend.dev>",
      to: "arkajitroy11@gmail.com",
      subject,
      react,
    });

    console.log("debug-success:", data);

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
