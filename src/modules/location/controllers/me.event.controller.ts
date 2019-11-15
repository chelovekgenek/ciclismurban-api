import { Controller, Get, HttpStatus, Post, Body, Param, Delete, Patch, Request } from "@nestjs/common"
import { ApiUseTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { TransformClassToPlain } from "class-transformer"
import { LocationExposeGroup } from "@ciclismurban/models"

import {
  getValidateAndTransformPipe as pipe,
  getResponseOptions as options,
  ApiAuthPayload,
  ApiBodyValidation,
  AuthenticatedRequest,
  ApiParamId,
} from "modules/commons"

import { Event } from "../entities"
import { EventService } from "../services"

@Controller("api/me/events")
@ApiUseTags("events")
export class MeEventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ title: "Create Event location" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Ok", type: Event })
  @ApiAuthPayload()
  @ApiBodyValidation(Event)
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async create(
    @Request() { user }: AuthenticatedRequest,
    @Body(
      pipe(
        [LocationExposeGroup.WRITE],
        Event,
      ),
    )
    data: Partial<Event>,
  ): Promise<Event> {
    return this.eventService.create(user, data)
  }

  @Patch("/:id")
  @ApiOperation({ title: "Update Event location" })
  @ApiResponse({ status: HttpStatus.OK, description: "Ok", type: Event })
  @ApiParamId()
  @ApiAuthPayload()
  @ApiBodyValidation(Event)
  @TransformClassToPlain(options([LocationExposeGroup.READ]))
  async updateById(
    @Param("id") eventId: Event["uuid"],
    @Request() { user }: AuthenticatedRequest,
    @Body(
      pipe(
        [LocationExposeGroup.UPDATE],
        Event,
      ),
    )
    data: Partial<Event>,
  ): Promise<Event> {
    return this.eventService.update(user.uuid, eventId, data)
  }

  @Delete("/:id")
  @ApiOperation({ title: "Delete Event location" })
  @ApiResponse({ status: HttpStatus.OK, description: "Ok", type: String })
  @ApiParamId()
  @ApiAuthPayload()
  async deleteById(@Param("id") eventId: Event["uuid"], @Request() { user }: AuthenticatedRequest): Promise<string> {
    return this.eventService.delete(user.uuid, eventId)
  }
}
