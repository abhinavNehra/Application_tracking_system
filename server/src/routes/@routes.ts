import { Hono } from "hono";

import Auth from './auth.ts'
import User from './user.ts'

const app = new Hono();

app.route('/auth', Auth)
app.route('/user', User)


export default app;