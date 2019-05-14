export const getEnv = value => {
  return process.env[value]
}

export const corsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: getEnv('API_URL'),
  preflightContinue: false
};


