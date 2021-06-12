import Module from "../model/Module";

export default interface ModuleRepository {
    findMinimumAgeByCodeAndLevel(code: string, level: string): number;
    findByCodeAndLevel(code: string, level: string): Module;
}