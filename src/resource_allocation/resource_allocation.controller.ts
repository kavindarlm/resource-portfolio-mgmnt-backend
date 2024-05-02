import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResourceAllocationService } from './resource_allocation.service';
import { CreateResourceAllocationDto } from './dto/create-resource_allocation.dto';
import { UpdateResourceAllocationDto } from './dto/update-resource_allocation.dto';
import { Task } from 'src/task/entities/task.entity';
import { ResourceAllocation } from './entities/resource_allocation.entity';

@Controller('resource-allocation')

export class ResourceAllocationController {
  constructor(private readonly resourceAllocationService: ResourceAllocationService) { }

  @Get(':resourceId')
  async getTasksByResourceId(@Param('resourceId') resourceId: string): Promise<Task[]> {
    return this.resourceAllocationService.getTasksByResourceId(resourceId);
  }

  @Post()
  async createResourceAllocation(@Body() createResourceAllocationDto: CreateResourceAllocationDto): Promise<ResourceAllocation> {
    return this.resourceAllocationService.createResourceAllocation(createResourceAllocationDto);
  }

  // Endpoint to get resource allocation data by sprint_id
  @Get('/sprint/:sprintId')
  async getResourceAllocationBySprintId(
    @Param('sprintId') sprintId: number
  ): Promise<ResourceAllocation[]> {
    // Call the service method to get resource allocation data by sprint_id
    return this.resourceAllocationService.getResourceAllocationBySprintId(sprintId);
  }

  @Delete(':id')
  async deleteResourceAllocation(@Param('id') id: number): Promise<void> {
    try {
      // Call the service method to delete resource allocation by ID
      await this.resourceAllocationService.deleteResourceAllocationById(id);
      console.log(`Resource allocation with ID ${id} deleted successfully.`);
    } catch (error) {
      // Log the error and throw an HTTP exception with appropriate status
      console.error(`Error deleting resource allocation with ID ${id}:`, error);
    }
  }

}
