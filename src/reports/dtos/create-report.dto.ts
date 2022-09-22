import {IsNumberString} from 'class-validator'


export class CreateReportDto{
    @IsNumberString()
    price:number
}