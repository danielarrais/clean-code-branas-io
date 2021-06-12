import Module from "../model/Module";

export default interface ModuleRepository {
    findMinimumAgeBy(code: string, level: string): number;
    findBy(code: string, level: string): Module;
}