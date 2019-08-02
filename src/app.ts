import { INestApplication, LoggerService } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { GracefulShutdownManager } from "@moebius/http-graceful-shutdown"

import { Config } from "./modules/commons"

import packageJson from "../package.json"

export async function appBootstrap(app: INestApplication, logger: LoggerService): Promise<INestApplication> {
  bootstrapSwagger(app)

  const shutdownManager = new GracefulShutdownManager(app.getHttpServer())

  process.on("SIGTERM", () => {
    shutdownManager.terminate(() => {
      logger.log("Server is gracefully terminated")
    })
  })

  return app
}

function bootstrapSwagger(app: INestApplication) {
  if (Config.get("SWAGGER_ENABLED")) {
    const options = new DocumentBuilder()
      .setTitle("Ciclismurban")
      .setDescription("Ciclismurban API description")
      .setVersion(packageJson.version)
      .setSchemes(Config.get("SWAGGER_SCHEME", "http") as "http" | "https")
      .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup(Config.get("SWAGGER_PATH") as string, app, document)
  }
}
