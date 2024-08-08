import axios from 'axios';

export default function apiError(error: any): {
  data: null;
  ok: false;
  error: string;
} {
  if (axios.isAxiosError(error)) {
    // Erro específico do axios, que pode incluir a propriedade 'response'
    return {
      data: null,
      ok: false,
      error:
        error.response?.data?.message || 'Erro de rede ou resposta inválida',
    };
  } else if (error instanceof Error) {
    // Erro genérico do tipo Error
    return {
      data: null,
      ok: false,
      error: error.message || 'Erro desconhecido',
    };
  } else if (typeof error === 'string') {
    // Erro passado como string
    return { data: null, ok: false, error };
  } else {
    // Erro desconhecido
    return { data: null, ok: false, error: 'Erro desconhecido' };
  }
}
