import ClassRoom from "../model/ClassRoom";

export default interface ClassroomRepository {
    findByCode(code: string): ClassRoom;
    findCapacityByCode(code: string): number;
}