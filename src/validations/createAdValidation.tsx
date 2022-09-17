import * as yup from 'yup';

export const adSchemaValidation = yup.object({
  game: yup.string().required('Selecione um jogo'),
  name: yup.string().required('Digite seu nome'),
  discord: yup.string().required('Digite seu discord'),
  yearsPlaying: yup.number().required('Digite quantos anos joga'),
  weekDays: yup.array().required('Selecione os dias da semana'),
});
