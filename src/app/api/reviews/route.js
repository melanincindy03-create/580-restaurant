import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const reviews = await sql`
      SELECT * FROM reviews
      WHERE is_published = true
      ORDER BY created_at DESC
    `;
    return Response.json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
