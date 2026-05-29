import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      reservation_date,
      reservation_time,
      guests,
      special_requests,
    } = await request.json();

    if (!customer_name || !reservation_date || !reservation_time || !guests) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const [reservation] = await sql`
      INSERT INTO reservations (customer_name, customer_email, customer_phone, reservation_date, reservation_time, guests, special_requests)
      VALUES (${customer_name}, ${customer_email}, ${customer_phone}, ${reservation_date}, ${reservation_time}, ${guests}, ${special_requests})
      RETURNING *
    `;

    return Response.json({ success: true, reservation });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return Response.json(
      { error: "Failed to create reservation" },
      { status: 500 },
    );
  }
}
