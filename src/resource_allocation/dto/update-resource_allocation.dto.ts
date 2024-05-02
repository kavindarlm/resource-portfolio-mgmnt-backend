import { PartialType } from '@nestjs/mapped-types';
import { CreateResourceAllocationDto } from './create-resource_allocation.dto';

export class UpdateResourceAllocationDto extends PartialType(CreateResourceAllocationDto) {}