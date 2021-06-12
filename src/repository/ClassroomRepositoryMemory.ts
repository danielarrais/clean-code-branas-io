import Classroom from "../model/ClassRoom";
import ClassroomRepository from "./ClassroomRepository";
import DataBase from "./data-memory/DataBase";

export default class ClassroomRepositoryMemory implements ClassroomRepository{
    findCapacityBy(code: string, level: string, module: string): number {
        const classroom = DataBase.data.classrooms.find((classroom: Classroom) => {
            return classroom.code === code &&
                classroom.module == module &&
                classroom.level == level
        });

        if (!classroom) {
            throw new Error("Classroom not found");
        }

        return classroom?.capacity;
    }
}