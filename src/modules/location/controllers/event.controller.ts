import { Controller, Get, HttpStatus, Param } from "@nestjs/common"
import { ApiUseTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"
import { LocationExposeGroup } from "@ciclismurban/models"

import { getResponseOptions as options, ApiParamId } from "modules/commons"

import { Event } from "../entities"
import { EventService } from "../services"
import { EventByIdPipe } from "../pipes"

@Controller("api/events")
@ApiUseTags("events")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiOperation({ title: "Get Event locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Event, isArray: true })
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async findAll(): Promise<Event[]> {
    return this.eventService.find()
  }

  @Get("/:id")
  @ApiOperation({ title: "Get Event locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Event })
  @ApiParamId()
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async findById(@Param(EventByIdPipe) event: Event): Promise<Event> {
    return event
  }
}
