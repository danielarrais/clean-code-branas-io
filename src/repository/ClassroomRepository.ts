export default interface ClassroomRepository {
    findCapacityByCodeAndModuleAndLevel(code: string, level: string, module: string): number;
}