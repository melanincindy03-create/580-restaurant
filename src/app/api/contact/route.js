import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [msg] = await sql`
      INSERT INTO contact_messages (name, email, phone, message)
      VALUES (${name}, ${email}, ${phone || ""}, ${message})
      RETURNING id, created_at
    `;

    return Response.json({ success: true, id: msg.id });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return Response.json({ error: "Failed to send message" }, { status: 500 });
  }
}
