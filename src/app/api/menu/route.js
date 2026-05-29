import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const menuItems = await sql`
      SELECT * FROM menu_items 
      ORDER BY category, name ASC
    `;

    // Group by category
    const categories = [...new Set(menuItems.map((item) => item.category))];
    const groupedMenu = categories.map((category) => ({
      category,
      items: menuItems.filter((item) => item.category === category),
    }));

    return Response.json({ groupedMenu, allItems: menuItems });
  } catch (error) {
    console.error("Error fetching menu:", error);
    return Response.json({ error: "Failed to fetch menu" }, { status: 500 });
  }
}
