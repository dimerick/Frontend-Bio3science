import { University } from './university';
import { User } from './user';
import { Community } from './community';


export interface Project{
    id: number, 
    name: string, 
    description: string, 
    created_by: number, 
    created_at: string, 
    main_university: number, 
    users?:User[], 
    universities?:University[], 
    communities?:Community[]  
}

export interface EntitiesProject{ 
    users?:User[], 
    universities:University[], 
    communities:Community[]  
}