import { Request, Response } from "express";
import { EntityRepository, Like, Repository } from "typeorm";
import Class from "../models/Class";

@EntityRepository(Class)
export default class ClassRepository extends Repository<Class> {

    /**
     * @description Retorna as classes pesquisadas pelo nome.
     * @param {Request} req
     * @param {Response} res
     * @memberof ClassRepository
     */
    public async findByName (name: string): Promise<Class[] | Error> {
        try {
            return await this.find({
                name: Like(`%${name}%`)
            });
        } catch (error) {
            return new Error(`Erro ao tentar buscar nome: ${error.message}`)
        }
    }

    /**
     * @description Retorna as classes pesquisadas pelo id.
     * @param {Request} req
     * @param {Response} res
     * @memberof ClassRepository
     */
    public async findById (id: number): Promise<Class[] | Error> {
        try {
            return await this.find({ where: {id} })
        } catch (error) {
            return new Error(`Erro ao tentar buscar id: ${error.message}`)
        }
    }

    /**
     * @description Retorna a lista de todas as classes salvas
     * @param {Request} req
     * @param {Response} res
     * @memberof ClassRepository
     */
    public async findAll (): Promise<Class[] | Error> {
        try {
            return await this.find();
        } catch (error) {
            return new Error(`Erro ao tentar buscar lista de classes: ${error.message}`)
        }
    }

    /**
     * @description Salva a classe na base de dados
     * @param {Request} req
     * @param {Response} res
     * @memberof ClassRepository
     */
    public async saveData (data: Class[]): Promise<Class[] | Error> {
        try {
            return await this.save(data);
        } catch (error) {
            return new Error(`Erro ao tentar salvar classe: ${error.message}`)
        }
    }
}
