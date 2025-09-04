import prisma from "./prisma";

export interface NotificationData {
  artistId: string;
  subject: string;
  content: string;
}

export async function sendNotificationToSubscribers(data: NotificationData) {
  try {
    const subscribers = await prisma.subscription.findMany({
      where: { artistId: data.artistId },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    const emails = subscribers.map(sub => sub.user.email);

    // TODO: Implement actual email sending here
    // For now, we'll just log the notification
    console.log("Sending notification to subscribers:", {
      artistId: data.artistId,
      subject: data.subject,
      subscriberCount: emails.length,
      emails: emails,
    });

    // In production, you would integrate with an email service like:
    // - SendGrid
    // - AWS SES
    // - Resend
    // - Postmark
    // etc.

    return {
      success: true,
      recipientCount: emails.length,
    };
  } catch (error) {
    console.error("Failed to send notifications:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}