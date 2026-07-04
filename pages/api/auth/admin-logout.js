export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  res.setHeader(
    "Set-Cookie",
    "adminToken=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0"
  );

  return res.status(200).json({ success: true, message: "خروج با موفقیت انجام شد" });
}
