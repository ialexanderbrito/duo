import * as yup from 'yup';

export const adSchemaValidation = yup.object({
  game: yup.string().required('Selecione um jogo'),
  name: yup.string().required('Digite seu nome'),
  discord: yup
    .string()
    .required('Digite seu discord')
    .matches(
      /^[a-zA-Z0-9_]{3,32}#[0-9]{4}$/,
      'Digite um discord válido (ex: user#1234)',
    ),
  yearsPlaying: yup.number().required('Digite quantos anos joga'),
});
