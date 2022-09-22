import { Controller, Body, Post } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post('/create')
  createReport(@Body() body: CreateReportDto) {
    this.reportsService.create(body.price);
  }
}
