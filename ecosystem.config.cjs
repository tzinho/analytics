module.exports = {
  apps: [
    {
      name: "callcenter",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      env: {
        PORT: 3001,
        HOST: "0.0.0.0",
        NODE_ENV: "production",
        AUTH_SECRET: "Ee5wbYLK0Ed3PsETBbqnvVhGNcTULLKywSIFAxRNA+g=",
        AUTH_GOOGLE_ID: "AUTH_GOOGLE_ID",
        AUTH_GOOGLE_SECRET: "AUTH_GOOGLE_SECRET",
        DATABASE_URL:
          "sqlserver://54.233.226.110:1433;database=cal_mercatudo_cal;user=mercatudo;password=m0c@L8ws;trustServerCertificate=true;encrypt=true;",
        NEXT_PUBLIC_CHAT_ID: "b4e7d534-3f16-414c-9a62-f7479cc42ebc",
      },
    },
  ],
};
