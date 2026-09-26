const requiredEnvVariables = [
    "MONGO_URI",
    "JWT_SECRET",
];

for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
        console.error(`Missing environment variable: ${variable}`);
        process.exit(1);
    }
}