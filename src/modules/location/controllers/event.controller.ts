import { Controller, Get, HttpStatus, Post, Body, Param, UseGuards } from "@nestjs/common"
import {
  ApiUseTags,
  ApiOperation,
  ApiResponse,
  ApiImplicitBody,
  ApiImplicitParam,
  ApiImplicitHeader,
} from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"

import { getValidateAndTransformPipe as pipe, getResponseOptions as options } from "modules/commons"
import { AuthGuard } from "modules/user"

import { Event } from "../entities"
import { ExposeGroup } from "../models"
import { EventService } from "../services"

@Controller("api/events")
@ApiUseTags("locations")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiOperation({ title: "Get event locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Event, isArray: true })
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async getParkings(): Promise<Event[]> {
    return this.eventService.find()
  }

  @Get("/:id")
  @ApiOperation({ title: "Get event locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Event })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Entity not found" })
  @ApiImplicitParam({ name: "id", type: String })
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async getParking(@Param("id") uuid): Promise<Event> {
    return this.eventService.findById(uuid)
  }

  @Post()
  @ApiOperation({ title: "Create event location" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Ok", type: Event })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiImplicitBody({ name: "Payload", type: Event })
  @ApiImplicitHeader({ name: "Authorization", required: true })
  @UseGuards(AuthGuard)
  @TransformClassToPlain(options([ExposeGroup.READ]))
  async createParking(
    @Body(
      pipe(
        [ExposeGroup.WRITE],
        Event,
      ),
    )
    data: Partial<Event>,
  ): Promise<Event> {
    return this.eventService.create(data)
  }
}
