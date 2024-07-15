// src/controllers/MultaController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMultas = async (req: Request, res: Response): Promise<void> => {
    try {
        const multas = await prisma.multa.findMany({
            include: {
                automobilista: true,
                viatura: true,
                pagamentomulta: true,
                infracao_infracao_codMultaTomulta: true,
                infracao_multa_codInfracaoToinfracao: true,
            },
        });
        res.status(200).json(multas);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar as multas' });
    }
};

export const getMultaById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const multa = await prisma.multa.findUnique({
            where: { codMulta: Number(id) },
            include: {
                automobilista: true,
                viatura: true,
                pagamentomulta: true,
                infracao_infracao_codMultaTomulta: true,
                infracao_multa_codInfracaoToinfracao: true,
            },
        });

        if (multa) {
            res.status(200).json(multa);
        } else {
            res.status(404).json({ message: 'Multa não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível buscar a multa' });
    }
};

export const createMulta = async (req: Request, res: Response): Promise<void> => {
    const {
        codAutomobilista,
        codViatura,
        codInfracao,
        valorMulta,
        estadoMulta,
    } = req.body;

    try {
        const newMulta = await prisma.multa.create({
            data: {
                codAutomobilista: codAutomobilista ? Number(codAutomobilista) : undefined,
                CodViatura: codViatura ? Number(codViatura) : undefined,
                codInfracao,
                valorMulta,
                estadoMulta,
            },
            include: {
                automobilista: true,
                viatura: true,
                pagamentomulta: true,
                infracao_infracao_codMultaTomulta: true,
                infracao_multa_codInfracaoToinfracao: true,
            },
        });
        res.status(201).json(newMulta);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível criar a multa' });
    }
};

export const updateMulta = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const {
        codAutomobilista,
        codViatura,
        codInfracao,
        valorMulta,
        estadoMulta,
    } = req.body;

    try {
        const updatedMulta = await prisma.multa.update({
            where: { codMulta: Number(id) },
            data: {
                codAutomobilista: codAutomobilista ? Number(codAutomobilista) : undefined,
                CodViatura: codViatura ? Number(codViatura) : undefined,
                codInfracao,
                valorMulta,
                estadoMulta,
            },
            include: {
                automobilista: true,
                viatura: true,
                pagamentomulta: true,
                infracao_infracao_codMultaTomulta: true,
                infracao_multa_codInfracaoToinfracao: true,
            },
        });
        res.status(200).json(updatedMulta);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar a multa' });
    }
};

export const deleteMulta = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.multa.delete({
            where: { codMulta: Number(id) },
        });
        res.status(200).json({ message: 'Multa deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar a multa' });
    }
};
