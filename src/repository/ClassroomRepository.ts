export default interface ClassroomRepository {
    findCapacityBy(code: string, level: string, module: string): number;
}