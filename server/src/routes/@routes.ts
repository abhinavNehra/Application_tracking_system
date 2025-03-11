import { Hono } from "hono";

import Auth from './auth.js'
import User from './user.js'

const app = new Hono();

app.route('/auth', Auth)
app.route('/user', User)


export default app;