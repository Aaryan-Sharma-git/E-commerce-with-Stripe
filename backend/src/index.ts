import "dotenv/config";  // Loads .env from root
import app from "./app.js";

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
