import Classroom from "../model/Classroom";

export default interface ClassroomRepository {
    findCapacityBy(code: string, level: string, module: string): number;
    findBy(code: string, level: string, module: string): Classroom;
}