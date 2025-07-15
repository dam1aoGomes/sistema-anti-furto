import express from "express";
import authRouter from "./auth/auth.route";
import equipamentRouter from "./equipament/equipament.route";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use('/api',authRouter);

app.use('/api/equipament',equipamentRouter);

// Configuração básica (libera para qualquer origem)
app.use(cors())

//index route
app.get('/',(req,res)=>{
  res.json({
    message : 'Servidor Rodando'
  })
})

// Rotas inexistentes (404)
app.use((req, res) => {
  res.status(404).json({
    message: 'Rota não encontrada',
  });
});

// Tratamento global de erros
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Erro interno do servidor',
  });
});

export default app;