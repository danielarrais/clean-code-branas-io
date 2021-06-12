import Module from "../model/Module";

export default interface ModuleRepository {
    findMinimumAgeByCodeAndLevel(code: string, level: string): number;
    findAny(): Module;
}