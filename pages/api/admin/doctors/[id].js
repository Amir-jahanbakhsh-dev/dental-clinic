import dbConnect from "@/lib/mongodb";
import Doctor from "@/models/Doctor";

export default async function handler(req, res) {
  await dbConnect();
  const { method, query: { id } } = req;

  switch (method) {
    case 'PUT': // ویرایش پزشک
      try {
        const doctor = await Doctor.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!doctor) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, data: doctor });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE': // حذف پزشک
      try {
        const deletedDoctor = await Doctor.findByIdAndDelete(id);
        if (!deletedDoctor) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(405).json({ success: false });
      break;
  }
}
