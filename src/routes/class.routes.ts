import { Router } from "express";
import { getRepository, Like } from "typeorm";
import Class from "../models/Class";

const classRouter = Router()

/**
 * Insere a classe
 */
classRouter.post('/', async (req, res) => {
    try {
        const data = await getRepository(Class).save(req.body);
        return res.status(201).json(data)
    } catch (error) {
        return new Error(`Erro ao tentar salvar classe: ${error.message}`)
    }

});

/**
 * consulta a lista de classes
 */
classRouter.get('/all', async (req, res) => {
    try {
        const data = await getRepository(Class).find();
        return res.status(200).json(data)
    } catch (error) {
        return new Error(`Erro ao tentar buscar lista de classes: ${error.message}`)
    }
});

/**
 * consulta a classe pelo id
 */
 classRouter.get('/id/:id', async (req, res) => {
    try {
        const data = await getRepository(Class).findByIds([req.params.id])
        return res.status(200).json(data)
    } catch (error) {
        return new Error(`Erro ao tentar buscar id: ${error.message}`)
    }
});

/**
 * consulta a classe pelo nome
 */
classRouter.get('/name/:name', async (req, res) => {
    try {
        const data = await getRepository(Class).find({
            name: Like(`%${req.params.name}%`)
        });
        return res.status(200).json(data)
    } catch (error) {
        return new Error(`Erro ao tentar buscar nome: ${error.message}`)
    }
});

export default classRouter;