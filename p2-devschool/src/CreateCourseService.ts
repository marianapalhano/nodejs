interface ICourse {
    name: string;
    instructor: string;
    duration: number
}

class CreateCourseService {
    execute({ name, instructor, duration }: ICourse) {
        console.log(name, instructor, duration);
    }
}

export default new CreateCourseService();