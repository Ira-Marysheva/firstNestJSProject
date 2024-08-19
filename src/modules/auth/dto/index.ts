import { IsString } from "class-validator";

export class userLoginDTO{
    @IsString()
    email:string

    @IsString()
    password:string
}