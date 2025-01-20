import dotenv from "dotenv";

dotenv.config();

const envViables = [
  "PORT",
  "URL",
  "SECRET",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_PORT",
  "SMTP_HOST",
];

//Check all the .env variables available or not

console.log("Checking all the environmental variables");

const validateEnv = () => {
  const missingEnvVariables = envViables.filter(
    (envVar) => !process.env[envVar]
  );
  if (missingEnvVariables?.length > 0) {
    console.log(
      `The following environmental variables are not set ${missingEnvVariables.join(
        ", "
      )}`
    );
    process.exit(1);
  } else {
    console.log("All set!");
  }
};

validateEnv();
