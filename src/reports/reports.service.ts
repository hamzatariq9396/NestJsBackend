import { Injectable } from '@nestjs/common';

import {InjectRepository} from '@nestjs/typeorm'

import {Repository} from 'typeorm'
import { Reports } from './report.entity';
@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Reports) private repo: Repository<Reports>){}

    create(price:number){
        const report = this.repo.create({price})

        return this.repo.save(report)
    }

  
}
