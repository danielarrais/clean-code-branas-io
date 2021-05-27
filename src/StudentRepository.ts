import Student from "./Student";

export default class StudentRepository {
    private students: Student[] = []

    persist(student: Student) {
        return this.students.push(student)
    }

    findByCpf(cpf: string): Student | undefined {
        return this.students.find((student) => student.cpf === cpf)
    }
}