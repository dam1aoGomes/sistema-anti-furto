import { z } from 'zod';

export const createEquipmentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.string().min(1, 'Tipo é obrigatório'),
  location: z.string().min(1, 'Localização é obrigatória'),
  rfid: z.string().min(1, 'RFID é obrigatório'),
  responsible: z.string().optional().or(z.literal('')), // permite string vazia também
});

export const alertOutRangeSchema = z.object({
  rfid: z.string().min(1, 'RFID é obrigatório')
});

export const findByIdSchema = z.object({
  id: z.string()
    .transform((val) => Number(val)) // transforma em número
    .refine((val) => !isNaN(val), { message: 'ID inválido: deve ser um número' }),
})