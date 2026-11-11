import 'reflect-metadata'
import express from 'express';
import cors from 'cors';
import { createEnvs } from '@/config';
import * as router from '@/routers'
import { errorHandler } from '@/middlewares';
createEnvs()

const routerValues = Object.values(router);

const app = express()
    app.use(express.json())
    app.use(cors())
    app.get("/health", (_req, res) => res.send("OK!"))
    app.use(routerValues)
    app.use(errorHandler)




export default app;