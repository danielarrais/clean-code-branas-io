import Classroom from "../model/ClassRoom";
import ClassroomRepository from "./ClassroomRepository";

export default class ClassroomRepositoryMemory implements ClassroomRepository{
    private classrooms!: Classroom[];

    constructor() {
        this.loadClassesRoom();
    }

    findByCode(code: string): Classroom  {
        const classRoom = this.classrooms.find(classroom => classroom.code === code)

        if (!classRoom) {
            throw new Error("Classroom not found!");
        }

        return classRoom;
    }

    findCapacityByCode(code: string): number {
        const module = this.classrooms.find(classroom => classroom.code === code);

        if (!module) {
            throw new Error("Classroom not found!");
        }

        return module?.capacity;
    }

    loadClassesRoom() {
        this.classrooms = [
            {
                level: "EM",
                module: "3",
                code: "A",
                capacity: 2
            }
        ]
    }
}