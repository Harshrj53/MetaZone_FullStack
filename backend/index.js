const http = require('http');
const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        // Sync models (force: false to avoid dropping tables)
        // await sequelize.sync({ alter: true }); 

        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();
