import dotenv from 'dotenv';
import app from './app';
// import connectToDB from './utils/db'

dotenv.config()

const PORT = process.env.PORT || 3000;

// connectToDB();

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
