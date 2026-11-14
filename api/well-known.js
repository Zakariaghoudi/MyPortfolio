export default function handler(req, res) {
  res.status(404).setHeader("Content-Type", "text/plain");
  res.send("Not found");
}
