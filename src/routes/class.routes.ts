import { Router } from "express";
import { getCustomRepository } from "typeorm";
import ClassRepository from "../repositories/class.repositories";

const classRouter = Router()

/**
 * Insere a classe
 */
classRouter.post('/', (req, res) => {
    return getCustomRepository(ClassRepository).saveData(req.body).then(
        (data) => res.status(201).json(data)
    );
});

/**
 * consulta a lista de classes
 */
classRouter.get('/all', (req, res) => {
    return getCustomRepository(ClassRepository).findAll().then(
        (data) => res.status(200).json(data)
    );
});

/**
 * consulta a classe pelo id
 */
 classRouter.get('/id/:id', (req, res) => {
    return getCustomRepository(ClassRepository).findById(Number(req.params.id)).then(
        (data) => res.status(200).json(data)
    );
});

/**
 * consulta a classe pelo nome
 */
classRouter.get('/name/:name', (req, res) => {
    return getCustomRepository(ClassRepository).findByName(req.params.name).then((data) =>
        res.status(200).json(data)
    );
});

export default classRouter;