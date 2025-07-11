import prisma from "../prisma-client/prisma"
import { sendAlertEmail } from "../utils/sendEmail";
import { EquipmentFilters } from "../schema/equipament.schema";
import { Prisma } from '@prisma/client';

async function findAll(filters: EquipmentFilters) {
  const { whereName, type, location, responsible, inRange, page = 1, limit = 10, } = filters;

  const where = {
    ...(whereName && {
      name: {
        contains: whereName,
        mode: Prisma.QueryMode.insensitive,
      },
    }),
    ...(type && {
      type: {
        contains: type,
        mode: Prisma.QueryMode.insensitive,
      },
    }),
    ...(location && {
      location: {
        contains: location,
        mode: Prisma.QueryMode.insensitive,
      },
    }),
    ...(responsible && {
      responsible: {
        contains: responsible,
        mode: Prisma.QueryMode.insensitive,
      },
    }),
    ...(typeof inRange === 'boolean' && {
      isInRange: inRange,
    }),
  };

  const [data, total] = await Promise.all([
    prisma.equipment.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.equipment.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

async function findById(id: number) {
  const equipament = await prisma.equipment.findUnique({
    where: {
      id: id
    }
  });
  return equipament;
}

async function findByRFID(rfid: string) {
  const equipament = await prisma.equipment.findUnique({
    where: {
      rfid: rfid
    }
  });
  return equipament;
}

async function create(name: string, type: string, location: string, rfid: string, responsible: string) {
  const equipament = await prisma.equipment.create({
    data: {
      name: name,
      type: type,
      location: location,
      rfid: rfid,
      responsible: responsible
    }
  });
  return equipament;
}

async function alertOutRange(rfid: string) {
  const equipment = await prisma.equipment.findUnique({ where: { rfid } });
  if (!equipment) {
    return equipment;
  }
  // Marcar como fora do alcance
  await prisma.equipment.update({
    where: { rfid },
    data: { isInRange: false },
  });
  // send email
  await sendAlertEmail("damiao28.contato@gmail.com", equipment.name);
}

export const equipamentService = {
  findAll,
  findById,
  findByRFID,
  create,
  alertOutRange
}