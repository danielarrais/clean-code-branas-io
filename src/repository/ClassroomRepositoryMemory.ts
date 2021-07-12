import Classroom from "../model/Classroom";
import ClassroomRepository from "./ClassroomRepository";
import DataBase from "./data-memory/DataBase";

export default class ClassroomRepositoryMemory implements ClassroomRepository{
    findBy(code: string, level: string, module: string): Classroom {
        const classroom = DataBase.data.classrooms.find((classroom: Classroom) => {
            return classroom.code === code &&
                classroom.module == module &&
                classroom.level == level
        });

        if (!classroom) {
            throw new Error("Classroom not found");
        }

        return classroom;
    }

    findCapacityBy(code: string, level: string, module: string): number {
        return this.findBy(code, level, module)?.capacity;

    }

    findEndDateBy(code: string, level: string, module: string): Date {
        return this.findBy(code, level, module)?.endDate;
    }

    findStartDateBy(code: string, level: string, module: string): Date {
        return this.findBy(code, level, module)?.startDate;
    }
}