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
  weekDays: yup
    .array()
    .of(
      yup
        .number()
        .required()
        .integer('Cada dia da semana deve ser um número inteiro.')
        .min(0, 'Cada dia da semana deve ser um número inteiro de 0 a 6.')
        .max(6, 'Cada dia da semana deve ser um número inteiro de 0 a 6.')
        .typeError('Cada dia da semana deve ser um número inteiro de 0 a 6.'),
    )
    .required('Selecione pelo menos um dia da semana')
    .min(1, 'Selecione pelo menos um dia da semana.')
    .typeError('Selecione pelo menos um dia da semana.'),
});
