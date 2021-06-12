import Module from "../model/Module";
import ModuleRepository from "./ModuleRepository";
import DataBase from "./data-memory/DataBase";

export default class ModuleRepositoryMemory implements ModuleRepository {
    private modules!: Module[];

    findMinimumAgeByCodeAndLevel(code: string, levelCode: string): number {
        const module = this.findByCodeAndLevel(code, levelCode);

        if (!module) {
            throw new Error("Module not found!");
        }

        return module?.minimumAge;
    }

    findByCodeAndLevel(code: string, level: string): Module {
        const module = DataBase.data.modules.find((module: Module) => module.code === code && module.level == level);

        if (!module) {
            throw new Error("Module not found!");
        }

        return module;
    }
}