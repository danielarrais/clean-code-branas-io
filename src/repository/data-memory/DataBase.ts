export default class DataBase {
    private static _data: any;

    private constructor() {
    }

    static resetDataBase() {
        this._data = this.initialData()
    }

    static get data(): any {
        if (!this._data) {
            this._data = this.initialData()
        }
        return this._data;
    }

    private static initialData() {
        return {
            enrollmentStudents: [],
            modules: [
                {
                    level: "EF1",
                    code: "1",
                    description: "1o Ano",
                    minimumAge: 6,
                    price: 15000
                },
                {
                    level: "EF1",
                    code: "2",
                    description: "2o Ano",
                    minimumAge: 7,
                    price: 15000
                },
                {
                    level: "EF1",
                    code: "3",
                    description: "3o Ano",
                    minimumAge: 8,
                    price: 15000
                },
                {
                    level: "EF1",
                    code: "4",
                    description: "4o Ano",
                    minimumAge: 9,
                    price: 15000
                },
                {
                    level: "EF1",
                    code: "5",
                    description: "5o Ano",
                    minimumAge: 10,
                    price: 15000
                },
                {
                    level: "EF2",
                    code: "6",
                    description: "6o Ano",
                    minimumAge: 11,
                    price: 14000
                },
                {
                    level: "EF2",
                    code: "7",
                    description: "7o Ano",
                    minimumAge: 12,
                    price: 14000
                },
                {
                    level: "EF2",
                    code: "8",
                    description: "8o Ano",
                    minimumAge: 13,
                    price: 14000
                },
                {
                    level: "EF2",
                    code: "9",
                    description: "9o Ano",
                    minimumAge: 14,
                    price: 14000
                },
                {
                    level: "EM",
                    code: "1",
                    description: "1o Ano",
                    minimumAge: 15,
                    price: 17000
                },
                {
                    level: "EM",
                    code: "2",
                    description: "2o Ano",
                    minimumAge: 16,
                    price: 17000
                },
                {
                    level: "EM",
                    code: "3",
                    description: "3o Ano",
                    minimumAge: 17,
                    price: 17000
                }
            ],
            levels: [
                {
                    code: "EF1",
                    description: "Ensino Fundamental I"
                },
                {
                    code: "EF2",
                    description: "Ensino Fundamental II"
                },
                {
                    code: "EM",
                    description: "Ensino M??dio"
                }
            ],
            classrooms: [
                {
                    level: "EM",
                    module: "1",
                    code: "A",
                    capacity: 2,
                    startDate: new Date("2021-06-01"),
                    endDate: new Date("2021-12-15")
                },
                {
                    level: "EM",
                    module: "3",
                    code: "B",
                    capacity: 5,
                    startDate: new Date("2021-05-01"),
                    endDate: new Date("2021-05-30")
                },
                {
                    level: "EM",
                    module: "3",
                    code: "C",
                    capacity: 5,
                    startDate: new Date("2021-05-01"),
                    endDate: new Date("2021-06-30")
                }
            ]
        }
    }
}