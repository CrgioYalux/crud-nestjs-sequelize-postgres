export const Config = () => ({
    DB: {
        NAME: process.env.DB_NAME,
        HOST: process.env.DB_HOST,
        PORT: parseInt(process.env.DB_PORT ?? "5432", 10),
        USER: {
            NAME: process.env.DB_USER_NAME,
            PASS: process.env.DB_USER_PASS
        }
    }
})