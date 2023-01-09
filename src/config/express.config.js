import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from 'url';
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import jsonwebtoken from 'jsonwebtoken';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../public'));
app.use( express.static( path.join(__dirname, '../../public/assets')));

app.use(morgan(':method :url :status :token :res[content-length] - :response-time ms'));

morgan.token('token', function(req, res, param) {
    const jwt = req.cookies && req.cookies.token || false;
    if (!jwt) {
        return "no-auth";
    } 
    const user =  jsonwebtoken.decode( jwt, process.env.JWT_TOKEN)
    return `userid:${user.userId} permission: ${user.permissionId}` ;
});

app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;