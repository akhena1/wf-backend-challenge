import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
app.use(morgan('tiny'));
app.use(helmet());

const port = process.env.PORT || 4568;

app.get('/ping', (req, res) => {
  return res.send('pongs');
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
