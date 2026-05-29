import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      total_amount,
      order_type,
      address,
      items,
    } = await request.json();

    if (!customer_name || !customer_email || !items || items.length === 0) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const [order] = await sql`
      INSERT INTO orders (customer_name, customer_email, customer_phone, total_amount, order_type, address)
      VALUES (${customer_name}, ${customer_email}, ${customer_phone}, ${total_amount}, ${order_type}, ${address})
      RETURNING *
    `;

    // Insert order items
    const orderItemsQueries = items.map(
      (item) =>
        sql`INSERT INTO order_items (order_id, menu_item_id, quantity, price_at_time)
          VALUES (${order.id}, ${item.id}, ${item.quantity}, ${item.price})`,
    );

    await sql.transaction(orderItemsQueries);

    return Response.json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    return Response.json({ error: "Failed to create order" }, { status: 500 });
  }
}
