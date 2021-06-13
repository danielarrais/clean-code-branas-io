export default class DateUtil {
    static calculateAge(birthDate: Date): number {
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth() - birthDate.getMonth();

            if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            return age;
    }

    static calculateDaysOfRange(startDate: Date, endDate: Date): number {
        const differenceInTime = endDate.getTime() - startDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        return differenceInDays;
    }
}