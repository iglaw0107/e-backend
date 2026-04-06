const app = require('./app');
require('dotenv').config();
const connectDB = require('./config/db');


const PORT=process.env.PORT || 3000; 

// connectDB();

// app.listen(PORT , () => {
//     console.log(` Server running on http://localhost:${PORT}`);
// })


const startServer = async () => {
    try{
        await connectDB();
        app.listen(PORT , () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }catch(error){
        console.error('Failed to start the server', error.message);
        process.exit(1);
    }
};


startServer();


