interface ICourse {
    name: string;
    instructor: string;
    duration: number
}

class CreateCourseService {
    execute({ name, instructor, duration }: ICourse) {

    }
}

export default new CreateCourseService();