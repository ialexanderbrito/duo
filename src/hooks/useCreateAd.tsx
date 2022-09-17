import { useFormik } from 'formik';
import { adSchemaValidation } from 'validations/createAdValidation';

import { useToast } from 'contexts/Toast';

import { createAd } from 'services/post/ad';

export function useCreateAd() {
  const { toast } = useToast();
  const formCreateAd = useFormik({
    initialValues: {
      game: '',
      name: '',
      discord: '',
      yearsPlaying: '',
      weekDays: [],
      hourStart: '',
      hourEnd: '',
      voiceChannel: false,
    },
    validationSchema: adSchemaValidation,
    onSubmit: async (values) => {
      if (!values.hourStart || !values.hourEnd) {
        return toast.error('Selecione um horário');
      }

      if (values.hourStart >= values.hourEnd) {
        return toast.error('Selecione um horário válido');
      }

      const payload = {
        name: values.name,
        discord: values.discord,
        yearsPlaying: Number(values.yearsPlaying),
        weekDays: values.weekDays.map(Number),
        hourStart: values.hourStart,
        hourEnd: values.hourEnd,
        useVoiceChannel: values.voiceChannel,
      };

      try {
        await createAd(payload, values.game);

        toast.success('Anúncio criado com sucesso');
      } catch (error) {
        toast.error('Erro ao criar anúncio');
      }
    },
  });

  return {
    formCreateAd,
  };
}
