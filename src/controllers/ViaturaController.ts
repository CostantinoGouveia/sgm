// src/controllers/ViaturaController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getViaturas = async (req: Request, res: Response): Promise<void> => {
    try {
        const viaturas = await prisma.viatura.findMany({
            include: {
                alertaroubo: true,
                livrete: true,
                multa: true,
                titulopropriedade: true,
            },
        });
        res.status(200).json(viaturas);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar as viaturas' });
    }
};

export const getViaturaById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const viatura = await prisma.viatura.findUnique({
            where: { codViatura: Number(id) },
            include: {
                alertaroubo: true,
                livrete: true,
                multa: true,
                titulopropriedade: true,
            },
        });

        if (viatura) {
            res.status(200).json(viatura);
        } else {
            res.status(404).json({ message: 'Viatura não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar a viatura' });
    }
};

export const createViatura = async (req: Request, res: Response): Promise<void> => {
    const { numeroMatricula } = req.body;

    try {
        const newViatura = await prisma.viatura.create({
            data: {
                numeroMatricula,
            },
            include: {
                alertaroubo: true,
                livrete: true,
                multa: true,
                titulopropriedade: true,
            },
        });
        res.status(201).json(newViatura);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível criar a viatura' });
    }
};

export const updateViatura = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { numeroMatricula } = req.body;

    try {
        const updatedViatura = await prisma.viatura.update({
            where: { codViatura: Number(id) },
            data: {
                numeroMatricula,
            },
            include: {
                alertaroubo: true,
                livrete: true,
                multa: true,
                titulopropriedade: true,
            },
        });
        res.status(200).json(updatedViatura);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar a viatura' });
    }
};

export const deleteViatura = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.viatura.delete({
            where: { codViatura: Number(id) },
        });
        res.status(200).json({ message: 'Viatura deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar a viatura' });
    }
};
