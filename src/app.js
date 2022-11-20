import usuario from "./route/usuario.route.js";
import app from "./config/express.config.js";

app.use("/usuario", usuario);

export default app;