export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  resend: process.env.RESEND,
  database: {
    type: 'postgres',
    host: process.env.DATA_BASE_HOST,
    port: parseInt(process.env.DATA_BASE_PORT, 10) || 5432,
    username: process.env.DATA_BASE_USERNAME,
    password: process.env.DATA_BASE_HOST_PASSWORD,
    database: process.env.DATA_BASE_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    /* ssl: {
      rejectUnauthorized: false,
    }, */
  },
});
