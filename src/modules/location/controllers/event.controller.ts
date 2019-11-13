import { Controller, Get, HttpStatus, Post, Body, Param, UseGuards, Delete, Patch } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import {
  ApiUseTags,
  ApiOperation,
  ApiResponse,
  ApiImplicitBody,
  ApiImplicitParam,
  ApiImplicitHeader,
} from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"
import { LocationExposeGroup, EventPermissions } from "@ciclismurban/models"

import { getValidateAndTransformPipe as pipe, getResponseOptions as options } from "modules/commons"
import { PermissionsGuard } from "modules/user"

import { Event } from "../entities"
import { EventService } from "../services"
import { EventByIdPipe } from "../pipes"

@Controller("api/events")
@ApiUseTags("events")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiOperation({ title: "Get event locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Event, isArray: true })
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async findAll(): Promise<Event[]> {
    return this.eventService.find()
  }

  @Get("/:id")
  @ApiOperation({ title: "Get event locations" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK", type: Event })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Entity not found" })
  @ApiImplicitParam({ name: "id", type: String })
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async findById(@Param(EventByIdPipe) event: Event): Promise<Event> {
    return event
  }

  @Post()
  @ApiOperation({ title: "Create event location" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Ok", type: Event })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Jwt malformed" })
  @ApiImplicitBody({ name: "Payload", type: Event })
  @ApiImplicitHeader({ name: "Authorization", required: true })
  @UseGuards(AuthGuard("jwt"), new PermissionsGuard(EventPermissions.CREATE))
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async create(
    @Body(
      pipe(
        [LocationExposeGroup.WRITE],
        Event,
      ),
    )
    data: Partial<Event>,
  ): Promise<Event> {
    return this.eventService.create(data)
  }

  @Patch("/:id")
  @ApiOperation({ title: "Update event location" })
  @ApiResponse({ status: HttpStatus.OK, description: "Ok", type: Event })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: "Validation error" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Jwt malformed" })
  @ApiImplicitParam({ name: "id", type: String })
  @ApiImplicitBody({ name: "Payload", type: Event })
  @ApiImplicitHeader({ name: "Authorization", required: true })
  @UseGuards(AuthGuard("jwt"), new PermissionsGuard(EventPermissions.UPDATE))
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async update(
    @Param(EventByIdPipe) event: Event,
    @Body(
      pipe(
        [LocationExposeGroup.UPDATE],
        Event,
      ),
    )
    data: Partial<Event>,
  ): Promise<Event> {
    return this.eventService.update(event, data)
  }

  @Delete("/:id")
  @ApiOperation({ title: "Delete event location" })
  @ApiResponse({ status: HttpStatus.OK, description: "Ok", type: Event })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Event not found" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Jwt malformed" })
  @ApiImplicitParam({ name: "id", type: String })
  @ApiImplicitHeader({ name: "Authorization", required: true })
  @UseGuards(AuthGuard("jwt"), new PermissionsGuard(EventPermissions.DELETE))
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async deleteById(@Param(EventByIdPipe) event: Event): Promise<string> {
    return this.eventService.delete(event)
  }
}
