import {Module} from "@nestjs/common";
import {ConfigService} from "astra-common";
import {JwtModule} from "@nestjs/jwt";
import {CoreModule} from "../core/core.module";

@Module({
    imports: [
        CoreModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secretOrPrivateKey: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: +configService.get('JWT_EXPIRES'),
                },
            }),
            inject: [ConfigService]
        }),
    ],
    exports: [JwtModule]
})
export class CustomJwtModule {}
