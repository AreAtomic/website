'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type SendEmailResult = { success: true } | { success: false; error: string }

export async function sendEmail(formData: FormData): Promise<SendEmailResult> {
  try {
    const nom = formData.get('nom') as string
    const email = formData.get('email') as string
    const categorie = formData.get('categorie') as string
    const description = formData.get('description') as string

    await resend.emails.send({
      from: 'Contact <onboarding@resend.dev>',
      to: ['aureliensebe@gmail.com'],
      reply_to: email,
      subject: `[Contact] ${categorie} — ${nom}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0052CC;">Nouveau message de contact</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;"><strong>Nom</strong></td>
              <td style="padding: 8px 0;">${nom}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Email</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Catégorie</strong></td>
              <td style="padding: 8px 0;">${categorie}</td>
            </tr>
          </table>
          <h3 style="color: #1A1A1A; margin-top: 24px;">Description du projet</h3>
          <p style="color: #444; line-height: 1.6; white-space: pre-wrap;">${description}</p>
        </div>
      `,
    })

    return { success: true }
  } catch {
    return { success: false, error: "Erreur lors de l'envoi. Réessayez ou écrivez-moi directement." }
  }
}
