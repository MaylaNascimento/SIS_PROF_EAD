import app from "./config/express.config.js";
import usuario from "./route/usuario.route.js";
import auth from "./route/autenticacao.route.js";
import inscricoes from "./route/inscricoes.route.js";

app.use("/usuario", usuario);
app.use("/auth", auth);
app.use("/inscricoes", inscricoes);
export default app;