const APP_ENV = process.env.APP_ENV;
const env = { api_url: "", internal_api_url: "" }
if (APP_ENV === "prod") {
  env.api_url = "https://api.im-neko.dev";
  env.internal_api_url = "https://api.im-neko.dev";
} else if(APP_ENV === "dev"){
  env.api_url = "http://localhost:3000";
  env.internal_api_url = "https://api.im-neko.dev";
} else {
  env.api_url = "https://api.im-neko.dev";
  env.internal_api_url = "https://api.im-neko.dev";
}

export default env;
