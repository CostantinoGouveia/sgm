// src/controllers/AlertarouboController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAlertasRoubo = async (req: Request, res: Response): Promise<void> => {
    const alertasRoubo = await prisma.alertaroubo.findMany({
        include: {
            automobilista: true,
            tiporoubo: true,
            viatura: true
        }
    });
    res.status(200).json(alertasRoubo);
};

export const getAlertaRouboById = async (req: Request, res: Response): Promise<void> => {
    const alertaRoubo = await prisma.alertaroubo.findUnique({
        where: { codAlertaRoubo: Number(req.params.id) },
        include: {
            automobilista: true,
            tiporoubo: true,
            viatura: true
        }
    });

    if (alertaRoubo) {
        res.status(200).json(alertaRoubo);
    } else {
        res.status(404).json({ message: 'Alerta de roubo não encontrado' });
    }
};

export const createAlertaRoubo = async (req: Request, res: Response): Promise<void> => {
    const { codAutomobilista, codViatura, dataRoubo, enderecoRoubo, codTipoRoubo, descRoubo } = req.body;
    const newAlertaRoubo = await prisma.alertaroubo.create({
        data: {
            codAutomobilista,
            codViatura,
            dataRoubo,
            enderecoRoubo,
            codTipoRoubo,
            descRoubo
        }
    });
    res.status(201).json(newAlertaRoubo);
};

export const updateAlertaRoubo = async (req: Request, res: Response): Promise<void> => {
    const { codAutomobilista, codViatura, dataRoubo, enderecoRoubo, codTipoRoubo, descRoubo } = req.body;
    const updatedAlertaRoubo = await prisma.alertaroubo.update({
        where: { codAlertaRoubo: Number(req.params.id) },
        data: {
            codAutomobilista,
            codViatura,
            dataRoubo,
            enderecoRoubo,
            codTipoRoubo,
            descRoubo
        }
    });
    res.status(200).json(updatedAlertaRoubo);
};

export const deleteAlertaRoubo = async (req: Request, res: Response): Promise<void> => {
    try {
        await prisma.alertaroubo.delete({ where: { codAlertaRoubo: Number(req.params.id) } });
        res.status(200).json({ message: 'Alerta de roubo deletado' });
    } catch (error) {
        res.status(404).json({ message: 'Alerta de roubo não encontrado' });
    }
};
