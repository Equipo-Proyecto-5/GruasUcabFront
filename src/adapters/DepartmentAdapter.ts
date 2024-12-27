import { IDepartment} from "@/models/Department";


export const adaptDepartmentData = (department: IDepartment): IDepartment => {
    return {
        id: department.id,
        nombre:department.nombre,
        descripcion:department.descripcion,
       
    };
};
